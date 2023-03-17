import React, { Fragment, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

export default function PaginationComp({ data, setData }) {
  // console.log("halaman pagination", data);
  // console.log(data.data.first_page_url);

  const firstPage = data.first_page_url;
  const lastPage = data.last_page_url;
  const nextPage = data.next_page_url;
  const prevPage = data.prev_page_url;
  const currentPage = data.current_page;

  const handleFirstPage = () => {
    axios.get(firstPage).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const handleLastPage = () => {
    axios.get(lastPage).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const handlePrevPage = () => {
    axios.get(prevPage).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  const handleNextPage = () => {
    axios.get(nextPage).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>
        <Pagination.Item onClick={handleFirstPage} disabled={!prevPage ? true : false}>
          First
        </Pagination.Item>
        {/* <Pagination.First onClick={handleFirstPage} /> */}
        <Pagination.Prev onClick={handlePrevPage} disabled={!prevPage ? true : false} />

        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Next onClick={handleNextPage} disabled={!nextPage ? true : false} />
        {/* <Pagination.Last onClick={handleLastPage} /> */}
        <Pagination.Item onClick={handleLastPage} disabled={!nextPage ? true : false}>
          Last
        </Pagination.Item>
      </Pagination>
    </div>
  );
}
