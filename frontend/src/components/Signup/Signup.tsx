import React, { useState, FormEvent } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './signup.module.css';

// Prop type for the LoginForm component
interface SignupFormProps {
  onSignup: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const [name, setname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);

    onSignup();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        <form className={styles.formContent} onSubmit={handleLogin}>
         
         
        <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
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
 <i className={`bi bi-envelope-fill ${styles.icon}`}></i>          </div>

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
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
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
              You have an account? <a href="#">Login Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
