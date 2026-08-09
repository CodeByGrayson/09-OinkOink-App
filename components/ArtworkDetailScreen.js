import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

export default function ArtworkDetailScreen({ artwork, onBack }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.text} />
        <Text style={styles.backLabel}>Back</Text>
      </TouchableOpacity>

      <View style={styles.imageWrapper}>
        <Image source={artwork.image} style={styles.image} />
      </View>

      <Text style={styles.name}>{artwork.pokemon}</Text>
      <Text style={styles.description}>{artwork.description}</Text>
      <Text style={styles.meta}>Last updated: {artwork.lastUpdated}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  backLabel: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 4,
  },
  imageWrapper: {
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.border,
    ...shadow,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    marginTop: spacing.lg,
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    marginTop: spacing.xs,
    fontSize: 15,
    color: colors.textMuted,
  },
  meta: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.textMuted,
  },
});
