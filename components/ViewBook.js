import React, { useState, useEffect } from "react";
import ListGroup from "./ListGroupComponent";

import 'bootstrap/dist/css/bootstrap.css';

function ViewBook() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/book");
      const data = await res.json();
      setBooks(data.books); 
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSelectItem = (item) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={books.map(book => book.title)} 
        heading={"Böcker"}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default ViewBook;
