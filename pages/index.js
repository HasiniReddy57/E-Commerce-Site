import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import CardContainer from "@/components/Home/Card/CardContainer";
import SideMenu from "@/components/Home/SideMenu/SideMenu";
import { createContext } from "react";
import NavBar from "@/components/navbar";

export const HomeContext = createContext();
function UserHomePage(props) {
  const categories = props.data
    ?.map((product) => product.category)
    .filter((category, index, self) => index === self.indexOf(category));

  let catObj = Object.fromEntries(categories.map((ele) => [ele, false]));

  const [filters, setFilters] = useState(catObj);
  const [sortType, setSortType] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [reloadnav, setReloadnav] = useState(false);
  const contextData = {
    filters,
    setFilters,
    sortType,
    setSortType,
    searchInput,
    setSearchInput,
  };

  useEffect(() => {}, [reloadnav]);

  return (
    <HomeContext.Provider value={contextData}>
      <NavBar reload={reloadnav} />
      <div className={`${styles.Home} text-dark bg-light`}>
        <div className="col-sm-2 text-light p-3">
          <SideMenu categories={categories} />
        </div>

        <div className={`${styles.Separator} col-sm-offset-3`} />
        <div className="col-sm p-0 ">
          <CardContainer products={props.data} setReloadnav={setReloadnav} />
        </div>
      </div>
    </HomeContext.Provider>
  );
}

export const getServerSideProps = async () => {
  let data;

  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((res) => (data = res));
  return {
    props: { data },
  };
};

export default UserHomePage;
