import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function SigninPrompt() {
  return (
    <>
      <div
        className={`container-fluid text-bg-light d-flex  flex-column align-items-center p-5 ${styles.menu_item}`}
      >
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/web-login-security-2763631-2302825.png"
          height="400px"
          width="400px"
        ></img>
        <h4 className="p-3">Please signin to continue</h4>
        <Link href="/signin">
          <button className="btn-primary rounded-4 p-3">Sign in</button>
        </Link>
      </div>
    </>
  );
}
