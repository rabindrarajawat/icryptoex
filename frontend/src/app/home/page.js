"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Theme } from "@/context/ThemeContext/Theme.context";

import ToggleTheme from "@/components/Toggle";
import { useThemeContext } from "@/context/ThemeContext/Theme.provider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SubMenu from "@/components/SubMenu/SubMenu";
import { useState } from "react";
import { MarginTrading } from "@/components/MarginTrading/MarginTrading";
import { FuturesTrading } from "@/components/FuturesTrading/FuturesTrading";


export default function Home() {
  const { theme } = useThemeContext();
  // console.log("theme:", theme);
  const isLightTheme = theme === Theme.LIGHT;
  const [activeMenu, setActiveMenu] = useState("Spot Trading");
  
  return (
    <main className={styles.myContianer}>
  
      <div>
        <Header />
        <SubMenu
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activePerformance={""}
          setActivePerformance={() => {
            throw new Error("Function not implemented.");
          }}
        />

        <MarginTrading
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activePerformance={""}
          setActivePerformance={() => {
            throw new Error("Function not implemented.");
          }}
        />
        <FuturesTrading
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          activePerformance={""}
          setActivePerformance={() => {
            throw new Error("Function not implemented.");
          }}
        />

        {/* <Footer /> */}
      </div>
    </main>
  );
}
