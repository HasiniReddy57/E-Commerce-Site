import Link from "next/link";
import { useRouter } from "next/router";
import useCookies from "react-cookie/cjs/useCookies";
import styles from "../styles/Home.module.css";
export default function AdminNavBar() {
  const router = useRouter();
  const [cookie, setCookie, deleteCookie] = useCookies(["user"]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary sticky-top">
        <div className="container-fluid d-flex">
          <div className="navbar d-grid gap-2 d-flex justify-content-md-start ">
            <button
              type="button"
              className="btn btn-primary nav-item btn mb-2"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
              </svg>
            </button>
            <div>
              <h2>
                <Link
                  href="/"
                  className="text-light"
                  style={{ textDecoration: "none" }}
                >
                  Storey
                </Link>
              </h2>
            </div>
          </div>
          <div className="navbar d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              className="text-light ms-5 nav-item btn"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Add new product"
              onClick={() => router.push("/admin/addProduct")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                />
              </svg>{" "}
              Product
            </button>
            <button
              type="button"
              className=" nav-item btn text-light"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Statistics"
              onClick={() => router.push("/admin/stats")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-bar-chart-line-fill`}
                viewBox="0 0 16 16"
              >
                <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
              </svg>{" "}
              Statistics
            </button>

            <li
              className="nav-item btn text-light"
              data-toggle="tooltip"
              data-placement="bottom"
              title="sign out"
              onClick={() => {
                deleteCookie("user");
                router.push("/signout");
              }}
            >
              {" "}
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
              </svg>{" "}
            </li>
          </div>
        </div>
      </nav>
    </>
  );
}
