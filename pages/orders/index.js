import axios from "axios";
import styles from "../../styles/Order.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Order = ({ orders }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return <div>Not Authorised</div>;
    }
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trTitle}>
                <th>Ordered Items</th>
                <th>Order ID</th>
                <th>Total Items</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr className={styles.tr} key={o._id}>
                  <td>
                    {o.items.map((i, index) => (
                      <div className={styles.orderItems} key={index}>
                        <div className={styles.orderItem}>
                          <div>
                            <img src={i.img} />
                          </div>
                          <div>{i.title}</div>
                          <div>{i.price}$</div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>{o._id}</td>
                  <td>{o.items.length}</td>
                  <td>{o.total}</td>
                  <td>Not Paid</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);

  const myCookie = cookies.user;
  console.log(myCookie);

  let { data } = await axios.get("http://localhost:3000/api/orders", {
    headers: {
      user: myCookie,
    },
  });
  return {
    props: { orders: data.orders },
  };
};

export default Order;
