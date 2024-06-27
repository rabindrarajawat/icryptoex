"use client";
import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './signup.module.css';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const createButton = (e) => {
    e.preventDefault();
    if (name && username && password && email && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match.");
      } else {
        // All fields are filled and passwords match, navigate to home page
        router.push("/home");
        toast.success("Account created successfully!");
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.formWrapper}>
        <h2>Signup</h2>
        <form className={styles.formContent} onSubmit={createButton}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <i className={`bi bi-person-fill ${styles.icon}`}></i>
          </div>

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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className={`bi bi-envelope-fill ${styles.icon}`}></i>
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

          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i className={`bi bi-lock-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.rememberForget}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            {/* <a href="#">Forget password?</a> */}
          </div>
          <div className={styles.buttonStyle}>
            <button type="submit">Create</button>
          </div>
          <div className={styles.registerLink}>
            <p>
              You have an account? <a href="/">Login Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
