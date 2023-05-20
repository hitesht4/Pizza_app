import React, { useState } from "react";
import styles from "../styles/Admin.module.css";
import toast, { Toaster } from "react-hot-toast";
import Edit from "./EditModal";
import Image from "next/image";
import axios from "axios";

const TableCard = ({ product, setPizzaList, pizzaList }) => {
  const [modalShow, setModalShow] = useState(false);
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        "api/products/" + id
      );
      toast(data.message, {
        style: {
          background: "green",
          color: "white",
        },
      });
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      toast(err.message, {
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };
  return (
    <tr className={styles.trTitle}>
      <td>
        <Image
          src={product.img}
          width={60}
          height={60}
          objectFit="cover"
          alt=""
        />
      </td>
      <td className={styles.Id}>{product._id}</td>
      <td>{product.title}</td>
      <td>${product.prices[0]}</td>
      <td className={styles.Action}>
        <button className={styles.button} onClick={() => setModalShow(true)}>
          Edit
        </button>
        <button
          className={styles.button}
          onClick={() => handleDelete(product._id)}
        >
          Delete
        </button>
      </td>
      <>
        <Edit
          show={modalShow}
          onHide={() => setModalShow(false)}
          pizza={product}
          setPizzaList={setPizzaList}
          pizzaList={pizzaList}
        />
      </>
    </tr>
  );
};

export default TableCard;
