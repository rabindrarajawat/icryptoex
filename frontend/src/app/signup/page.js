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
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const createButton = async (e) => {
    e.preventDefault();
    if (name && username && email && phone_number && country && password && confirmPassword) {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match.");
      } else {
        try {
          const response = await fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, username, email, phone_number, country, password }),
          });
  
          if (response.ok) {
            router.push("/home");
            toast.success("Account created successfully!");
          } else {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            toast.error(`Signup failed: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error("An error occurred. Please try again.");
        }
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
              type="text"
              placeholder="Phone"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <i className={`bi bi-telephone-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <i className={`bi bi-geo-alt-fill ${styles.icon}`}></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill" } ${styles.eyeIcon} ${styles.icon}`}
              onClick={toggleShowPassword}
            ></i>
          </div>

          <div className={styles.inputBox}>
            <input
              type={showConfirmPassword ? "password" : "text"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i
              className={`bi ${showConfirmPassword ? "bi-eye-fill":"bi-eye-slash-fill" } ${styles.eyeIcon} ${styles.icon}`}
              onClick={toggleShowConfirmPassword}
            ></i>
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
