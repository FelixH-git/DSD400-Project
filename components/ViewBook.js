import React, { useState, useEffect } from "react";
import ListGroup from "./ListGroupComponent";

import 'bootstrap/dist/css/bootstrap.css';

function ViewBook() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  const fetchBooks = async (page) => {
    try {
      const res = await fetch(`/api/book?page=${page}`);
      const data = await res.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectItem = (item) => {
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <ListGroup
        books={books}
        heading={"Böcker"}
        onSelectItem={handleSelectItem}
      />
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Föregående sida</button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Nästa sida</button>
      </div>
    </div>
  );
}

export default ViewBook;
