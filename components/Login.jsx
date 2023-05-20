import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "../styles/LoginComponent.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

import { setCookie } from "nookies";

import toast, { Toaster } from "react-hot-toast";

const provider = new GoogleAuthProvider();
const Login = () => {
  const [email, setEmaillog] = useState(null);
  const [password, setPasswordlog] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      let { user } = await signInWithEmailAndPassword(auth, email, password);
      setCookie(null, "user", user.uid, {
        maxAge: 72000000,
        path: "/",
      });
    } catch (e) {
      toast(e.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithPopup(auth, provider);
    let res = setCookie(null, "user", user.uid, {
      maxAge: 72000000,
      path: "/",
    });
  };

  return (
    <>
      <Form onSubmit={handleLogin} className={styles.Form}>
        <h1>Login</h1>
        <Form.Control
          className="mb-2 pt-2 pb-2"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmaillog(e.target.value);
          }}
          required
        />
        <Form.Control
          className="mb-2 pt-2 pb-2"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordlog(e.target.value);
          }}
          required
        />
        <Button size="lg" type="submit" className={styles.signin}>
          Sign In
        </Button>
        <hr />
        <Button className={styles.google} size="lg" onClick={signInWithGoogle}>
          <FcGoogle />
          Sign In with Google
        </Button>
      </Form>
      <Toaster />
    </>
  );
};

export default Login;
