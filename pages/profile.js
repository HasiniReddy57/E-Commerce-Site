import SigninPrompt from "@/components/SigninPrompt";
import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import NavBar from "@/components/navbar";

export default function Profile() {
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const userData = useRef();

  useEffect(() => {
    async function datafetch() {
      const data = await fetch(
        `http://localhost:3000/api/getUser?email=${user.email}`
      ).then((res) => res.json());
      console.log(data);

      userData.current = data;
    }

    if (user) {
      datafetch();
      console.log(userData);
    }
  }, []);

  const [PasswordChange, setPwdChange] = useState(false);
  const newPword = useRef("");
  const confPword = useRef("");

  const validate = async (e) => {
    if (newPword.current === confPword.current) {
      if (
        newPword.current.match(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
        ) == null
      ) {
        console.log(JSON.stringify(newPword));
        document.getElementById("invPword").innerHTML =
          "Password should follow the given rules";
        return;
      }

      const data = await fetch(
        `http://localhost:3000/api/updatePassword?id=${userData.current.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            password: newPword.current,
          }),
        }
      );

      if (data) {
        console.log(await data.json());
        document.getElementById("invPword").innerHTML =
          "Password changed succesfully";
      }
    } else {
      document.getElementById("invPword").innerHTML = "Passwords do not match";
      return;
    }
  };
  return (
    <div>
      <NavBar />
      {user ? (
        <div className={`container-fluid text-bg-light ${styles.menu_item}`}>
          <div className="d-flex flex-sm-row flex-column justify-content-around">
            <div className=" d-flex flex-column align-items-center m-5">
              <img src="https://www.fema.gov/sites/default/files/photos/featured_default_male.png"></img>

              <div>
                <h6 className="pb-4 align-self-center">
                  Email : <span className="text-primary">{user.email}</span>
                </h6>
              </div>
              <div className="d-flex-inline align-self-center ">
                {PasswordChange ? null : (
                  <button
                    type="button"
                    className="btn p-3 text-bg-primary rounded-4 me-1"
                    onClick={() => setPwdChange((old) => !old)}
                  >
                    Change Password{" "}
                  </button>
                )}
              </div>
            </div>

            {PasswordChange ? (
              <div className="d-flex flex-sm-row flex-column mt-sm-5 mb-sm-5  border border-info rounded-4">
                <div className=" d-flex flex-column align-items-center m-5   ">
                  <form noValidate>
                    <label for="newPword" className="form-label">
                      New Password
                    </label>

                    <input
                      type="password"
                      className="form-control mt-1 mb-4"
                      id="newPword"
                      onChange={(e) => {
                        newPword.current = e.target.value;
                      }}
                    />

                    <label className="form-label" for="confPword">
                      Confirm your Password
                    </label>

                    <input
                      type="password"
                      className="form-control mt-1 mb-3"
                      id="confPword"
                      onChange={(e) => {
                        confPword.current = e.target.value;
                      }}
                    />
                    <h6 className="text-info p-2 " id="invPword"></h6>

                    <button
                      type="button"
                      className="btn btn-primary p-2 me-3"
                      onClick={validate}
                    >
                      Submit
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary p-2"
                      onClick={() => setPwdChange(false)}
                    >
                      cancel
                    </button>
                  </form>{" "}
                </div>
                <dl className="mt-4 p-4   ">
                  <dd>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="blue"
                      class="bi bi-info-circle-fill"
                      viewBox="0 0 16 16"
                      className="me-2"
                    >
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                    </svg>
                    Password should contain
                  </dd>
                  <li> atleast 8 characters</li>
                  <li>an uppercase letter</li>
                  <li>a lowercase letter</li>
                  <li>a special character </li>
                  <li>a digit</li>
                </dl>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <SigninPrompt />
      )}
    </div>
  );
}
