import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

export default function ArtworkCard({ artwork, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(artwork)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrapper}>
        <Image source={artwork.image} style={styles.image} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {artwork.pokemon}
        </Text>
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
  info: {
    padding: spacing.sm,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 18,
  },
});
