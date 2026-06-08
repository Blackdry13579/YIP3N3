import React, { createContext, useContext, useState } from 'react';
import { lightColors, darkColors, ColorPalette } from '../theme/colors';

interface ThemeCtx {
  isDark: boolean;
  toggle: () => void;
  colors: ColorPalette;
}

const ThemeContext = createContext<ThemeCtx>({
  isDark: false,
  toggle: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider value={{
      isDark,
      toggle: () => setIsDark(d => !d),
      colors: isDark ? darkColors : lightColors,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
