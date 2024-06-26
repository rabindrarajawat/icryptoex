"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Theme } from "@/context/ThemeContext/Theme.context";

import { useThemeContext } from "@/context/ThemeContext/Theme.provider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SubMenu from "@/components/SubMenu/SubMenu";
import { useState } from "react";
import LoginForm from "@/components/Login/Login";
import { MarginTrading } from "@/components/MarginTrading/MarginTrading";
import { FuturesTrading } from "@/components/FuturesTrading/FuturesTrading";
import Head from "next/head";
import Spot from "@/components/spotTradingm/Spot";
// Assuming Deposit component is imported correctly
import Deposit from "@/components/Deposit/Deposit";

export default function Home() {
  const { theme } = useThemeContext();
  const isLightTheme = theme === Theme.LIGHT;
  const [activeMenu, setActiveMenu] = useState("Spot Trading");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <main>
        <Head>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
            rel="stylesheet"
          />
        </Head>
        
        <div>
          {!isLoggedIn ? (
            <LoginForm onLogin={() => setIsLoggedIn(true)} />
          ) : (
            <>
              <Header />
              <Spot activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
              <SubMenu
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                activePerformance={""}
                setActivePerformance={() => {}}
              /> 
              <MarginTrading
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                activePerformance={""}
                setActivePerformance={() => {}}
              />
              <FuturesTrading
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                activePerformance={""}
                setActivePerformance={() => {}}
              /> 
              <Deposit
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
              {/* <Footer /> */}
            </>
          )}
        </div>
      </main>
    </>
  );
}
