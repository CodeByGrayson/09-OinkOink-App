import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const TABS = [
  { id: 'search', label: 'Search', icon: 'search', activeIcon: 'search' },
  { id: 'tab2', label: 'How It Works', icon: 'grid-outline', activeIcon: 'grid' },
  { id: 'tab3', label: 'Drops', icon: 'pokeball' },
  { id: 'tab4', label: 'Coming Soon', icon: 'person-outline', activeIcon: 'person' },
];

// Plain-geometry stylized ball (circle + band + center dot) in the app's own
// palette — deliberately not a reproduction of the trademarked Poké Ball design.
function PokeballIcon({ size = 22, color }) {
  const centerSize = Math.round(size * 0.36);
  return (
    <View style={[styles.pokeball, { width: size, height: size, borderRadius: size / 2, borderColor: color }]}>
      <View style={[styles.pokeballBand, { backgroundColor: color }]} />
      <View
        style={[
          styles.pokeballCenter,
          { width: centerSize, height: centerSize, borderRadius: centerSize / 2, borderColor: color },
        ]}
      />
    </View>
  );
}

function NavItem({ tab, isActive, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const color = isActive ? colors.primary : colors.textMuted;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.85, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 4 }),
    ]).start();
    onPress(tab.id);
  };

  return (
    <Pressable style={styles.item} onPress={handlePress} hitSlop={8}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {tab.icon === 'pokeball' ? (
          <PokeballIcon color={color} />
        ) : (
          <Ionicons name={isActive ? tab.activeIcon : tab.icon} size={22} color={color} />
        )}
      </Animated.View>
      <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
    </Pressable>
  );
}

export default function BottomNavigation({ activeTab, onChangeTab }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <NavItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onPress={onChangeTab}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.sm,
    gap: 4,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  pokeball: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pokeballBand: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 1.5,
    marginTop: -0.75,
  },
  pokeballCenter: {
    borderWidth: 1.5,
    backgroundColor: colors.surface,
  },
});
