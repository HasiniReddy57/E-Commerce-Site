import React from "react";
import styles from "../../../styles/Home.module.css";
import MenuItem from "./SubMenus/MenuItem";

function SortMenu() {
  return (
    <div className={`text-center ${styles.menu_item}`}>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-column flex-fill ">
          <span className="input-group-text bg-secondary text-light">
            Order
          </span>
          <div className="list-group list-group-flush fs-7">
            <MenuItem item="A-Z" key="A-Z" type="sort" />
            <MenuItem item="Z-A" key="Z-A" type="sort" />
          </div>
        </div>
        <div className="d-flex flex-column flex-fill ">
          <span className="input-group-text bg-secondary text-light">
            Price
          </span>
          <div className="list-group list-group-flush fs-7">
            <MenuItem item="High to Low" key="High to Low" type="sort" />
            <MenuItem item="Low to High" key="Low to High" type="sort" />
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default SortMenu;
