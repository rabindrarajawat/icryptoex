import React, { useState } from "react";
import styles from "./spot.module.css";
interface SpotProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}


const Spot: React.FC<SpotProps> = ({ activeMenu, setActiveMenu }) => {
  const [showSpot, setShowSpot] = useState(false);
  

  return (
    <>
  <div className={styles.spot}>
        <div className={`d-block d-sm-none  border border-success m-4`}>
          <div className="p-2 bd-highlight">Trade Crypto With</div>

          <div className="d-flex flex-row bd-highlight mb-3 ms-2 ">
            iCryptoex
            <div
              className="p-2 bd-highlight"
              style={{ marginLeft: "40%", marginTop: "-15%" }}
            >
              <img
                src="/assets/bitcoinimg.png"
                alt="bitcoinimg"
                width={113}
                height={300}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-row bd-highlight justify-content-between mb-3 gap-3 px-4">
          <button
            type="button"
            className={`btn btn-outline-success rounded-4 w-75 ${
              activeMenu === "Deposit" ? styles.activeButton : ""
            }`}
            onClick={() => setActiveMenu("Deposit")}
          >
            Deposit
          </button>
          <button
            type="button"
            className="btn btn-outline-success rounded-4  w-75"
          >
            Withdraw
          </button>
          <button
            type="button"
            className="btn btn-outline-success rounded-4 w-75"
          >
            Transfer
          </button>
        </div>
        <h5 className="ms-4 text-dark">Trading</h5>
        <div className="d-flex flex-row bd-highlight justify-content-between mb-3 gap-3  pt-4 px-4">
          <button
            type="button"
            className={`btn btn-outline-success w-75  ${
              activeMenu === "Spot" ? styles.activeButton : ""
            }`}
            onClick={() => setActiveMenu("Spot Trading")}
          >
            Spot
          </button>

          <button
            type="button"
            className={`btn btn-outline-success w-75  ${
              activeMenu === "Margin" ? styles.activeButton : ""
            }`}
            onClick={() => setActiveMenu("Margin Trading")}
          >
            Margin
          </button>
          <button
            type="button"
            className={`btn btn-outline-success w-75  ${
              activeMenu === "Futures" ? styles.activeButton : ""
            }`}
            onClick={() => setActiveMenu("Futures Trading")}
          >
            Futures
          </button>
        </div>
        
        {activeMenu === "Spot Trading"}
        {activeMenu === "Margin Trading"}
        {activeMenu === "Futures Trading"}
        {activeMenu === "Deposit"}
      </div>
    </>
  );
};
 

export default Spot;
