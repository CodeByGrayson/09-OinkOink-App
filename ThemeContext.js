import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './theme';

const STORAGE_KEY = '@oinkoink/theme-mode';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const deviceScheme = useColorScheme();
  const [mode, setModeState] = useState('system'); // 'system' | 'light' | 'dark'
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setModeState(stored);
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const setMode = (nextMode) => {
    setModeState(nextMode);
    AsyncStorage.setItem(STORAGE_KEY, nextMode);
  };

  const resolvedScheme = mode === 'system' ? deviceScheme ?? 'light' : mode;
  const theme = resolvedScheme === 'dark' ? darkTheme : lightTheme;

  const value = useMemo(
    () => ({ theme, mode, resolvedScheme, setMode }),
    [theme, mode, resolvedScheme]
  );

  // Avoid a flash of the default theme before the stored preference loads.
  if (!isLoaded) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
