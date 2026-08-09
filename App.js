import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './components/BottomNavigation';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import { mockProducts } from './data/mockProducts';
import { colors, spacing } from './theme';

function ComingSoonScreen() {
  return (
    <View style={styles.comingSoon}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('search');
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return mockProducts;
    const lower = query.trim().toLowerCase();
    return mockProducts.filter((product) => product.name.toLowerCase().includes(lower));
  }, [query]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover</Text>
        </View>

        {activeTab === 'search' ? (
          <View style={styles.content}>
            <View style={styles.searchBarWrapper}>
              <SearchBar value={query} onChangeText={setQuery} />
            </View>
            <ProductGrid products={filteredProducts} />
          </View>
        ) : (
          <ComingSoonScreen />
        )}

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
});
