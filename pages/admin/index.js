import axios from "axios";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";
import {  parseCookies } from "nookies";
import TableCard from "../../components/TableCard";
import AddModal from "../../components/AddModal";
import { Toaster, toast } from "react-hot-toast";


const Index = ({ data }) => {
  const [pizzaList, setPizzaList] = useState(data.data);
  const [modalShow, setModalShow] = useState(false);
 

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Manage Products</h1>
        <div className={styles.flex}>
          <button
            onClick={() => setModalShow(true)}
            className={styles.AddButton}
          >
            Add Product
          </button>
          {/* <button onClick={handleLogout} className={styles.AddButton1}>
            Logout
          </button> */}
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr className={styles.trTitle}>
            <th>Image</th>
            <th className={styles.Id}>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pizzaList.map((product) => (
            <TableCard
              key={product._id}
              product={product}
              setPizzaList={setPizzaList}
              pizzaList={pizzaList}
            />
          ))}
        </tbody>
      </table>
      <AddModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setPizzaList={setPizzaList}
        pizzaList={pizzaList}
      />
      <Toaster />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const myCookie = cookies.admin;

  if (myCookie !== process.env.Admin_Token) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  let { data } = await axios.get("http://localhost:3000/api/products");
  return {
    props: { data },
  };
};

export default Index;
