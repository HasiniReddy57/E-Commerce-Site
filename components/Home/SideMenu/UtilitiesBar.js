import { HomeContext } from "@/pages";
import React, { useContext, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "../../../styles/Home.module.css";

function UtilitiesBar() {
  const { setSearchInput } = useContext(HomeContext);
  const findInput = useRef();

  return (
    <div className={`d-flex justify-content-center ${styles.menu_item}`}>
      <hr />
      <div
        className={`${styles.menu_item_button} bg-secondary text-light text-center p-2 px-3 fs-5`}
      >
        <FaSearch />
      </div>
      <input
        type="text"
        id="searchBar"
        className="form-control rounded-0 rounded-end p-1"
        placeholder="Product Name"
        ref={findInput}
        onChange={() => {
          setSearchInput(findInput.current.value);
        }}
      />
      <hr />
    </div>
  );
}

export default UtilitiesBar;
