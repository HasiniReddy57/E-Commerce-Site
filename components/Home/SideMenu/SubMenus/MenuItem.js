import { HomeContext } from "@/pages";
import React, { useContext } from "react";
import styles from "../../../../styles/Home.module.css";

function MenuItem({ item, type }) {
  let { filters, setFilters, sortType, setSortType } = useContext(HomeContext);

  const updateFilters = () => {
    type === "category"
      ? setFilters({ ...filters, [item]: !filters[item] })
      : sortType !== item
      ? setSortType(item)
      : setSortType("");
  };

  return (
    <div className={styles.menu_item}>
      {type === "sort" ? (
        <button
          type="button"
          className={`list-group-item list-group-item-action ${
            filters[item] ? "active" : sortType === item ? "active" : ""
          }`}
          onClick={updateFilters}
        >
          {item}
        </button>
      ) : (
        <div className="input-group-text text-capitalize bg-transparent text-dark m-1 border-0">
          <input
            id={`C${item}`}
            type="checkbox"
            className={`form-check-input input-group-item-action p-2 m-1 ${
              filters[item] ? "active" : sortType === item ? "active" : ""
            }`}
            onClick={updateFilters}
          />
          <label className="ms-2" htmlFor={`C${item}`}>
            {item}
          </label>
        </div>
      )}
    </div>
  );
}

export default MenuItem;
