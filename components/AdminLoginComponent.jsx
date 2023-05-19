import React, { useEffect, useState } from "react";
import styles from "../styles/AdminForm.module.css";
import { Button, Form } from "react-bootstrap";
import { setCookie } from "nookies";
import axios from "axios";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import { parseCookies } from 'nookies';

const AdminLoginComponent = () => {
    const [username, setUsernamelog] = useState(null);
    const [password, setPasswordlog] = useState(null);
    const cookies = parseCookies();

    const adminCookie = cookies.admin;
    const router = useRouter();
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        let {
          data: { status },
        } = await axios.post("https://pizza-hitesht4.vercel.app/api/login", {
          username,
          password,
        });
        if (status === true) {
          toast("Welcome to Admin Dashboard", {
            style: {
              background: "green",
              color: "white",
            },
          });
          setCookie(null, "admin", "jzfimSSrgjaY9zzRqdKhTPiZn1f2", {
            maxAge: 3600,
            path: "/",
          });
          router.push("/admin");
        }
      } catch (e) {
        toast(e.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
      }
    };
    useEffect(()=>{
      if(adminCookie){
        router.push("/admin");
      }
    },[adminCookie,router])
  return (
    <div className={styles.adminContainer}>
    <Form onSubmit={handleLogin} className={styles.Form}>
      <h1>Login</h1>
      <Form.Control
        className="mb-2 pt-2 pb-2"
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsernamelog(e.target.value);
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
    </Form>
    <Toaster />
  </div>
  )
}

export default AdminLoginComponent