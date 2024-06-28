"use client";
import React, { useState, FormEvent } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      console.log("Full response:", response);
      if (response.status === 200) {
        const token = response.data; 
        console.log("Received token:", token); 
        if (token) {
          localStorage.setItem("token", token);
          console.log("Login successful");
          router.push("/home"); 
        } else {
          console.error("Token is undefined");
          setError("Login failed: Token is undefined");
        }
      } else {
        console.error("Login failed");
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.formContent} onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="userEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className={`bi bi-person-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="password"
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
            <button type="button" onClick={() => router.push("/forget")}>
              Forget password?
            </button>
          </div>
          <div className={styles.buttonStyle}>
            <button type="submit">Login</button>
          </div>
          <div className={styles.registerLink}>
            <p>
              Don't have an account? <a href="/signup">SignUp</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
