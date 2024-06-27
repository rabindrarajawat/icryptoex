// "use client";
// import Image from "next/image";
// import styles from "./page.module.css";
// import { Theme } from "@/context/ThemeContext/Theme.context";

// import { useThemeContext } from "@/context/ThemeContext/Theme.provider";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import SubMenu from "@/components/SubMenu/SubMenu";
// import { useState } from "react";
// import LoginForm from "@/components/Login/Login";
// import { MarginTrading } from "@/components/MarginTrading/MarginTrading";
// import { FuturesTrading } from "@/components/FuturesTrading/FuturesTrading";
// import Head from "next/head";
// import Spot from "@/components/spotTradingm/Spot";
// // Assuming Deposit component is imported correctly
// import Deposit from "@/components/Deposit/Deposit";

// export default function Home() {
//   const { theme } = useThemeContext();
//   const isLightTheme = theme === Theme.LIGHT;
//   const [activeMenu, setActiveMenu] = useState("Spot Trading");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <>
//       <main>
//         <Head>
//           <link
//             href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
//             rel="stylesheet"
//           />
//         </Head>
        
//         <div>
//           {!isLoggedIn ? (
//             <LoginForm onLogin={() => setIsLoggedIn(true)} />
//           ) : (
//             <>
//               <Header />
//               <Spot activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
//               <SubMenu
//                 activeMenu={activeMenu}
//                 setActiveMenu={setActiveMenu}
//                 activePerformance={""}
//                 setActivePerformance={() => {}}
//               /> 
//               <MarginTrading
//                 activeMenu={activeMenu}
//                 setActiveMenu={setActiveMenu}
//                 activePerformance={""}
//                 setActivePerformance={() => {}}
//               />
//               <FuturesTrading
//                 activeMenu={activeMenu}
//                 setActiveMenu={setActiveMenu}
//                 activePerformance={""}
//                 setActivePerformance={() => {}}
//               /> 
//               <Deposit
//                 activeMenu={activeMenu}
//                 setActiveMenu={setActiveMenu}
//               />
//               {/* <Footer /> */}
//             </>
//           )}
//         </div>
//       </main>
//     </>
//   );
// }





"use client";
import React, { useState, FormEvent } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username && password) {
      console.log(`Username: ${username}, Password: ${password}`);
      // Simulating an onLogin action
      router.push("/home");
    } else {
      // Optionally, display an error message or handle empty fields
      console.log("Please fill in both username and password.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        <form className={styles.formContent} onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <i className={`bi bi-person-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className={`bi bi-lock-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.rememberForget}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forget password?</a>
          </div>
          <div className={styles.buttonStyle}>
            <button type="submit">Login</button>
          </div>
          <div className={styles.registerLink}>
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
