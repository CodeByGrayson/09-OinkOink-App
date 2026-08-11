import { useMemo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function SpeciesCard({ species, onPress }) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(species)}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrapper}>
        <Image source={species.thumbnail} style={styles.image} resizeMode="cover" />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {species.count} {species.count === 1 ? 'card' : 'cards'}
          </Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {species.pokemon}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function createStyles(theme) {
  const { colors, radius, shadow, spacing } = theme;
  return StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      overflow: 'hidden',
      ...shadow,
    },
    imageWrapper: {
      aspectRatio: 600 / 835,
      backgroundColor: colors.border,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    badge: {
      position: 'absolute',
      right: spacing.xs,
      bottom: spacing.xs,
      backgroundColor: colors.shadow,
      borderRadius: radius.pill,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
    },
    badgeText: {
      color: colors.onColor,
      fontSize: 11,
      fontWeight: '600',
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
}
