import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createContext, useState } from "react";

const DEFAULT_THEME = "light";
interface IContextState {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
export const ThemeContext = createContext<IContextState>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

const WrapperComponent = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <App />
    </ThemeContext.Provider>
  );
};
createRoot(document.getElementById("root")!).render(<WrapperComponent />);
