import styles from "../styles/signup.module.css";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import NavBar from "@/components/navbar";
import cuid from "cuid";

function signUp() {
  const email = useRef("");
  const [cookie, setCookie] = useCookies(["user"]);
  const password = useRef("");
  const router = useRouter();
  const [iserr, setiserr] = useState("noerror");
  const username = useRef("");

  const addUser = async (e) => {
    e.preventDefault();
    if (
      email.current.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") === null ||
      password.current.match(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      ) === null ||
      !(username.current.length > 2)
    ) {
      if (
        password.current.match(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})$"
        ) === null
      )
        setiserr("pass");
      if (email.current.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") === null)
        setiserr("email");

      if (!(username.current.length > 2)) {
        setiserr("user");
      }

      email_input.value = "";
      user_input.value = "";
      password_input.value = "";
    }

    if (
      email.current.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$") &&
      password.current.match(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
      ) &&
      username.current.length > 2
    ) {
      let id = new Date()
      id= id.toUTCString();
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current,
        }),
      });
      const token_data = await resp.json();

      setCookie("user", token_data.token, {
        path: "/",
        maxAge: 36000,
        sameSite: true,
      });

      const res = await fetch("http://localhost:3000/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          id: id,
          user: username.current,
          email: email.current,
          password: password.current,
          role: 0,
          cart: [],
          wishlist: [],
        }),
      });
      const data = await res.json();
      router.push("/");
    }
  };

  return (
    <>
      <NavBar />
      <div className={`container-fluid bg-light text-dark ${styles.allcon} `}>
        <div className="text-center">
          <h3 className="pt-3 ps-5 allcon">Sign up for better experience</h3>
        </div>
        <hr />
        <br />
        <div className="d-flex flex-sm-row flex-column ">
          <img
            className={styles.img_display}
            src="https://www.pngplay.com/wp-content/uploads/6/E-Commerce-Shopping-PNG-Clipart-Background.png"
          ></img>
          <div
            className={`d-flex flex-column ${styles.form_display} flex-grow`}
          >
            <form className="row-1 g-3  align-items-center">
              <div className="col">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  id="user_input"
                  className="form-control"
                  placeholder="John Doe"
                  onChange={(e) => (username.current = e.target.value)}
                />
              </div>
              <br />
              <div className="col">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email_input"
                  placeholder="johndoe@gmail.com"
                  onChange={(e) => (email.current = e.target.value)}
                />
              </div>
              <br />

              <div className="col">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password_input"
                  placeholder="********"
                  onChange={(e) => (password.current = e.target.value)}
                />
              </div>
              <div
                className={`text-info ps-1  ms-2  ${
                  iserr != "" ? "p-3 col-md-6" : ""
                }`}
              >
                {iserr === "user" && (
                  <p>Username should be atleast 3 characters</p>
                )}
                {iserr === "email" && <p>email address should be valid</p>}

                {iserr === "pass" && (
                  <p>
                    password should be atleast 8 characters with a special
                    symbol and a capital letter
                  </p>
                )}
              </div>
              <div>
                <div className="text-center float-start">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={addUser}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default signUp;
