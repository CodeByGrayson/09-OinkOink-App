import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './components/BottomNavigation';
import SpeciesGridScreen from './components/SpeciesGridScreen';
import { colors, spacing } from './theme';

function ComingSoonScreen() {
  return (
    <View style={styles.comingSoon}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
}

const HEADER_TITLES = {
  search: 'Search',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('search');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{HEADER_TITLES[activeTab] ?? 'Coming Soon'}</Text>
        </View>

        {activeTab === 'search' ? <SpeciesGridScreen /> : <ComingSoonScreen />}

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
