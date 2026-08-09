import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

const badgeColors = {
  New: colors.badgeNew,
  Popular: colors.badgePopular,
  Sale: colors.badgeSale,
};

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(product)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} />
        {product.badge && (
          <View style={[styles.badge, { backgroundColor: badgeColors[product.badge] }]}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadow,
  },
  imageWrapper: {
    aspectRatio: 1,
    backgroundColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  badgeText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    padding: spacing.sm,
  },
  name: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    height: 36,
  },
  price: {
    marginTop: spacing.xs,
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
});
