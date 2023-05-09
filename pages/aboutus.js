import NavBar from "@/components/navbar";

import Link from "next/link";
import styles from "../styles/Home.module.css";
function index() {
  return (
    <div className={styles.menu_item}>
      <NavBar />
      <div className={`text-bg-light ${styles.menu_item}`}>
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4">
                <b>
                  Our Storey
                </b>
              </h1>
              <b className="lead text-dark  mb-0">
                <b>
                  <i>Storey</i> is the leading platform for global wholesale
                  trade among AT&T interns'23. We serve millions of buyers and
                  suppliers around the world.
                </b>
              </b>
              <p className="lead ">
                <Link href="/">
                  <br />
                  <button className="text-bg-primary p-2 rounded-3">
                    Go.Shop.Storey
                  </button>
                </Link>
              </p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/illus.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src="https://androtunes.com/wp-content/uploads/2021/01/617-6175517_shop-smart-e-commerce-illustration-png-transparent-png.png"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
            <div className="col-lg-6">
              <i className="fa fa-leaf fa-2x  text-primary"></i>
              <h1 className="display-4">
                <b>
                  Our Mission
                </b>
              </h1>
              <p className="font-italic  mb-4">
                Storey takes care of everything from marketing and payments to
                secure transactions and shipping. A safe, secure and efficient
                platform trusted by millions of users worldwide.
              </p>
              
            </div>
          </div>
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <i className="fa fa-bar-chart fa-2x  text-primary"></i>
              <h1 className="display-4">
                <b>
                  Our Achievements
                </b>
              </h1>
              <p className="font-italic  mb-4 ">
                Storey has a registered customer base of more than 2 million,
                offering over 10 million products across 20+ categories. We, at{" "}
                <i>Storey</i> provide customer-centric innovations that make
                online shopping more accessible and inexpensive.
              </p>
              
            </div>
            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img
                src="https://miro.medium.com/max/540/1*eq2Go5f1MMKLXsIz0TjfcQ.png"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="text-bg-light">
        <div className="container align-items-center justify-content-md-center py-5 mx-auto">
          <div className="row mb-4">
            <div className="col">
            <h1 className="display-4">
                <b>
                  Our Team
                </b>
              </h1>
              <p className="font-italic ">
                We are the makers of <em>Storey</em>, empowering millions of
                users shop online.
              </p>
            </div>
          </div>
          <div className="container mx-2">
            <div className="d-flex row text-center ">
              <div className="col-xl-2 col-lg-6 col-md-6 col-xs-12 m-3 p-3">
                <div className="bg-white rounded shadow-sm py-3 px-5">
                  <span className="small text-muted">
                    <img
                      src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png"
                      alt=""
                      width="100"
                      className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                    />
                    Vijay
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-6 col-md-6 col-xs-12 m-3 p-3">
                <div className="bg-white rounded shadow-sm py-3 px-5">
                  <span className="small text-muted">
                    <img
                      src="https://ozonotherapiemaroc.ma/uploads/testimonial-3.png"
                      alt=""
                      width="100"
                      className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                    />
                    Hasini
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-6 col-md-6 col-xs-12 m-3 p-3">
                <div className="bg-white rounded shadow-sm py-3 px-5">
                  <span className="small text-muted">
                    <img
                      src="https://bootstrapious.com/i/snippets/sn-about/avatar-2.png"
                      alt=""
                      width="100"
                      className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                    />
                    Krishna
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-6 col-md-6 col-xs-12 m-3 p-3">
                <div className="bg-white rounded shadow-sm py-3 px-5">
                  <span className="small text-muted">
                    <img
                      src="https://bootstrapious.com/i/snippets/sn-about/avatar-1.png"
                      alt=""
                      width="100"
                      className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                    />
                    Uday
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-2 col-lg-6 col-md-6 col-xs-12 m-3 p-3">
                <div className="bg-white rounded shadow-sm py-3 px-5">
                  <span className="small text-muted">
                    <img
                      src="https://bootstrapious.com/i/snippets/sn-about/avatar-4.png"
                      alt=""
                      width="100"
                      className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                    />
                    Keerthana
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
