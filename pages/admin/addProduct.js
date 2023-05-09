import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import cuid from "cuid";
import Modal from "@/components/modal";
import styles from "../../styles/Home.module.css";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import SigninPrompt from "@/components/SigninPrompt";
import AdminNavBar from "@/components/adminnavbar";
function details() {
  const router = useRouter();
  var newId = new Date();
  newId = newId.toUTCString()
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const formdata = useRef();
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
  }, []);

  async function addHandler(data) {
    if (
      !data.title ||
      !data.price ||
      !data.description ||
      !data.category ||
      !data.quantity ||
      !data.image
    ) {
      alert("Please enter all the fields");
    } else {
      formdata.current = {  id: newId,...data, itemssold: 0 };

      setData(formdata.current);
      await fetch("http://localhost:3000/api/addProduct", {
        method: "POST",
        body: JSON.stringify(formdata.current),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowModal(true);
    }
  }

  return (
    <>
      {isAdmin ? (
        <section className={`text-bg-light ${styles.menu_item} min-vh-100`}>
          <AdminNavBar />
          <div className="container py-5 min-vh-100">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-auto">
                <h4 style={{ marginLeft: "30px" }}>Add product details</h4>
                <div className="input-group" style={{ margin: "30px" }}>
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                  />
                </div>
                <div className="input-group" style={{ margin: "30px" }}>
                  <span className="input-group-text">Category</span>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  >
                    <option selected>Select</option>
                    <option value="electronics">Electronics</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="women's clothing">Women's Clothing</option>
                  </select>
                </div>
                <div className="input-group mb-3" style={{ margin: "30px" }}>
                  <span className="input-group-text" id="basic-addon3">
                    <label for="basic-url" className="form-label">
                      Image
                    </label>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    onChange={(e) =>
                      setData({ ...data, image: e.target.value })
                    }
                  />
                </div>
                <div className="input-group mb-3" style={{ margin: "30px" }}>
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Amount (to the nearest dollar)"
                    onChange={(e) =>
                      setData({ ...data, price: Number(e.target.value) })
                    }
                  />
                  {/* <span className="input-group-text">.00</span> */}
                </div>
                <div className="input-group" style={{ margin: "30px" }}>
                  <span className="input-group-text">Quantity</span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) =>
                      setData({ ...data, quantity: Number(e.target.value) })
                    }
                  />
                </div>
                <div className="input-group" style={{ margin: "30px" }}>
                  <span className="input-group-text">Description</span>
                  <textarea
                    className="form-control"
                    aria-label="With textarea"
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                  ></textarea>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col text-center">
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginTop: "15px" }}
                        onClick={() => addHandler(data)}
                      >
                        Submit
                      </button>
                      &emsp;
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ marginTop: "15px" }}
                        onClick={() => router.push("/admin")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                <Modal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  onHome={() => router.push("/admin")}
                >
                  Successfully Added
                </Modal>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <SigninPrompt />
      )}
    </>
  );
}

export default details;
