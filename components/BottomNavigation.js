import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme';

const TABS = [
  { id: 'search', label: 'Search', icon: 'search', activeIcon: 'search' },
  { id: 'tab2', label: 'Coming Soon', icon: 'grid-outline', activeIcon: 'grid' },
  { id: 'tab3', label: 'Coming Soon', icon: 'heart-outline', activeIcon: 'heart' },
  { id: 'tab4', label: 'Coming Soon', icon: 'person-outline', activeIcon: 'person' },
];

function NavItem({ tab, isActive, onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

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
        <Ionicons
          name={isActive ? tab.activeIcon : tab.icon}
          size={22}
          color={isActive ? colors.primary : colors.textMuted}
        />
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
});
