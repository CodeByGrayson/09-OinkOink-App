import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArtworkService from '../services/ArtworkService';
import { groupBySpecies } from '../services/speciesGrouping';
import { colors, spacing } from '../theme';
import SearchBar from './SearchBar';
import SpeciesDetailScreen from './SpeciesDetailScreen';
import SpeciesGrid from './SpeciesGrid';

export default function SpeciesGridScreen() {
  const [artworks, setArtworks] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [query, setQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const active = await ArtworkService.getActive();
      setArtworks(active);
      setStatus('ready');
    } catch (error) {
      console.error('Failed to load artwork:', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const speciesList = useMemo(() => groupBySpecies(artworks), [artworks]);

  const filteredSpecies = useMemo(() => {
    if (!query.trim()) return speciesList;
    const lower = query.trim().toLowerCase();
    return speciesList.filter((species) => species.pokemon.toLowerCase().includes(lower));
  }, [speciesList, query]);

  if (selectedSpecies) {
    return (
      <SpeciesDetailScreen species={selectedSpecies} onBack={() => setSelectedSpecies(null)} />
    );
  }

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Couldn't load artwork. Check your connection.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={load}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <View style={styles.searchBarWrapper}>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search Pokemon..." />
      </View>
      <SpeciesGrid species={filteredSpecies} onSpeciesPress={setSelectedSpecies} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  retryButtonText: {
    color: colors.surface,
    fontWeight: '600',
  },
});
