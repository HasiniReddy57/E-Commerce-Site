import styles from "../styles/cart.module.css";
import dynamic from "next/dynamic";
import CartCard from "@/components/CartCard";
import SigninPrompt from "@/components/SigninPrompt";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import { useRef, useEffect, useState } from "react";
import NavBar from "@/components/navbar";

function Cart() {
  const [cart, setCart] = useState([]);
  const total = useRef(0);
  const userData = useRef();
  const [reload, setReload] = useState(false);
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const prod = useRef();

  useEffect(() => {
    async function datafetch() {
      userData.current = await fetch(
        `http://localhost:3000/api/userData/${user.email}`
      ).then((res) => res.json());

      setCart(userData.current[0].cart);
    }
    if (user) {
      datafetch();
    }
  }, [reload]);
  total.current = cart.reduce((a, x) => {
    return a + x.price * x.quantity;
  }, 0);
  async function Checkout() {
    const proms = cart.map((pro) => {
      fetch(`http://localhost:3000/api/ProductData/${pro.id}`, {
        method: "PATCH",

        body: JSON.stringify({
          quantity: pro.quantity,
        }),
      });
    });
    Promise.all(proms)
      .then(() => {
        fetch(`http://localhost:3000/api/userData/${user.email}`, {
          method: "PATCH",

          body: JSON.stringify({
            cart: [],
          }),
        });
      })
      .then(() => {
        setReload((old) => !old);
      });
  }
  return (
    <>
      <NavBar reload={reload} />
      <div
        className={`text-bg-light container-fluid ${styles.cart_display}`}
        style={{ backgroundColor: "white" }}
      >
        {user != null && (
          <div
            className={`container-fluid pt-2 text-dark bg-light ${styles.cart_display}`}
            style={{ backgroundColor: "white" }}
          >
            {cart.length > 0 ? (
              <div className="d-flex  justify-content-between  text-dark bg-light p-2 m-4 text-light">
                <div className="d-inline-flex justify-content-between ">
                  <h4 className="align-self-center ">
                    Your Total:{" "}
                    <span className="text-primary">
                      $ {total.current.toFixed(2)}
                    </span>
                  </h4>
                  <button
                    className="btn btn-primary ms-4 me-5 pt-2"
                    onClick={Checkout}
                  >
                    <h5>Checkout</h5>
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex flex-wrap gap-3 p-4 ">
              {cart.length == 0 ? (
                <div className="text-success d-flex flex-column align-items-center flex-fill">
                  <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"></img>
                  <h3> Your cart is empty</h3>
                </div>
              ) : (
                cart.map((product) => {
                  return (
                    <CartCard
                      key={product.id}
                      props={product}
                      user={userData.current[0]}
                      setReload={setReload}
                    />
                  );
                })
              )}
            </div>
          </div>
        )}

        {user == null && <SigninPrompt />}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
