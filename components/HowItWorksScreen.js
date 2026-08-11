import { useCallback, useMemo, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../ThemeContext';

const EXPLODED_VIEW_IMAGE = require('../artwork/zz_HowItWorks_011.png');
// Image.resolveAssetSource() is native-only and throws on react-native-web,
// so the known pixel dimensions of these fixed local assets are hardcoded here.
const EXPLODED_VIEW_RATIO = 518 / 385;
const HOLOFOIL_SWATCH_IMAGE = require('../artwork/zz_HowItWorks_012.png');
const HOLOFOIL_SWATCH_RATIO = 518 / 207;
const ESTIMATED_CONTENT_WIDTH = Dimensions.get('window').width - 16 * 2;

function Section({ title, children, styles }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function HowItWorksScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [explodedImageWidth, setExplodedImageWidth] = useState(ESTIMATED_CONTENT_WIDTH);
  const [holofoilImageWidth, setHolofoilImageWidth] = useState(ESTIMATED_CONTENT_WIDTH);

  const onExplodedImageWrapperLayout = useCallback((event) => {
    setExplodedImageWidth(event.nativeEvent.layout.width);
  }, []);

  const onHolofoilImageWrapperLayout = useCallback((event) => {
    setHolofoilImageWidth(event.nativeEvent.layout.width);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Section title="What You Get" styles={styles}>
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

      <Section title="What Is Extended Art?" styles={styles}>
        <Text style={styles.paragraph}>
          The printed insert is designed to visually extend your card's
          existing artwork beyond its normal border. When your graded slab
          sits inside the case, the artwork printed on the surrounding
          insert continues the card's imagery outward, making the art
          appear larger and bled into the frame.
        </Text>
      </Section>

      <Section title="Insert Material Options" styles={styles}>
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

      <View style={styles.holofoilImageWrapper} onLayout={onHolofoilImageWrapperLayout}>
        <Image
          source={HOLOFOIL_SWATCH_IMAGE}
          style={[styles.holofoilImage, { height: holofoilImageWidth / HOLOFOIL_SWATCH_RATIO }]}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.imageCaption}>Available holofoil patterns</Text>

      <Section title="UV Protection" styles={styles}>
        <Text style={styles.paragraph}>
          The insert is printed with UV-resistant ink for long-lasting color
          protection, and both case panels use full UV-protection tempered
          glass to help keep your artwork looking vibrant over time.
        </Text>
      </Section>
    </ScrollView>
  );
}

function createStyles(theme) {
  const { colors, radius, shadow, spacing } = theme;
  return StyleSheet.create({
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
    holofoilImageWrapper: {
      width: '100%',
      borderRadius: radius.md,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
    holofoilImage: {
      width: '100%',
    },
    imageCaption: {
      fontSize: 13,
      color: colors.textMuted,
      textAlign: 'center',
      marginTop: spacing.sm,
      marginBottom: spacing.lg,
    },
  });
}
