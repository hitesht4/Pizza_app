import axios from "axios";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";

const Product = ({ data }) => {
  const [size, setSize] = useState(0);
  const [tag,setTag]=useState("small");
  const pizza = data.data[0];
  const [price,setPrice]=useState(pizza.prices[0]);


  const handlePrice=(n)=>{
    setPrice(Number(price)+Number(n));
  }


  const handleSize=(sizeIndex)=>{
    const diff=pizza.prices[sizeIndex]-pizza.prices[size];
    setSize(sizeIndex);
    handlePrice(diff);
  }

  const handleChange=(e,p)=>{
    if(e.target.checked ===true){
      setPrice(Number(price)+Number(p));
    }else{
      setPrice(Number(price)-Number(p));
    }
  }

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
        <div className={styles.price}><span>${price}</span> <span className={styles.number2}>{tag}</span></div>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>

        <div className={styles.sizes}>
          {sizes.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.size}
                onClick={() =>{handleSize(index);setTag(item.tag)}}
                style={{border :index===size ? "2px solid red" :"none"}}
              >
                <Image src="/img/size.png" layout="fill"/>
                <span className={styles.number}>{item.tag}</span>
              </div>
            );
          })}
        </div>


        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((item ,index)=>{
            return ( <div key={index} className={styles.option}>
              <input
                type="checkbox"
                id="double"
                name="double"
                className={styles.checkbox}
                onChange={(e)=>handleChange(e,item.price)}
              />
              <label htmlFor="double">{item.text}</label>
            </div>)
          })}
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const id = context.query.id;
  let { data } = await axios.get(`http://localhost:3000/api/products/${id}`);
  return {
    props: { data },
  };
};

export default Product;
