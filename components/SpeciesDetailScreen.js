import { Ionicons } from '@expo/vector-icons';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

export default function SpeciesDetailScreen({ species, onBack }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} hitSlop={8}>
        <Ionicons name="chevron-back" size={20} color={colors.text} />
        <Text style={styles.backLabel}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{species.pokemon}</Text>

      <FlatList
        data={species.cards}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.cardRow}>
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardDescription}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  backLabel: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  cardRow: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadow,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.border,
  },
  cardDescription: {
    padding: spacing.sm,
    fontSize: 14,
    color: colors.text,
  },
});
