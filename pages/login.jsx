import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Login.module.css";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmaillog] = useState(null);
  const [password, setPasswordlog] = useState(null);
  const handleLogin = () => {};
  return (
    <div className={styles.container}>
      <Form onSubmit={handleLogin} className={styles.Form}>
        <h1>Login</h1>
        <Form.Control
          className="mb-4 pt-2 pb-2"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmaillog(e.target.value);
          }}
        />
        <Form.Control
          className="mb-2 pt-2 pb-2"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordlog(e.target.value);
          }}
        />
        <Button size="lg" type="submit" className={styles.signin}>
          Sign In
        </Button>
        <hr />
        <Button
        className={styles.google}
          size="lg"
          type="submit"
        >
          <FcGoogle />
          Sign In with Google
        </Button>
      </Form>
    </div>
  );
};

export default Login;
