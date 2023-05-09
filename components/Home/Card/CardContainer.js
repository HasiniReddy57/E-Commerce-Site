import Pagination from "@/components/Pagination/Pagination";
import { HomeContext } from "@/pages";
import React, { useContext, useState } from "react";

import CardItem from "./CardItem";

function CardContainer({ products, setReloadnav }) {
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 8;

  let { filters, sortType, searchInput } = useContext(HomeContext);
  let requiredFilters = Object.keys(filters)
    .map((ele) => (filters[ele] ? ele : null))
    .filter((ele) => ele);

  const getSorter = () => {
    switch (sortType) {
      case "A-Z":
        return (a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
      case "Z-A":
        return (a, b) => (a.title > b.title ? -1 : a.title < b.title ? 1 : 0);
      case "Low to High":
        return (a, b) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0);
      case "High to Low":
        return (a, b) => (a.price > b.price ? -1 : a.price < b.price ? 1 : 0);
      default:
        return (a, b) => {};
    }
  };

  let requiredProducts =
    requiredFilters.length > 0
      ? requiredFilters
          .map((ele) => products.filter((prod) => prod.category === ele))
          .flat(1)
      : products;

  requiredProducts = requiredProducts
    .slice()
    .sort(getSorter())
    .filter((prod) =>
      searchInput.length > 2
        ? prod.title.toLowerCase().includes(searchInput.toLowerCase())
        : true
    );

  const pagifyData = (data) => {
    let firstPageIndex = (currentPage - 1) * PageSize;
    let lastPageIndex = firstPageIndex + PageSize;
    if (firstPageIndex > data.length) {
      firstPageIndex = 0;
      lastPageIndex = data.length;
    }
    return data?.slice(firstPageIndex, lastPageIndex);
  };

  const pageContent = pagifyData(requiredProducts);

  return (
    <>
      <div className="d-flex flex-row flex-wrap gap-3 m-3 ">
        {pageContent?.map((ele, index) => {
          return (
            <CardItem
              prod={ele}
              key={`CC${index}`}
              setReloadnav={setReloadnav}
              type="display"
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={requiredProducts.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default CardContainer;
