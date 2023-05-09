import { useRouter } from "next/router";
import Modal from "@/components/modal";
import styles from "@/styles/Home.module.css";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import SigninPrompt from "@/components/SigninPrompt";
import AdminNavBar from "@/components/adminnavbar";

function details({ proddets }) {
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

  const router = useRouter();
  const [data, setData] = useState({
    id: proddets.id,
    title: proddets.title,
    category: proddets.category,
    image: proddets.image,
    price: proddets.price,
    quantity: proddets.quantity,
    description: proddets.description,
    itemssold: proddets.itemssold,
  });
  const obj = {
    id: proddets.id,
    title: proddets.title,
    category: proddets.category,
    image: proddets.image,
    price: proddets.price,
    quantity: proddets.quantity,
    description: proddets.description,
    itemssold: proddets.itemssold,
  };
  const [showModal, setShowModal] = useState(false);
  async function updateHandler() {
    if (JSON.stringify(data) === JSON.stringify(obj)) {
      alert("No field updated");
    } else {
      const resp = await fetch(
        `http://localhost:3000/api/updateProduct?id=${proddets.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowModal(true);
    }
  }
  return (
    <>
      {isAdmin ? (
        <div className={`text-bg-light ${styles.menu_item} min-vh-100`}>
          <AdminNavBar />
          <section className="min-vh-100 text-bg-light">
            <div className="container pt-3">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-auto">
                  <h4 style={{ marginLeft: "30px" }}>
                    Update your product details
                  </h4>
                  <div className="input-group" style={{ margin: "30px" }}>
                    <span className="input-group-text"> Id</span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      placeholder={data.id}
                      style={{ w: "10px" }}
                    />
                  </div>
                  <div className="input-group" style={{ margin: "30px" }}>
                    <span className="input-group-text">Title</span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      placeholder={data.title}
                      onChange={(e) =>
                        setData({ ...data, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="input-group" style={{ margin: "30px" }}>
                    <span className="input-group-text"> Category</span>
                    <select
                      className="form-select text-muted"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                    >
                      <option selected>{data.category}</option>
                      <option value="electronics">electronics</option>
                      <option value="men's clothing">men's clothing</option>
                      <option value="jewellery">jewellery</option>
                      <option value="women's clothing">women's clothing</option>
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
                      placeholder={data.image}
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
                      placeholder={data.price}
                      onChange={(e) =>
                        setData({ ...data, price: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="input-group" style={{ margin: "30px" }}>
                    <span className="input-group-text"> Quantity</span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      placeholder={data.quantity}
                      onChange={(e) =>
                        setData({ ...data, quantity: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="input-group" style={{ marginLeft: "30px" }}>
                    <span className="input-group-text">Description</span>
                    <textarea
                      className="form-control"
                      aria-label="With textarea"
                      placeholder={data.description}
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
                          onClick={() => updateHandler()}
                        >
                          Submit
                        </button>
                        &emsp;
                        <button
                          type="button"
                          className="btn btn-secondary"
                          style={{ marginTop: "15px" }}
                          onClick={() => router.push(`/admin/${proddets.id}`)}
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
                    Successfully Updated
                  </Modal>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <SigninPrompt />
      )}
    </>
  );
}
export default details;
export async function getServerSideProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:3000/api/getProduct?id=${params.productId}`
  );
  const data = await response.json();
  return {
    props: {
      proddets: data,
    },
  };
}
