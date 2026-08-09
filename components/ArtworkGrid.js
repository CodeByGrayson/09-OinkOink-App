import { FlatList, StyleSheet } from 'react-native';
import { spacing } from '../theme';
import ArtworkCard from './ArtworkCard';
import EmptyState from './EmptyState';

export default function ArtworkGrid({
  artworks,
  onArtworkPress,
  onEndReached,
  ListHeaderComponent,
}) {
  return (
    <FlatList
      data={artworks}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      renderItem={({ item }) => <ArtworkCard artwork={item} onPress={onArtworkPress} />}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={EmptyState}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
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
