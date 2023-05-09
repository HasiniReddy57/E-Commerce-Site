import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.css";

export default function DeleteModal({
  show,
  onClose,
  onHome,
  onDelete,
  children,
}) {

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  const handleClose = () => {
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <button type="button" class="btn btn-outline-danger">
              x
            </button>
          </a>
        </div>
        <div
          style={{ margin: "20px" }}
          className="d-flex justify-content-center"
        >
          <div className="text-success ">{children}</div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button "
            className="btn btn-primary d-flex "
            onClick={() => onHome()}
          >
            Home
          </button>
          &emsp;
          <button
            type="button "
            className="btn btn-secondary d-flex "
            onClick={() => onDelete()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
