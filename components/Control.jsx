import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import styles from "../styles/Login.module.css";

const Control = () => {
  const [option, setOption] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.console}>
          <div
            onClick={() => setOption(false)}
            style={{
              borderBottom: !option ? "2px solid #c7102e" : "",
              color: !option ? "#c7102e" : "",
            }}
          >
            Login
          </div>
          <div
            onClick={() => setOption(true)}
            style={{
              borderBottom: option ? "2px solid #c7102e" : "",
              color: option ? "#c7102e" : "",
            }}
          >
            Signup
          </div>
        </div>
        <div className={styles.controller}>
          {option ? <Signup /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Control;
