import React, { PureComponent, useState } from 'react'
import styles from "./Deposit.module.css";


interface SpotProps {
    activeMenu: string;
    setActiveMenu: (menu: string) => void;
  }
  
  const Deposit: React.FC<SpotProps> = ({ activeMenu, setActiveMenu }) => {
    return (
        <>
        <div className={` d-none d-lg-block${styles.Deposit}`}>
            Deposit
        </div>
        </>
    )

  
  }
  export default Deposit;
