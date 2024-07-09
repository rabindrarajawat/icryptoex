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
  const [passwordErrors, setPasswordErrors] = useState([]);
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

  const validatePassword = (password) => {
    const errors = [];
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must include at least one lowercase letter.");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must include at least one uppercase letter.");
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must include at least one number.");
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push("Password must include at least one special character.");
    }
    if (!/.{8,}/.test(password)) {
      errors.push("Password must be at least 8 characters long.");
    }
    return errors;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const errors = validatePassword(newPassword);
    setPasswordErrors(errors);
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
    if (
      !name ||
      !email ||
      !phone_number ||
      !country ||
      !password ||
      !confirmPassword
    ) {
      setFormError("Please fill in all fields.");
      return;
    } else if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      setFormError("");
      return;
    } else if (!isPhoneNumberValid(phone_number)) {
      setPhoneError("Phone number must be 10 digits.");
      setFormError("");
      return;
    } else if (password !== confirmPassword) {
      setPasswordErrors(["Password and confirm password do not match."]);
      setFormError("");
      return;
    } else if (passwordErrors.length > 0 || emailError || phoneError) {
      setFormError("");
      return;
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
          setPasswordErrors([`Signup failed: ${errorData.message}`]);
        }
      } catch (error) {
        console.error("Error:", error);
        setPasswordErrors(["An error occurred. Please try again."]);
      }
    }
  };

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
              <p className={`${styles.home} pt-4`}>Home to 500+ Crypto Assets</p>
            </div>
          </div>
        </div>
      </div>
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
              <a href="/login" className="btn btn-primary">
                Login
              </a>
            </div>
          </div>
        ) : (
          <div className={styles.formWrapper}>
            <h2 className="text-center">Create account</h2>
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
                  <select
                    className={`form-control border border-1 border-secondary ${styles.inputBox}`}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select Country</option>
                    <option value="in">India</option>
                    <option value="Australia">Australia</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Colombia">Colombia	</option>
                  </select>
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
                {passwordErrors.length > 0 && (
                  <ul className={styles.errorList}>
                    {passwordErrors.map((error, index) => (
                      <li key={index} className={styles.error}>
                        {error}
                      </li>
                    ))}
                  </ul>
                )}
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
                <button type="submit" className="btn btn-dark w-100">
                  Create
                </button>
                {formError && (
                  <p className={`${styles.error} mt-2`}>{formError}</p>
                )}
              </div>
              <div className="text-center">
                <p>
                  Already have an account?
                  <a href="/login">Login</a>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Signup;
