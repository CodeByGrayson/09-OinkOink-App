import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ArtworkDetailScreen from './components/ArtworkDetailScreen';
import ArtworkGrid from './components/ArtworkGrid';
import BottomNavigation from './components/BottomNavigation';
import SearchBar from './components/SearchBar';
import ArtworkService from './services/ArtworkService';
import { colors, spacing } from './theme';

function ComingSoonScreen() {
  return (
    <View style={styles.comingSoon}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
}

function DiscoverScreen() {
  const [artworks, setArtworks] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [query, setQuery] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const active = await ArtworkService.getActive();
      setArtworks(active);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filteredArtworks = useMemo(() => {
    if (!query.trim()) return artworks;
    const lower = query.trim().toLowerCase();
    return artworks.filter((artwork) => artwork.pokemon.toLowerCase().includes(lower));
  }, [artworks, query]);

  if (selectedArtwork) {
    return (
      <ArtworkDetailScreen artwork={selectedArtwork} onBack={() => setSelectedArtwork(null)} />
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
      <ArtworkGrid artworks={filteredArtworks} onArtworkPress={setSelectedArtwork} />
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
        </View>

        {activeTab === 'search' ? <DiscoverScreen /> : <ComingSoonScreen />}

        <BottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    flex: 1,
  },
  searchBarWrapper: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  comingSoon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: colors.textMuted,
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
