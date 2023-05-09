import NavBar from "@/components/navbar";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function signout() {
  return (
    <div className={styles.menu_item}>
      <NavBar />
      <div className="container-fluid text-bg-light d-flex  flex-column align-items-center p-5">
        <img
          src="https://www.pngmart.com/files/11/E-Commerce-Transparent-Images-PNG.png"
          height="400px"
          width="400px"
        ></img>
        <p className="mt-3">Thank you, Visit again</p>
        <Link className="btn btn-primary pt-2 mt-2" href="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
