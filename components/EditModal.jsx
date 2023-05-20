import { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "../styles/Add.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-hot-toast";

function Edit(props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  // const [prices, setPrices] = useState([]);
  // const [extraOptions, setExtraOptions] = useState([]);
  // const [extra, setExtra] = useState(null);

  // const changePrice = (e, index) => {
  //   const currentPrices = prices;
  //   currentPrices[index] = e.target.value;
  //   setPrices(currentPrices);
  // };

  // const handleExtraInput = (e) => {
  //   setExtra({ ...extra, [e.target.name]: e.target.value });
  // };

  // const handleExtra = (e) => {
  //   setExtraOptions((prev) => [...prev, extra]);
  // };

  const handleFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dyclq4y36/image/upload",
        data
      );
      const { url } = uploadRes.data;
      return url;
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleCreate = async () => {
    if (file) {
      const url = await handleFile();
      try {
        const newProduct = {
          title: title || props.pizza.title,
          desc: desc || props.pizza.desc,
          img: url,
        };
        let p=await axios.put(`api/products/${props.pizza._id}`, newProduct);
        const updated = props.pizzaList.map((item) => {
          if (item._id === props.pizza._id) {
            return { ...props.pizza ,...newProduct };
          } else {
            return { ...item };
          }
        });
        props.setPizzaList([...updated]);
        props.onHide();
        return toast("Item was updated successfully", {
          style: {
            background: "green",
            color: "white",
          },
        });
      } catch (err) {
        return toast(err.message, {
          style: {
            background: "red",
            color: "white",
          },
        });
      }
    } else {
      const newProduct = {
        title: title || props.pizza.title,
        desc: desc || props.pizza.desc,
      };
      try {
        await axios.put(`api/products/${props.pizza._id}`, newProduct);
        const updated = props.pizzaList.map((item) => {
          if (item._id === props.pizza._id) {
            return {  ...props.pizza, ...newProduct };
          } else {
            return { ...item };
          }
        });
        props.setPizzaList([...updated]);
        props.onHide();
        return toast("Item was updated successfully", {
          style: {
            background: "green",
            color: "white",
          },
        });
      } catch (e) {
        return toast(err.message, {
          style: {
            background: "red",
            color: "white",
          },
        });
      }
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="p-4"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Pizza
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Update
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default Edit;
