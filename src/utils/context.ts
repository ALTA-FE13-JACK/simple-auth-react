import { createContext } from "react";

interface ThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const theme = {
  theme: "",
  setThme: () => {},
};

export const ThemeContext = createContext(theme);
