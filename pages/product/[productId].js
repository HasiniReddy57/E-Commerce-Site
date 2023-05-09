import styles from "../../styles/Home.module.css";
import Link from "next/link";

import { FaRegHeart, FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import NavBar from "@/components/navbar";
function productdetails({ product }) {
  console.log(product);
  const router = useRouter();

  // const [textLength, setTextLength] = useState(100);
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(user_decoded);

  useEffect(() => {
    async function datafetch() {
      if (user) {
        const data = await fetch(
          `http://localhost:3000/api/getUser?email=${user.email}`
        ).then((res) => res.json());

        if (data.role === 1) {
          setIsAdmin(true);
        }
      }
    }
    datafetch();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();
    if (!user) router.push("/signin");
    else {
      const resp = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      );
      const userResp = await resp.json();
      const unique_cart = userResp.cart.findIndex(
        (prod) => product.id === prod.id
      );

      if (unique_cart == -1) {
        let cartdata = fetch(
          `http://localhost:3000/api/updateCart?id=${userResp.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: [...userResp.cart, { ...product, quantity: 1 }],
            }),
          }
        ).then((res) => res.json());

        if (cartdata) {
          router.push("/cart");
        }
      }
    }
  };

  const addToWishList = async (e) => {
    e.preventDefault();
    if (!user) router.push("/signin");
    else {
      const resp = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      );
      const userResp = await resp.json();
      const unique_wish = userResp.wishlist.findIndex(
        (prod) => product.id === prod.id
      );

      if (unique_wish == -1) {
        const wishdata = fetch(
          `http://localhost:3000/api/updateWishlist?id=${userResp.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              wishlist: [...userResp.wishlist, product],
            }),
          }
        )
          .then((res) => res.json())
          .then(() => router.push("/wishlist"));
      }

      router.push("/wishlist");
    }
  };

  if (Object.keys(product).length == 0) router.push("/");

  return (
    <>
      <div className={`bg-light border border-light card ${styles.menu_item}`}>
        <NavBar />
        <div
          className={`card-body d-flex justify-content-center ${styles.menu_item}`}
          style={{ margin: "20px" }}
        >
          <div className="d-flex row justify-content-md-center">
            <div className="col-lg-4 col-sm-12 my-5">
              <img
                src={product.image}
                className="card-img-top m-5 "
                alt="product"
                // width="200"
                // height="450"
              />
            </div>
            <div className="col-lg-8 col-sm-12">
              <div
                className={`card-body ${styles.menu_item}`}
                style={{ margin: "100px" }}
              >
                <h1 className="card-title">{product.title}</h1>
                <h4 className="card-text">
                  {" "}
                  <span className="text-primary">Category: </span>
                  {product.category}
                </h4>
                <p className="card-text">{product.description}</p>
                <div className="row">
                  <div className="col-md-8 col-sm-6">
                    <h4 className="card-text">
                      <span className="text-primary">Item price:</span> $
                      {product.price}
                    </h4>
                    <h5 className="card-text font-weight-light">
                      People already bought{" "}
                      <span className="text-primary">{product.itemssold}</span>{" "}
                      items
                    </h5>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    {!isAdmin && (
                      <div className="card-body">
                        <Link href="">
                          <button
                            className="btn btn-outline-danger"
                            onClick={(e) => addToWishList(e)}
                          >
                            <FaRegHeart
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Add to WishList"
                              size={25}
                            />
                          </button>
                        </Link>
                        <Link href="">
                          <button
                            className="btn btn-primary mx-3"
                            onClick={(e) => addToCart(e)}
                          >
                            <FaCartPlus
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Add to Cart"
                              size={25}
                            />
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params.productId);
  const response = await fetch(
    `http://localhost:3000/api/getProduct?id=${params.productId}`
  );
  const data = await response.json();
  return {
    props: {
      product: data,
    },
  };
}

export default productdetails;
