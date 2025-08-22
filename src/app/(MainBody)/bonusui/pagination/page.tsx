import PaginationContainer from "@/Components/BonusUi/Pagination/Pagination";
import React from "react";

const Pagination = () => {
  return <PaginationContainer activePage={1}
    pages={12}
    onActivePageChange={(num: any) => console.log(num)}
  />;
};

export default Pagination;
