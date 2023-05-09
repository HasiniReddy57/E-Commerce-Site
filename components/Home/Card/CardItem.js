import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import { FaRegHeart, FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";

function CardItem({ prod, type, setReloadnav }) {
  const router = useRouter();
  const [textLength, setTextLength] = useState(60);
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const [isAdmin, setIsAdmin] = useState(false);

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
  }, [user]);

  const addToWishList = async (e) => {
    e.preventDefault();
    if (!user?.email) router.push("/signin");
    else {
      const resp = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      );
      const userResp = await resp.json();

      const unique_wishlist = userResp.wishlist.findIndex(
        (product) => product.id === prod.id
      );
      if (unique_wishlist == -1) {
        fetch(`http://localhost:3000/api/updateWishlist?id=${userResp.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wishlist: [...userResp.wishlist, prod] }),
        }).then((res) => res.json());
      }
      setReloadnav((old) => !old);
    }
    e.target.disabled = true;
  };

  const addToCart = async (e) => {
    e.preventDefault();

    if (!user?.email) router.push("/signin");
    else {
      const resp = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      );
      const userResp = await resp.json();

      const unique_cart = userResp.cart.findIndex(
        (product) => product.id === prod.id
      );

      if (unique_cart == -1) {
        fetch(`http://localhost:3000/api/updateCart?id=${userResp.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: [...userResp.cart, { ...prod, quantity: 1 }],
          }),
        }).then((res) => res.json());
      }
      setReloadnav((old) => !old);
      e.target.disabled = true;
    }
  };

  return (
    <div
      className={`${styles.CardItem} ${
        type === "display" ? "" : styles.OtherCard
      }`}
    >
      <div className={`bg-primary ${styles.CardPriceTag}`}>${prod.price}</div>
      <div className={styles.ImageContent}>
        <img
          src={prod.image}
          className={`card-img-top ${styles.hoverCursor}`}
          alt={prod.title}
          onClick={() => router.push(`product/${prod.id}`)}
        />
      </div>
      <div className="card-body d-flex flex-column justify-content-between">
        <div onClick={() => router.push(`product/${prod.id}`)}>
          <h5 className="card-title" data-toggle="tooltip" title={prod.title}>
            <b>
              {prod.title.length > 27
                ? `${prod.title.substring(0, 27)}...`
                : prod.title}
            </b>
          </h5>
          <p className="card-text">
            {prod.description.length > textLength
              ? `${prod.description.substring(0, textLength)}...`
              : prod.description}
          </p>
        </div>
        <div className="d-flex justify-content-between mt-4">
          {type === "display" && !isAdmin ? (
            <>
              <Link href="">
                <button
                  className="btn btn-primary "
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
                  className="btn btn-primary"
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
            </>
          ) : type === "cart" && !isAdmin ? (
            <>
              <h6 className="card-subtitle align-self-center me-4">
                Total Price : {prod.price}
              </h6>
              <button type="button" className="btn border">
                -
              </button>
              <button type="button" className="btn border">
                {prod.quantity}
              </button>
              <button type="button" className="btn border">
                +
              </button>
              <a href="#" className="btn btn-primary ms-5 ">
                Delete
              </a>
            </>
          ) : (
            !isAdmin && (
              <>
                <a href="#" className="btn btn-danger ">
                  Delete
                </a>
                <button type="button" className="btn btn-success ms-2">
                  Add to Cart
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default CardItem;
