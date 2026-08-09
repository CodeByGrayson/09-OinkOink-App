import { FlatList, StyleSheet } from 'react-native';
import { spacing } from '../theme';
import EmptyState from './EmptyState';
import ProductCard from './ProductCard';

export default function ProductGrid({
  products,
  onProductPress,
  onEndReached,
  ListHeaderComponent,
}) {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => <ProductCard product={item} onPress={onProductPress} />}
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
