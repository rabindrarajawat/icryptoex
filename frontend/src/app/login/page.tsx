
"use client";
import React, { useState, FormEvent, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };                                                                    

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
          router.push("/");

          if (rememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
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

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setLoggedIn(true);
    }
    const rememberMeStatus = localStorage.getItem("rememberMe");
    if (rememberMeStatus === "true") {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    }
  }, []);

  return (
    <>
      <div>
      
      <div className="d-flex justify-content-between align-items-center p-3">
      <div className={`${styles.background}`}>
            <div className={`${styles.icrytoex} d-flex justify-content-center`}>
              <span className="text-white">icryp</span>
              <span className="text-danger">toex</span>
            </div>
            <div className={`d-flex justify-content-center align-items-center`}>
              <img
                src="/assets/hero.svg"
                alt=""
                className={`${styles.hero} pt-4`}
              />
            </div>
            <div className="d-flex justify-content-center align-item-center">
              <p className={`${styles.home} pt-4`}>
                Home to 500+ Crypto Assets
              </p>
            </div>
          </div>
        </div>
      
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.formContent} onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className={`bi bi-person-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${
                showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"
              } ${styles.eyeIcon} ${styles.icon}`}
              onClick={toggleShowPassword}
            ></i>{" "}
          </div>

          <div className={styles.rememberForget}>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              Remember me
            </label>
            <a
              type="button"
              onClick={() => router.push("/forget")}
              className="text-primary"
            >
              Forget password?
            </a>
          </div>
          <div className={styles.buttonStyle}>
            <button type="submit">Login</button>
          </div>
          <div className={styles.registerLink}>
            <p>
              Not registered yet?{" "}
              <a href="/signup" className="text-primary">
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default LoginForm;
