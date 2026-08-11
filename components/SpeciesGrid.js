import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import EmptyState from './EmptyState';
import SpeciesCard from './SpeciesCard';

export default function SpeciesGrid({ species, onSpeciesPress, ListHeaderComponent }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <FlatList
      data={species}
      keyExtractor={(item) => item.pokemon}
      numColumns={2}
      renderItem={({ item }) => <SpeciesCard species={item} onPress={onSpeciesPress} />}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={EmptyState}
      showsVerticalScrollIndicator={false}
    />
  );
}

function createStyles(theme) {
  const { spacing } = theme;
  return StyleSheet.create({
    content: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.xl,
      flexGrow: 1,
    },
    row: {
      gap: spacing.md,
      marginBottom: spacing.md,
    },
  });
}
