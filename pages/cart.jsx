import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import {AiFillDelete} from 'react-icons/ai';
import { Delete } from "../redux/cart/cart.types";
import { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const {cart}=useSelector((state)=>state.cart);
  const dispatch=useDispatch();
  const[total,setTotal]=useState(0);

  const handleDelete=(id)=>{
   dispatch({type:Delete,payload:id})
  }

  console.log(JSON.stringify(cart));

  const createCheckoutSession=async()=>{
    try{
      let res=await axios.post("http://localhost:3000/api/checkout_sessions",{cart});
      console.log(res.data);
      window.open(res.data.sessionUrl,"_blank");
    }catch(e){
     console.log(e.message);
    }
    
  }
  useEffect(()=>{
   const t=cart.reduce((ac,cv)=>{
    return ac+cv.total;
   },0);
   setTotal(t);
  },[cart])


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead className={styles.thead}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delete</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
            {cart.map((item,index)=>{
              return (  <tr className={styles.tr} key={index}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={item.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{item.title}</span>
                </td>
                <td>
                  <p className={styles.extras}>
                    {item.extras.map((i,index)=>(
                      <span key={index}>{i}</span>
                    ))}
                  </p>
                </td>
                <td>
                  <span className={styles.price}>${item.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{item.qty}</span>
                </td>
                <td>
                  <span className={styles.delete} onClick={()=>handleDelete(item.id)}><AiFillDelete style={{fontSize:"2rem"}}/></span>
                </td>
                <td>
                  <span className={styles.total}>${item.total}</span>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total}
          </div>
          <button className={styles.button} onClick={createCheckoutSession}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
