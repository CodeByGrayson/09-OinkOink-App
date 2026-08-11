import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../ThemeContext';

// TODO: replace with real WhatsApp Business number, including country code
export const WHATSAPP_NUMBER = '12345678';

const CONTACT_EMAIL = 'support@oinkoinklabs.com';

const CARDS = [
  {
    id: 'whatsapp',
    icon: 'logo-whatsapp',
    label: 'Chat with us on WhatsApp',
    subtitle: 'Fastest way to reach us',
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    id: 'email',
    icon: 'mail-outline',
    label: 'Email us',
    subtitle: CONTACT_EMAIL,
    url: `mailto:${CONTACT_EMAIL}`,
  },
];

const MODE_OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];

function ContactCard({ card, colors, styles }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => Linking.openURL(card.url)}
      activeOpacity={0.85}
    >
      <View style={styles.iconWrapper}>
        <Ionicons name={card.icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>{card.label}</Text>
        <Text style={styles.subtitle}>{card.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ThemeModeControl({ mode, onChange, colors, styles }) {
  return (
    <View style={styles.segmentedControl}>
      {MODE_OPTIONS.map((option) => {
        const isSelected = mode === option.id;
        return (
          <TouchableOpacity
            key={option.id}
            style={[styles.segmentedOption, isSelected && styles.segmentedOptionSelected]}
            onPress={() => onChange(option.id)}
            activeOpacity={0.85}
          >
            <Text style={[styles.segmentedLabel, isSelected && styles.segmentedLabelSelected]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function ContactScreen() {
  const { theme, mode, setMode } = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Contact us</Text>
      <Text style={styles.intro}>Got a question? Reach out and we'll get back to you.</Text>

      {CARDS.map((card) => (
        <ContactCard key={card.id} card={card} colors={colors} styles={styles} />
      ))}

      <Text style={styles.note}>
        Check How It Works first — most questions are answered there.
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionHeader}>App settings</Text>

      <View style={styles.settingsCard}>
        <View style={styles.settingsRow}>
          <View style={styles.iconWrapper}>
            <Ionicons name="moon-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.label}>Dark mode</Text>
            <Text style={styles.subtitle}>Follow system, or switch manually</Text>
          </View>
        </View>
        <ThemeModeControl mode={mode} onChange={setMode} colors={colors} styles={styles} />
      </View>
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
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    intro: {
      fontSize: 14,
      lineHeight: 20,
      color: colors.textMuted,
      marginBottom: spacing.lg,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.md,
      minHeight: 44,
      ...shadow,
    },
    iconWrapper: {
      width: 44,
      height: 44,
      borderRadius: radius.pill,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    info: {
      flex: 1,
    },
    label: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 2,
    },
    subtitle: {
      fontSize: 13,
      color: colors.textMuted,
    },
    note: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: spacing.sm,
      textAlign: 'center',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginTop: spacing.lg,
      marginBottom: spacing.lg,
    },
    sectionHeader: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: spacing.sm,
    },
    settingsCard: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      ...shadow,
    },
    settingsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    segmentedControl: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderRadius: radius.pill,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 4,
    },
    segmentedOption: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: radius.pill,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 36,
    },
    segmentedOptionSelected: {
      backgroundColor: colors.primary,
    },
    segmentedLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.textMuted,
    },
    segmentedLabelSelected: {
      color: colors.onColor,
    },
  });
}
