import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropsService from '../services/DropsService';
import { colors, radius, shadow, spacing } from '../theme';

function formatDate(dateString) {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Groups the feed into full-width promotion rows and 2-up new_design rows,
// preserving feed order (drops arrive pre-sorted newest-first).
function buildRows(drops) {
  const rows = [];
  let pendingPair = [];

  const flushPair = () => {
    if (pendingPair.length) {
      rows.push({ kind: 'new_design_row', items: pendingPair });
      pendingPair = [];
    }
  };

  for (const item of drops) {
    if (item.type === 'promotion') {
      flushPair();
      rows.push({ kind: 'promotion', items: [item] });
    } else {
      pendingPair.push(item);
      if (pendingPair.length === 2) flushPair();
    }
  }
  flushPair();

  return rows;
}

function PromotionBanner({ item }) {
  const [width, setWidth] = useState(0);
  const ratio = item.imageWidth / item.imageHeight;

  return (
    <View style={styles.promotionCard}>
      <View style={styles.promotionImageWrapper} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
        <Image
          source={item.image}
          style={[styles.promotionImage, { height: width ? width / ratio : 0 }]}
          resizeMode="contain"
        />
      </View>
      <View style={styles.promotionInfo}>
        <Text style={styles.promotionTitle}>{item.title}</Text>
        <Text style={styles.paragraph}>{item.description}</Text>
        <Text style={styles.validity}>
          Valid {formatDate(item.validFrom)} – {formatDate(item.validTo)}
        </Text>
      </View>
    </View>
  );
}

// Reuses SpeciesCard's 600x835 card frame (radius, shadow, aspect ratio) for
// visual consistency with the Search tab, rather than a new frame style.
function NewDesignCard({ item }) {
  return (
    <View style={styles.designCard}>
      <View style={styles.designImageWrapper}>
        <Image source={item.image} style={styles.designImage} resizeMode="cover" />
      </View>
      <View style={styles.designInfo}>
        <Text style={styles.designName} numberOfLines={2}>
          {item.pokemon}
        </Text>
        <Text style={styles.designDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

export default function DropsScreen() {
  const [drops, setDrops] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const active = await DropsService.getActive();
      setDrops(active);
      setStatus('ready');
    } catch (error) {
      console.error('Failed to load drops:', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const rows = useMemo(() => buildRows(drops), [drops]);

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Couldn't load drops. Check your connection.</Text>
        <TouchableOpacity style={styles.retryButton} onPress={load}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (rows.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No drops yet. Check back soon.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {rows.map((row) =>
        row.kind === 'promotion' ? (
          <PromotionBanner key={row.items[0].id} item={row.items[0]} />
        ) : (
          <View key={row.items.map((item) => item.id).join('-')} style={styles.designRow}>
            {row.items.map((item) => (
              <NewDesignCard key={item.id} item={item} />
            ))}
          </View>
        )
      )}
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
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  errorText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
  },
  retryButtonText: {
    color: colors.surface,
    fontWeight: '600',
  },
  promotionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    ...shadow,
  },
  promotionImageWrapper: {
    width: '100%',
    backgroundColor: colors.border,
  },
  promotionImage: {
    width: '100%',
  },
  promotionInfo: {
    padding: spacing.md,
  },
  promotionTitle: {
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
  validity: {
    fontSize: 13,
    color: colors.textMuted,
  },
  designRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  designCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadow,
  },
  designImageWrapper: {
    aspectRatio: 600 / 835,
    backgroundColor: colors.border,
  },
  designImage: {
    width: '100%',
    height: '100%',
  },
  designInfo: {
    padding: spacing.sm,
  },
  designName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 18,
  },
  designDescription: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
});
