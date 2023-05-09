import React from "react";
import CategoryMenu from "./Submenus/CategoryMenu";
import SortMenu from "./SortMenu";
import UtilitiesBar from "./UtilitiesBar";

function SideMenu({ categories }) {
  return (
    <>
      <UtilitiesBar />
      <CategoryMenu categories={categories}/>
      <SortMenu />
    </>
  );
}

export default SideMenu;
