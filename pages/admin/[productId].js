import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import AdminNavBar from "../../components/adminnavbar.js";
import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import DeleteModal from "@/components/DeleteModal";
import SigninPrompt from "@/components/SigninPrompt";

function AdminProducts({ product }) {
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    datafetch();
  }, []);

  const router = useRouter();

  async function deleteHandler() {
    const res = await fetch(`http://localhost:3000/api/deleteProduct?productId=${product.id}`, {
      method: "DELETE",
    });
    router.push(`http://localhost:3000/admin`);
  }

  function updateHandler() {
    router.push(`/admin/update/${product.id}`);
  }

  return (
    <>
      {isAdmin ? (
        <div
          className={`card ${styles.menu_item} bg-light border border-light`}
        >
          <AdminNavBar />
          <div
            className={`card-body d-flex justify-content-center ${styles.menu_item} border-0`}
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <div className="d-flex row justify-content-md-center">
              <div className="col-lg-4 col-sm-12 my-5">
                <img
                  src={product.image}
                  className="card-img-top m-5 "
                  alt="product"
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
                        <span className="text-primary">
                          {product.itemssold}
                        </span>{" "}
                        items
                      </h5>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <div className="card-body ">
                        <button
                          type="button"
                          className="btn btn-primary mx-2"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Update Product details"
                          onClick={() => updateHandler()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fill-rule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary mx-2"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Delete Product"
                          onClick={() => setShowModal(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash3-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                          </svg>
                        </button>
                        <DeleteModal
                          show={showModal}
                          onClose={() => setShowModal(false)}
                          onHome={() => router.push("/admin")}
                          onDelete={() => deleteHandler()}
                        >
                          Deleted products can't be retrieved
                        </DeleteModal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SigninPrompt />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const response = await fetch(`http://localhost:3000/api/getProduct?id=${params.productId}`);
  const product = await response.json();
  return {
    props: {
      product,
    },
  };
}

export default AdminProducts;
