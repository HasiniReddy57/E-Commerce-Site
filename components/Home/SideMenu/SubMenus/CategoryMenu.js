import React from "react";
import MenuItem from "./MenuItem";
import styles from "../../../../styles/Home.module.css";
function CategoryMenu({ categories }) {
  return (
    <div
      className={`d-flex align-items-center flex-column ${styles.menu_item}`}
    >
      <hr />
      <span className="p-2 mb-1 rounded-3 bg-secondary w-100 fs-5 text-light ">
        Categories &nbsp;
      </span>

      <div className="input-group d-flex flex-column fs-7 border-bottom p-2">
        {categories.map((item, index) => {
          return <MenuItem item={item} key={index} type="category" />;
        })}
      </div>
    </div>
  );
}

export default CategoryMenu;
