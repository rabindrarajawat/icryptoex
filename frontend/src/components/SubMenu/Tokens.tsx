// import React from "react";
// import Image from "next/image";
// import styles from "./submenu.module.css";

// interface TokensProps {
//   onTokenClick: (symbol: string) => void;
// }

// const Tokens: React.FC<TokensProps> = ({ onTokenClick }) => {
//   return (
//     <div className={styles.Tokens}>
//     <Tokens onTokenClick={onTokenClick} />
  

//     Tokens
//     <div className={styles.eth}>
//       {/* BTC/USDC token */}
//       <div className={styles.btc} onClick={() => onTokenClick("btc")}>
//         <Image
//           src="/assets/BTC.png"
//           alt="btc/usdc"
//           sizes="100vw"
//           style={{
//             width: "100",
//             height: "auto",
//           }}
//           width={30}
//           height={20}
//         />{" "}
//         BTC/USDC
//         <div className={styles.btcusdc}>
//           <span> 51,855.50 </span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="none"
//             viewBox="0 0 16 16"
//           >
//             <circle cx="8" cy="8" r="7.5" stroke="#E8E8E8" fill="#00B386" />
//             <path
//               d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"
//               fill="#E8E8E8"
//             />
//           </svg>{" "}
//           <span className="text-success">2600.83+5.86%</span>
//         </div>
//       </div>

//       {/* ETH/USDC token */}
//       {/* <div className={styles.eth} onClick={() => onTokenClick("eth")}>
//         <Image
//           src="/assets/ETH.png"
//           alt="eth/usdc"
//           sizes="100vw"
//           style={{
//             width: "100",
//             height: "auto",
//           }}
//           width={30}
//           height={20}
//         />{" "}
//         ETH/USDC
//         <div className={styles.btcusdc}>
//           <span> 51,855.50 </span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="none"
//             viewBox="0 0 16 16"
//           >
//             <circle cx="8" cy="8" r="7.5" stroke="#E8E8E8" fill="#00B386" />
//             <path
//               d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8m5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707z"
//               fill="#E8E8E8"
//             />
//           </svg>{" "}
//           <span className="text-success"> 2600.83+5.86%</span>
//         </div>
//       </div> */}

//       {/* SOL/USDC token */}
//       {/* <div className={styles.sol} onClick={() => onTokenClick("sol")}>
//         <Image
//           src="/assets/SOL.png"
//           alt="sol/usdc"
//           sizes="100vw"
//           style={{
//             width: "100",
//             height: "auto",
//           }}
//           width={30}
//           height={20}
//         />{" "}
//         SOL/USDC SOL/USDC
//         <div className={styles.btcusdc}>
//           <span> 51,855.50 </span>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="none"
//             viewBox="0 0 16 16"
//           >
//             <circle cx="8" cy="8" r="7.5" stroke="#E8E8E8" fill="#F45757" />
//             <path
//               d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z"
//               fill="#E8E8E8"
//             />
//           </svg>
//           <span className="text-danger"> 2600.83+5.86%</span>
//         </div>
//       </div> */}
//       {/* <div className={styles.sol} onClick={() => onTokenClick("sol")}>
//         <Image
//           src="/assets/SOL.png"
//           alt="sol/usdc"
//           sizes="100vw"
//           style={{
//             width: "100",
//             height: "auto",
//           }}
//           width={30}
//           height={20}
//         />{" "}
//         SOL/USDC SOL/USDC
//         <div className={styles.btcusdc}>
//           <span> 51,855.50 </span>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="none"
//             viewBox="0 0 16 16"
//           >
//             <circle cx="8" cy="8" r="7.5" stroke="#E8E8E8" fill="#F45757" />
//             <path
//               d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z"
//               fill="#E8E8E8"
//             />
//           </svg>
//           <span className="text-danger"> 2600.83+5.86%</span>
//         </div>
//       </div> */}
//       {/* <div className={styles.sol} onClick={() => onTokenClick("sol")}>
//         <Image
//           src="/assets/SOL.png"
//           alt="sol/usdc"
//           sizes="100vw"
//           style={{
//             width: "100",
//             height: "auto",
//           }}
//           width={30}
//           height={20}
//         />{" "}
//         SOL/USDC SOL/USDC
//         <div className={styles.btcusdc}>
//           <span> 51,855.50 </span>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             fill="none"
//             viewBox="0 0 16 16"
//           >
//             <circle cx="8" cy="8" r="7.5" stroke="#E8E8E8" fill="#F45757" />
//             <path
//               d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m5.904-2.803a.5.5 0 1 0-.707.707L9.293 10H6.525a.5.5 0 0 0 0 1H10.5a.5.5 0 0 0 .5-.5V6.525a.5.5 0 0 0-1 0v2.768z"
//               fill="#E8E8E8"
//             />
//           </svg>
//           <span className="text-danger"> 2600.83+5.86%</span>
//         </div>
//       </div> */}
//     </div>
//     </div>
//   );
// };

// export default Tokens;
