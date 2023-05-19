import axios from "axios";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Delete } from "../../redux/cart/cart.types";
import toast, { Toaster } from "react-hot-toast";

const Product = ({ data }) => {
  const [size, setSize] = useState(0);
  const [tag, setTag] = useState("small");
  const pizza = data.data[0];
  const [price, setPrice] = useState(pizza.prices[0]);
  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState([]);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const handlePrice = (n) => {
    setPrice(Number(price) + Number(n));
  };

  const handleSize = (sizeIndex) => {
    const diff = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    handlePrice(diff);
  };

  const handleChange = (e, p, t) => {
    if (e.target.checked === true) {
      setPrice(Number(price) + Number(p));
      setExtras((prev) => [...prev, t]);
    } else {
      setPrice(Number(price) - Number(p));
      setExtras(extras.filter((extra) => extra !== t));
    }
    console.log(extras);
  };

  const handleAddCart = () => {
    const { title, img, _id } = pizza;
    const item = {
      id: _id,
      title: title,
      img: img,
      price: price,
      extras: [...extras],
      qty: qty,
      total: Number(price) * Number(qty),
    };
    dispatch({ type: Add, payload: item });
    toast("Item was Added to Cart", {
      style: {
        background: "green",
        color: "white",
      },
    });
  };
  const sizes = [{ tag: "small" }, { tag: "medium" }, { tag: "large" }];
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <div className={styles.price}>
          <span>${price}</span> <span className={styles.number2}>{tag}</span>
        </div>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          {sizes.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.size}
                onClick={() => {
                  handleSize(index);
                  setTag(item.tag);
                }}
                style={{ border: index === size ? "2px solid red" : "none" }}
              >
                <Image src="/img/size.png" layout="fill" alt=""/>
                <span className={styles.number}>{item.tag}</span>
              </div>
            );
          })}
        </div>

        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((item, index) => {
            return (
              <div key={index} className={styles.option}>
                <input
                  type="checkbox"
                  id="double"
                  name="double"
                  className={styles.checkbox}
                  onChange={(e) => handleChange(e, item.price, item.text)}
                />
                <label htmlFor="double">{item.text}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            value={qty}
            className={styles.quantity}
            onChange={(e) => setQty(e.target.value)}
          />
          {cart.some((p) => p.id === pizza._id) ? (
            <button
              className={styles.button1}
              onClick={() => {
                dispatch({ type: Delete, payload: pizza._id });
                toast("Item Deleted from Cart", {
                  style: {
                    background: "red",
                    color: "white",
                  },
                });
              }}
            >
              Remove from cart
            </button>
          ) : (
            <button className={styles.button} onClick={handleAddCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  let { data } = await axios.get(`https://pizza-hitesht4.vercel.app/products/${id}`);
  return {
    props: { data },
  };
};

export default Product;
