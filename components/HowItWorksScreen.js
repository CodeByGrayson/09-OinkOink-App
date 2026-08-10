import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ImagePlaceholder({ label }) {
  // TODO: replace with an actual illustrative image (e.g. exploded-view diagram)
  return (
    <View style={styles.imagePlaceholder}>
      <Text style={styles.imagePlaceholderText}>{label}</Text>
    </View>
  );
}

export default function HowItWorksScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Section title="What You Get">
        <Text style={styles.paragraph}>
          Every order includes a magnetic display case with front and back
          panels, both fitted with full UV-protection tempered glass, plus a
          custom-printed extended art insert made to fit your PSA, BGS, or
          CGC graded slab.
        </Text>
        <Text style={styles.paragraph}>
          The graded card itself is not included — you provide your own
          PSA/BGS/CGC-graded slab to insert into the case.
        </Text>
      </Section>

      {/* Illustrative image placeholder: exploded-view diagram of the case layers */}
      <ImagePlaceholder label="Image: exploded view of case layers (coming soon)" />

      <Section title="What Is Extended Art?">
        <Text style={styles.paragraph}>
          The printed insert is designed to visually extend your card's
          existing artwork beyond its normal border. When your graded slab
          sits inside the case, the artwork printed on the surrounding
          insert continues the card's imagery outward, making the art
          appear larger and bled into the frame.
        </Text>
      </Section>

      <Section title="Insert Material Options">
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Acrylic</Text>
          <Text style={styles.paragraph}>Front side printed only.</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Foil</Text>
          <Text style={styles.paragraph}>
            Front side plus full extended artwork printed.
          </Text>
        </View>
      </Section>

      {/* Illustrative image placeholder: acrylic vs. foil insert comparison */}
      <ImagePlaceholder label="Image: acrylic vs. foil comparison (coming soon)" />

      <Section title="UV Protection">
        <Text style={styles.paragraph}>
          The insert is printed with UV-resistant ink for long-lasting color
          protection, and both case panels use full UV-protection tempered
          glass to help keep your artwork looking vibrant over time.
        </Text>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  imagePlaceholder: {
    height: 160,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
