// import React, { useState, FormEvent } from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import styles from "./Login.module.css";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// interface LoginFormProps {
//   onLogin: () => void;
// }

// const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         console.log("Login successful");
//         onLogin();
//       } else {
//         console.error("Login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formWrapper}>
//         <h2>Login</h2>
//         <form className={styles.formContent} onSubmit={handleLogin}>
//           <div className={styles.inputBox}>
//             <input
//               type="text"
//               placeholder="userEmail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <i className={`bi bi-person-fill ${styles.icon}`}></i>
//           </div>

//           <div className={styles.inputBox}>
//             <input
//               type="password"
//               placeholder="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <i className={`bi bi-lock-fill ${styles.icon}`}></i>
//           </div>

//           <div className={styles.rememberForget}>
//             <label>
//               <input type="checkbox" />
//               Remember me
//             </label>
//             <button type="button" onClick={() => router.push("/forget")}>
//               Forget password?
//             </button>
//           </div>
//           <div className={styles.buttonStyle}>
//             <button type="submit">Login</button>
//           </div>
//           <div className={styles.registerLink}>
//             <p>
//               Don't have an account? <a href="#">SignUp</a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

