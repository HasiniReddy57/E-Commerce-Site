import { useRef, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/signup.module.css";
import Link from "next/link";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import NavBar from "@/components/navbar";

const Signin = ({ providers }) => {
  const [cookie, setCookie] = useCookies(["user"]);
  const [iserr, setiserr] = useState("");
  const email = useRef("");
  const password = useRef("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setiserr("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current,
        password: password.current,
      }),
    });

    const data = await res.json();

    if (data.message === "Invalid credentials!") {
      setiserr(`Invalid credentials`);
      email_input.value = "";
      pass_input.value = "";
    } else {
      const user = jwt.decode(data.token);
      setCookie("user", data.token, {
        path: "/",
        maxAge: 36000,
        sameSite: true,
      });
      const resp = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      );
      const userResp = await resp.json();
      if (userResp.role === 1) {
        router.push("/admin");
      } else router.push("/");
    }
  };

  return (
    <div>
      <NavBar />
      <div className={`bg-light text-dark ${styles.home}`}>
        <div className="text-center">
          <h3 className="pt-3 allcon ms-5 ps-5">
            Sign In and continue shopping
          </h3>
        </div>
        <hr />
        <div className="d-flex  flex-md-row flex-column ">
          <img
            className={styles.img_display}
            src="https://www.pngplay.com/wp-content/uploads/6/E-Commerce-Logo-Background-PNG-Image.png"

            // src="https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049__480.png"
          ></img>
          <form className={styles.form_display}>
            <div>
              <div className="col-md-12 ps-4">
                <label htmlFor="inputEmail4" className="form-label">
                  Email
                </label>
                <input
                  className="form-control mb-3"
                  type="text"
                  id="email_input"
                  onChange={(e) => (email.current = e.target.value)}
                  placeholder="Johndoe@gmail.com"
                />
              </div>

              <div className="col-md-12 ps-4">
                <label htmlFor="inputPassword4" className="form-label">
                  Password
                </label>
                <input
                  className="form-control mb-3"
                  type="password"
                  id="pass_input"
                  placeholder="********"
                  onChange={(e) => (password.current = e.target.value)}
                />{" "}
              </div>
              <div
                className={`text-danger  ps-1 ms-3 ${iserr != "" ? "p-3" : ""}`}
              >
                {iserr}
              </div>

              <button
                type="button"
                className="btn btn-primary ms-4"
                onClick={handleSubmit}
              >
                Log in
              </button>
              <p className="ps-4 mt-3">
                New user?
                <Link className=" text-primary ms-2 mb-1" href="/signup">
                  SignUp
                </Link>
              </p>

              <p className="ps-4 mt-3">
                Forgot Password?
                <Link className=" text-primary ms-2 mb-1" href="/signin">
                  Click here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
