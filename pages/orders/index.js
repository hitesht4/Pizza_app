import axios from "axios";
import styles from "../../styles/Order.module.css";
import { parseCookies } from "nookies";

const Order = ({ orders }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {orders.length<=0 ? <h1>You Have Not Placed Any Orders Yet !</h1>:<table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Ordered Items</th>
              <th className={styles.one}>Order ID</th>
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
                    <div key={index} className={styles.orderItem}>
                      <div>
                        <img src={i.img} />
                      </div>
                      <div>{i.title}</div>
                      <div>{i.price}$</div>
                    </div>
                  ))}
                </td>
                <td className={styles.one}>{o._id}</td>
                <td>{o.items.length}</td>
                <td>{o.total}$</td>
                <td>Not Paid</td>
              </tr>
            ))}
          </tbody>
        </table>}
        
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);

  const myCookie = cookies.user;
  if (!myCookie) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

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
