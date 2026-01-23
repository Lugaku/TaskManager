import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const themes = {
    dark: {
      /* TEXT */
      text: "text-zinc-100",

      /* BACKGROUND */
      background: "bg-zinc-950",

      /* PRIMARY (кнопки / main actions) */
      primaryBg: "bg-zinc-200/90",
      primaryBgHover: "hover:bg-zinc-200",
      primaryText: "text-zinc-950",
      primaryBgText: "text-zinc-200",

      /* SECONDARY */
      secondaryBg: "bg-zinc-800",
      secondaryBgHover: "hover:bg-zinc-700",
      secondaryText: "text-zinc-100",

      /* ACCENT (минимальный, не цветастый) */
      accentBg: "bg-zinc-600",
      accentBgHover: "hover:bg-zinc-500",
      accentBorder: "border-zinc-600/40",
      accentBorderOpacity: "border-zinc-600/15",
      accentText: "text-zinc-100",

      /* GRADIENT (очень мягкий, почти незаметный) */
      gradient: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
    },
  };

  const [currentTheme, setCurrentTheme] = useState("dark");

  return (
    <AppContext.Provider
      value={{
        theme: themes[currentTheme],
        currentTheme,
        setCurrentTheme,
        themes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}