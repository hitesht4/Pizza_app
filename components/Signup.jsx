import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/LoginComponent.module.css";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import toast, { Toaster } from "react-hot-toast";

const provider = new GoogleAuthProvider();
const Signup = () => {
  const [email, setEmaillog] = useState(null);
  const [password, setPasswordlog] = useState(null);
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
    setCookie(null, "user", user.uid, {
      maxAge: 72000000,
      path: "/",
    });
  };

  if (user) {
    router.push("/");
    return <div>...Loading</div>;
  }
  return (
    <>
      <Form onSubmit={handleSignup} className={styles.Form}>
        <h1>Signup</h1>
        <Form.Control
          className="mb-2 pt-2 pb-2"
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
          Sign Up
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

export default Signup;
