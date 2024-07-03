"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./signup.module.css";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [formError, setFormError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const isPasswordStrong = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!isPasswordStrong(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (!isEmailValid(newEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const isPhoneNumberValid = (phone_number) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone_number);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    if (!isPhoneNumberValid(newPhoneNumber)) {
      setPhoneError("Phone number must be 10 digits.");
    } else {
      setPhoneError("");
    }
  };

  const createButton = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone_number || !country || !password || !confirmPassword) {
      setFormError("Please fill in all fields.");
    } else if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      setFormError("");
    } else if (!isPhoneNumberValid(phone_number)) {
      setPhoneError("Phone number must be 10 digits.");
      setFormError("");
    } else if (password !== confirmPassword) {
      setPasswordError("Password and confirm password do not match.");
      setFormError("");
    } else if (passwordError || emailError || phoneError) {
      setFormError("");
    } else {
      setFormError("");
      try {
        const response = await fetch("http://localhost:8000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone_number,
            country,
            password,
          }),
        });
  
        if (response.ok) {
          setSignupSuccess(true);
        } else {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          setPasswordError(`Signup failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        setPasswordError("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div
      className={`d-flex justify-content-center align-items-center ${styles.container}`}
    >
      {signupSuccess ? (
        <div className={styles.formWrapper}>
          <h2 className="text-center">Thank You for Creating an Account!</h2>
          <p className="text-center">
            Your account has been successfully created.
          </p>
          <div className="text-center">
            <a href="/" className="btn btn-primary">
              Login Here
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.formWrapper}>
          <h2 className="text-center">Signup</h2>
          <form onSubmit={createButton}>
            <div className="mb-3">
              <div className={`position-relative ${styles.inputBox}`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <i className={`bi bi-person-fill ${styles.icon}`}></i>
              </div>
            </div>

            <div className="mb-3">
              <div className={`position-relative ${styles.inputBox}`}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {emailError && <p className={styles.error}>{emailError}</p>}
                <i className={`bi bi-envelope-fill ${styles.icon}`}></i>
              </div>
            </div>

            <div className="mb-3">
              <div className={`position-relative ${styles.inputBox}`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={phone_number}
                  onChange={handlePhoneNumberChange}
                  required
                />
                {phoneError && <p className={styles.error}>{phoneError}</p>}
                <i className={`bi bi-telephone-fill ${styles.icon}`}></i>
              </div>
            </div>

            <div className="mb-3">
              <div className={`position-relative ${styles.inputBox}`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
                <i className={`bi bi-geo-alt-fill ${styles.icon}`}></i>
              </div>
            </div>

            <div className="mb-3">
              <div className={`position-relative ${styles.inputBox}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Create Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <i
                  className={`bi ${
                    showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  } ${styles.eyeIcon} ${styles.icon}`}
                  onClick={toggleShowPassword}
                ></i>
              </div>
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </div>

            <div className="mb-3">
              <div className={`position-relative ${styles.inputBox}`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <i
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                  } ${styles.eyeIcon} ${styles.icon}`}
                  onClick={toggleShowConfirmPassword}
                ></i>
              </div>
            </div>

            <div className="mb-3">
              {formError && <p className={styles.error}>{formError}</p>}
              <button type="submit" className="btn btn-dark w-100">
                Create
              </button>
            </div>
            <div className="text-center">
              <p>
                You have an account? <a href="/">Login Here</a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Signup;
