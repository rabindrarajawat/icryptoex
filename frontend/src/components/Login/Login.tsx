import React, { useState, FormEvent } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './Login.module.css';

// Prop type for the LoginForm component
interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);

    onLogin();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        <form className={styles.formContent} onSubmit={handleLogin}>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <a href="#">Forget password?</a>
          </div>
          <div className={styles.buttonStyle}>
            <button type="submit">Login</button>
          </div>
          <div className={styles.registerLink}>
            <p>
              Don't have an account? <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
