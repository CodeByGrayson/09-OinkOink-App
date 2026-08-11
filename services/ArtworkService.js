import { RAW_BASE_URL } from './githubRepo';

// All artwork access goes through this service. It fetches artwork.json from
// the GitHub repo at runtime and points each record's image at its raw
// GitHub URL, so editing artwork.json or adding images in the repo updates
// every installed copy of the app without a rebuild. Callers never touch
// GitHub directly — if the data ever moves to a different backend, only the
// implementation below needs to change; <Image source={item.image} /> keeps
// working unmodified since it accepts a { uri } object either way.
class ArtworkService {
  async getAll() {
    const response = await fetch(`${RAW_BASE_URL}/data/artwork.json`);
    if (!response.ok) {
      throw new Error(`Failed to load artwork.json: ${response.status}`);
    }
    const records = await response.json();
    return records.map((record) => ({
      ...record,
      image: { uri: `${RAW_BASE_URL}/artwork/${record.imageFile}` },
    }));
  }

  async getActive() {
    const all = await this.getAll();
    return all.filter((record) => record.active);
  }
}

export default new ArtworkService();
