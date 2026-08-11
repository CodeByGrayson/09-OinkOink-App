import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BottomNavigation from './components/BottomNavigation';
import ContactScreen from './components/ContactScreen';
import DropsScreen from './components/DropsScreen';
import HowItWorksScreen from './components/HowItWorksScreen';
import SpeciesGridScreen from './components/SpeciesGridScreen';
import { ThemeProvider, useTheme } from './ThemeContext';

const HEADER_TITLES = {
  search: 'Search',
  tab2: 'How It Works',
  tab3: 'Drops',
  tab4: 'Contact',
};

function AppContent() {
  const [activeTab, setActiveTab] = useState('search');
  const { theme, resolvedScheme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <StatusBar style={resolvedScheme === 'dark' ? 'light' : 'dark'} />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{HEADER_TITLES[activeTab]}</Text>
        </View>

        {activeTab === 'search' ? (
          <SpeciesGridScreen />
        ) : activeTab === 'tab2' ? (
          <HowItWorksScreen />
        ) : activeTab === 'tab3' ? (
          <DropsScreen />
        ) : (
          <ContactScreen />
        )}

        <BottomNavigation activeTab={activeTab} onChangeTab={setActiveTab} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.sm,
      paddingBottom: theme.spacing.md,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.text,
    },
  });
}
