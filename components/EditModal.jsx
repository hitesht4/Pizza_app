import { useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "../styles/Add.module.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Edit(props) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extraOptions, setExtraOptions] = useState([]);
  const [extra, setExtra] = useState(null);

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extra]);
  };

  const handleCreate = async () => {
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "uploads");
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dyclq4y36/image/upload",
          data
        );
        const { url } = uploadRes.data;
        const newProduct = {
          title: title || props.pizza.title,
          desc: desc || props.pizza.desc,
          prices: [...prices] || [...props.pizza.prices],
          extraOptions: [...extraOptions] || [...props.pizza.extraOptions],
          img: url,
        };
        let u = await axios.put(
          `api/products/${props.pizza._id}`,
          newProduct
        );
        const updated = props.pizzaList.map((item) => {
          if (item._id === props.pizza._id) {
            return { _id: props.pizza._id, ...newProduct };
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
        prices: prices.length > 0 ? [...prices] : [...props.pizza.prices],
        extraOptions:
          extraOptions.length > 0
            ? [...extraOptions]
            : [...props.pizza.extraOptions],
        img: props.pizza.img,
      };
      await axios.put(
        `api/products/${props.pizza._id}`,
        newProduct
      );
      const updated = props.pizzaList.map((item) => {
        if (item._id === props.pizza._id) {
          return { _id: props.pizza._id, ...newProduct };
        } else {
          return { ...item };
        }
      });
      console.log(newProduct);
      props.setPizzaList([...updated]);
      props.onHide();
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
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Update
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default Edit;
