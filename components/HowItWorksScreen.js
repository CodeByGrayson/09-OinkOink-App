import { useCallback, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadow, spacing } from '../theme';

const EXPLODED_VIEW_IMAGE = require('../artwork/zz_HowItWorks_011.png');
// Reads the same build-time asset metadata Metro embeds for the local PNG —
// no network round trip needed (unlike Image.getSize, which is for remote URIs).
const EXPLODED_VIEW_SOURCE = Image.resolveAssetSource(EXPLODED_VIEW_IMAGE);
const EXPLODED_VIEW_RATIO = EXPLODED_VIEW_SOURCE.width / EXPLODED_VIEW_SOURCE.height;
const ESTIMATED_CONTENT_WIDTH = Dimensions.get('window').width - spacing.md * 2;

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
  const [explodedImageWidth, setExplodedImageWidth] = useState(ESTIMATED_CONTENT_WIDTH);

  const onExplodedImageWrapperLayout = useCallback((event) => {
    setExplodedImageWidth(event.nativeEvent.layout.width);
  }, []);

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

      <View style={styles.explodedImageWrapper} onLayout={onExplodedImageWrapperLayout}>
        <Image
          source={EXPLODED_VIEW_IMAGE}
          style={[styles.explodedImage, { height: explodedImageWidth / EXPLODED_VIEW_RATIO }]}
          resizeMode="contain"
        />
      </View>

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
  explodedImageWrapper: {
    width: '100%',
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  explodedImage: {
    width: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  imagePlaceholderText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
