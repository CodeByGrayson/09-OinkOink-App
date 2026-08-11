import { RAW_BASE_URL } from './githubRepo';

// Same runtime-fetch pattern as ArtworkService: drops.json and the referenced
// images are read from GitHub at request time so new drops go live without a
// rebuild. See ArtworkService.js for the full rationale.
class DropsService {
  async getAll() {
    const response = await fetch(`${RAW_BASE_URL}/data/drops.json`);
    if (!response.ok) {
      throw new Error(`Failed to load drops.json: ${response.status}`);
    }
    const records = await response.json();
    return records.map((record) => ({
      ...record,
      // Some drop image filenames contain spaces (e.g. "New_Design_01_Telegram 1.png");
      // encode the filename segment so the raw GitHub URL stays valid (space -> %20).
      image: { uri: `${RAW_BASE_URL}/artwork/${encodeURIComponent(record.imageFile)}` },
    }));
  }

  async getActive() {
    const all = await this.getAll();
    return all.filter((record) => record.active).sort((a, b) => b.id - a.id);
  }
}

export default new DropsService();
