// Expects artworks already filtered to active:true (e.g. via ArtworkService.getActive()).
export function groupBySpecies(activeArtworks) {
  const bySpecies = new Map();
  for (const artwork of activeArtworks) {
    const cards = bySpecies.get(artwork.pokemon);
    if (cards) {
      cards.push(artwork);
    } else {
      bySpecies.set(artwork.pokemon, [artwork]);
    }
  }

  return Array.from(bySpecies.entries()).map(([pokemon, cards]) => ({
    pokemon,
    count: cards.length,
    thumbnail: cards[0].image,
    cards,
  }));
}

export function getCardsForSpecies(activeArtworks, pokemon) {
  return activeArtworks.filter((artwork) => artwork.pokemon === pokemon);
}
