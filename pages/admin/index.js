import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import AdminNavBar from "../../components/adminnavbar.js";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import SigninPrompt from "@/components/SigninPrompt";
import Pagination from "@/components/Pagination/Pagination";

function admin({ products }) {
  const [items, setItems] = useState(products);
  const [revenue, setRevenue] = useState(0);
  const router = useRouter();
  const searchInput = useRef("");
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  const user_decoded = jwt.decode(cookie.user);
  const [user, setUser] = useState(user_decoded);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = items.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    async function datafetch() {
      if (user) {
        const data = await fetch(
          `http://localhost:3000/api/getUser/?email=${user.email}`
        ).then((res) => res.json());

        if (data.role === 1) {
          setIsAdmin(true);
        }
      }
    }
    datafetch();
  }, []);

  useEffect(() => {
    var newrevenue = 0;
    products.map((product) => {
      newrevenue = newrevenue + product.itemssold * product.price;
    });
    setRevenue(newrevenue);
  }, [products.itemssold, products.price]);

  return (
    <div className={styles.admin_home}>
      {isAdmin ? (
        <div className={` ${styles.menu_item}`}>
          <AdminNavBar />

          <form className="d-flex  justify-content-center p-1">
            <input
              className="form-control w-25 m-3 border-1 border-dark"
              type="search"
              placeholder="Search Products"
              aria-label="Search"
              ref={searchInput}
              onChange={(e) => {
                setItems(
                  products.filter((product) =>
                    product.title
                      .toLowerCase()
                      .includes(
                        searchInput.current.value.length > 2
                          ? searchInput.current.value.toLowerCase()
                          : ""
                      )
                  )
                );
              }}
            />
          </form>

          <div className="d-flex flex-wrap text-dark gap-2 m-4 justify-content-center">
            {currentProducts?.map((product) => {
              return (
                <div
                  className={`${styles.CardItem} bg-white border-dark p-1 m-2`}
                  key={product.id}
                >
                  <div
                    className="card-body justify-content-center align-items-center"
                    onClick={() => router.push(`/admin/${product.id}`)}
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title={product.title}
                  >
                    {product.quantity > 10 ? (
                      <div className={`bg-primary ${styles.CardPriceTag} `}>
                        Qty:&nbsp;{product.quantity}
                      </div>
                    ) : (
                      <div className={`bg-warning ${styles.CardPriceTag} `}>
                        Qty:&nbsp;{product.quantity}
                      </div>
                    )}
                    <img
                      src={product.image}
                      className="card-img-top border-dark justify-content-auto-center align-items-center ms-4 mb-4"
                      alt="product"
                      style={{ width: "150px", height: "150px" }}
                    />
                    <div className="card-title text-weight-bold text-center">
                      {product.title.length > 20
                        ? `${product.title.substring(0, 20)}...`
                        : product.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Pagination
            onPageChange={paginate}
            totalCount={items.length}
            currentPage={currentPage}
            pageSize={productsPerPage}
          />
        </div>
      ) : (
        <SigninPrompt />
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:3000/api/products`);
  const data = await response.json();
  return {
    props: {
      products: data,
    },
  };
}

export default admin;
