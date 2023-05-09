import styles from "../styles/Home.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/router";

export default function WishListCard({ props, user, setReload }) {
  const router = useRouter();

  const atcart = async (operation) => {
    if (operation == "delete") {
      fetch(`http://localhost:3000/api/userData/${user.email}`, {
        method: "PATCH",

        body: JSON.stringify({
          wishlist: user.wishlist.filter((prod) => prod.id != props.id),
        }),
      }).then((res) => {
        setReload((old) => !old);
      });
    } else {
      const unique_cart = user.cart.findIndex(
        (product) => product.id === props.id
      );

      if (unique_cart === -1) {
        fetch(`http://localhost:3000/api/userData/${user.email}`, {
          method: "PATCH",

          body: JSON.stringify({
            wishlist: user.wishlist.filter((prod) => prod.id != props.id),
            cart: [...user.cart, { ...props, quantity: 1 }],
          }),
        }).then((res) => {
          setReload((old) => !old);
        });
      } else {
        fetch(`http://localhost:3000/api/userData/${user.email}`, {
          method: "PATCH",

          body: JSON.stringify({
            wishlist: user.wishlist.filter((prod) => prod.id != props.id),
          }),
        }).then((res) => {
          setReload((old) => !old);
        });
      }
    }
  };

  return (
    <>
      <div className={`${styles.CardItem}  border border-2`}>
        <div className={`bg-primary ${styles.CardPriceTag}`}>
          $.{props.price}
        </div>
        <div className="align-self-center p-2">
          <img
            src={props.image}
            className={`card-img-top ${styles.hoverCursor}`}
            alt={props.title}
            width="120px"
            height="120px"
            onClick={() => router.push(`product/${props.id}`)}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between ">
          <h5 className="card-title pb-2 align-self-center">
            <b data-toggle="tooltip" title={props.title}>
              {props.title.length > 16
                ? props.title.substring(0, 16) + "..."
                : props.title}
            </b>
          </h5>

          <div className="d-flex justify-content-between ">
            <a
              href="#"
              className={`btn border-danger `}
              data-toggle="tooltip"
              title="Delete"
              onClick={() => {
                atcart("delete");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </a>
            <button
              type="button"
              className="btn btn-primary ms-2"
              data-toggle="tooltip"
              title="Add to cart"
              onClick={() => {
                atcart("add");
              }}
            >
              <FaCartPlus
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add to Cart"
                size={25}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
