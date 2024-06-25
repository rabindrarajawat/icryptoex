"use client";

import { Theme } from "@/context/ThemeContext/Theme.context";
import { useThemeContext } from "@/context/ThemeContext/Theme.provider";
import { FC } from "react";

const ToggleTheme: FC = () => {
  const { toggleTheme, theme } = useThemeContext();
  console.log("theme:", theme);
  const isLightTheme = theme === Theme.LIGHT;
  console.log("isLightTheme:", isLightTheme);

  return (
    <div >
      <button onClick={toggleTheme}>clicccc</button>
    </div>
  );
};

export default ToggleTheme;
