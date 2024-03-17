import { useState } from "react";


function ListGroup({ books, heading, onSelectItem }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);


  const handleReserveClick = async (bookId) => {
    try {
      console.log(bookId);
      const response = await fetch(`/api/book/reserve/${bookId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to reserve the book');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      <h1>{heading}</h1>
      {books.length === 0 && <p>No items found</p>}
      <ul className="list-group">
        {books.map((book, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={book._id} 
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(book);
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{book.title}</h5>
                <img src={book.img} alt={book.title} style={{ maxWidth: "100px" }} />
                <p className="mb-1">Price: {book.price}</p>
                <p className="mb-1">Seller email: {book.owner.email}</p>
                <p className="mb-1">Seller phone: {book.owner.phone}</p>
                {book.reserved ? (
                  <p className="mb-1">Reserved by: {book.reserved.email}</p>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleReserveClick(book._id)}>Reserve</button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
