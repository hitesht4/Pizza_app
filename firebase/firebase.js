import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzmps4ao-VIPqy317MyrJCgz6Ke5Ej1uY",
  authDomain: "pizzaapp-fce71.firebaseapp.com",
  projectId: "pizzaapp-fce71",
  storageBucket: "pizzaapp-fce71.appspot.com",
  messagingSenderId: "354619749704",
  appId: "1:354619749704:web:ab2b764a24a2080e982f7d",
  measurementId: "G-EKK0V5TWPK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
