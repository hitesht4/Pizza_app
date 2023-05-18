import Link from "next/link";
import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const pizzas = [
  {
    _id: "6463d3d0acafa81db40c5b73",
    title: "MARGHERITA",
    desc: "A hugely popular margherita, with a deliciously tangy single cheese topping",
    img: "https://www.dominos.co.in/files/items/Margherit.jpg",
    prices: [10, 12, 14],
    extraOptions: [
      {
        text: "Double Ingredients",
        price: "2",
      },
      {
        text: "Extra Cheese",
        price: "4",
      },
      {
        text: "Spicy Sauce",
        price: "2",
      },
      {
        text: "Garlic Sauce",
        price: "2",
      },
    ],
  },
  {
    _id: "6463d3d0acafa81db40c5b74",
    title: "CHICKEN GOLDEN DELIGHT",
    desc: "Mmm! Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!",
    img: "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(14).png",
    prices: [14, 18, 22],
    extraOptions: [
      {
        text: "Double Ingredients",
        price: "3",
      },
      {
        text: "Extra Cheese",
        price: "6",
      },
      {
        text: "Spicy Sauce",
        price: "3",
      },
      {
        text: "Garlic Sauce",
        price: "2",
      },
    ],
  },
  {
    _id: "6463d3d0acafa81db40c5b75",
    title: "DOUBLE CHEESE MARGHERITA",
    desc: "The ever-popular Margherita - loaded with extra cheese... oodies of it!",
    img: "https://www.dominos.co.in/files/items/Double_Cheese_Margherita.jpg",
    prices: [12, 14, 16],
    extraOptions: [
      {
        text: "Double Ingredients",
        price: "4",
      },
      {
        text: "Extra Cheese",
        price: "4",
      },
      {
        text: "Spicy Sauce",
        price: "4",
      },
      {
        text: "Garlic Sauce",
        price: "4",
      },
    ],
  },
  {
    _id: "6463d3d0acafa81db40c5b76",
    title: "NON VEG SUPREME",
    desc: "Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers",
    img: "https://www.dominos.co.in/files/items/MicrosoftTeams-image_(13).png",
    prices: [17, 18, 19],
    extraOptions: [
      {
        text: "Double Ingredients",
        price: "5",
      },
      {
        text: "Extra Cheese",
        price: "5",
      },
      {
        text: "Spicy Sauce",
        price: "5",
      },
      {
        text: "Garlic Sauce",
        price: "5",
      },
    ],
  },
];
const PizzaList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BESTSELLER PIZZAS IN TOWN</h1>
      <p className={styles.desc}>
        Get your hands on some delicious pizza in minutes. Which means you can
        spend less time cooking and more time relaxing..
      </p>
      <div className={styles.wrapper}>
        {pizzas.map((pizza) => {
          return <PizzaCard key={pizza._id} pizza={pizza} />;
        })}
      </div>
      <div className={styles.btnDiv}>
        <Link href="/pizzas">
          <button className={styles.btn}>Order Now</button>
        </Link>
      </div>
    </div>
  );
};

export default PizzaList;
