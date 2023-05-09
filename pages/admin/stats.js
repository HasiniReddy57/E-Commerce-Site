import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import SigninPrompt from "@/components/SigninPrompt";
import AdminNavBar from "@/components/adminnavbar";
import styles from "../../styles/Home.module.css";

ChartJs.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function stats({ products }) {
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function datafetch() {
      if (user) {
        const data = await fetch(
          `http://localhost:3000/api/getUser/?email=${user.email}`
        ).then((res) => res.json());

        if (data.role === 1) {
          setIsAdmin(true);
        }
      }
    }

    datafetch();
  }, []);

  let label = [],
    pdata = [],
    pproduct = "",
    lproduct = "",
    totalitemssold = 0,
    maxitemssold = 0,
    minitemssold = 0;
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    var newrevenue = 0;
    products.map((product) => {
      newrevenue = newrevenue + product.itemssold * product.price;
    });
    setRevenue(newrevenue);
  }, [products.itemssold, products.price]);

  products.map((product) => {
    if (label.includes(product.category)) {
      const ind = label.indexOf(product.category);
      const temp = pdata[ind] + product.itemssold;
      pdata[ind] = temp;
    } else {
      label.push(product.category);
      pdata.push(product.itemssold);
    }
    totalitemssold = totalitemssold + product.itemssold;
    if (product.itemssold >= maxitemssold) {
      pproduct = product.title;
      maxitemssold = product.itemssold;
    }
    if (product.itemssold <= minitemssold) {
      lproduct = product.title;
      minitemssold = product.itemssold;
    }
  });

  const data1 = {
    labels: label,
    datasets: [
      {
        data: pdata,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE57", "#00FF00"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE57", "#00FF00"],
      },
    ],
  };

  if (totalitemssold == 0) {
    return (
      <div className="bg-light text-dark d-flex align-items-center justify-content-center">
        <h1 className="m-5 p-5">No Products Sold</h1>
      </div>
    );
  } else {
    return (
      <div className={styles.menu_item}>
        <AdminNavBar />
        {isAdmin ? (
          <div className="card-body d-flex justify-content-center bg-light  text-dark p-3">
            <div className="d-flex row justify-content-md-center">
              <div className="col-xl-4 col-lg-5 col-md-12 m-5">
                <Doughnut data={data1} width={"500px"} />
              </div>
              <div className="col-sm">
                <div className="card-body ms-5 p-5">
                  <h3>
                    <h3>Hey Admin,</h3>
                    <p>
                      <span className="text-primary"> {totalitemssold} </span>
                      items were sold.
                    </p>

                    <p>
                      The total revenue is&nbsp;
                      <span className="text-primary">
                        ${revenue.toFixed(2) || 0}
                      </span>
                    </p>
                  </h3>
                </div>
                <div className="ms-5 p-5">
                  <h4 className="m-2 ">
                    <span className="text-primary">Most Sold Product:</span>
                    &emsp; {pproduct}
                  </h4>

                  <h5 className="m-2">
                    <span className="text-secondary">Least Sold Product:</span>{" "}
                    &emsp;
                    {lproduct}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SigninPrompt />
        )}
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();
  return {
    props: {
      products: data,
    },
  };
}
