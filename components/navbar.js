import Link from "next/link";
import styles from "../styles/Home.module.css";
import useCookies from "react-cookie/cjs/useCookies";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

function NavBar({ reload }) {
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const [name, setName] = useState(false);
  const router = useRouter();
  const [ccount, setCcount] = useState(0);
  const [wcount, setWcount] = useState(0);

  const [isAdmin, setIsAdmin] = useState(false);
  
  async function datafetch() {
    if (user) {
      const data = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      ).then((res) => res.json());

      if (data.role === 1) {
        setIsAdmin(true);
      }
      setName(data.user);
      if (data.cart && data.wishlist) {
        setCcount(data.cart.length);
        setWcount(data.wishlist.length);
      }
    }
  }

  useEffect(() => {
    datafetch();
  }, [reload]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg text-light bg-primary sticky-top  ${styles.menu_item}`}
      >
        <div className="container-fluid">
          <button
            type="button"
            className="btn btn-primary nav-item btn mb-2"
            data-bs-toggle="tooltip"
            title="Back"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg>
          </button>
          <Link
            className="navbar-brand text-l ps-2 text-light"
            href="/"
            data-bs-toggle="tooltip"
            title="Home"
          >
            <h3>
              <b>Storey</b>
            </h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {!user && router.pathname !== "/signin" && (
                <li
                  className="nav-item bg-primary text-light btn"
                  onClick={() => {
                    router.push("/signin");
                  }}
                >
                  Sign in
                </li>
              )}
              {!isAdmin && router.pathname !== "/aboutus" && (
                <li
                  className="nav-item text-light btn"
                  onClick={() => {
                    router.push("/aboutus");
                  }}
                >
                  About Us
                </li>
              )}
              {user && !isAdmin && router.pathname !== "/cart" && (
                <li
                  className="nav-item text-light btn"
                  data-bs-toggle="tooltip"
                  title="Cart"
                  onClick={() => {
                    router.push("/cart");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="white"
                    className="bi bi-cart"
                    viewBox="0 0 20 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                  <sup className="text-light"> {ccount}</sup>
                </li>
              )}
              {user && !isAdmin && router.pathname !== "/wishlist" && (
                <li
                  className="btn text-light"
                  data-bs-toggle="tooltip"
                  title="Wishlist"
                  onClick={() => {
                    router.push("/wishlist");
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="white"
                    className="bi bi-heart"
                    viewBox="0 0 20 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                  <sup>{wcount}</sup>
                </li>
              )}
              {user && !isAdmin && (
                <li
                  className="nav-item btn text-light"
                  data-bs-toggle="tooltip"
                  title="My Profile"
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="16"
                    fill="white"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                    />
                  </svg>
                  {user && name && <small>{name}</small>}
                </li>
              )}

              {isAdmin && (
                <li
                  className="nav-item btn text-light"
                  data-bs-toggle="tooltip"
                  title="Admin Dashboard"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  Dashboard
                </li>
              )}
              {user && (
                <li
                  className="nav-item btn"
                  data-bs-toggle="tooltip"
                  title="Sign out"
                  onClick={() => {
                    deleteCookie("user");
                    router.push("/signout");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="20"
                    fill="white"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
export default dynamic(() => Promise.resolve(NavBar), { ssr: false });
