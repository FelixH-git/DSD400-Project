import { useState, useEffect } from "react";

function ListGroup({ books, heading, onSelectItem }) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch(`/api/user/admin`);
        if (response.ok) {
          const data = await response.json();
          setIsAdmin(data.isAdmin);
        } else {
          throw new Error('Failed to check admin status');
        }
      } catch (error) {
        console.error(error);
        setIsAdmin(false);
      }
    };
    checkAdminStatus();
  }, []);

  const handleAdmin = async (bookId) =>{
    try {
      console.log(bookId);
      const response = await fetch(`/api/book/remove/${bookId}`, {
        method: 'POST',
      });


      const data = await response.json();
      alert(data.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const baseUrl = '/img/upload/';

  return (
    <>
      <h1>{heading}</h1>
      {books.length === 0 && <p>Inga böcker funna</p>}
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

                <h5 className="mb-1">   {book.title}</h5>
                
                {book.img && (
                  <img
                    src={baseUrl + book.img} 
                    alt={book.title}
                    style={{ maxWidth: "175px" }}
                  />
                )}
                
                <p className="mb-1">Pris: {book.price} kr</p>
                <p className="mb-1">Säljar e-post: {book.owner.email}</p>
                <p className="mb-1">Säljar telefonnummer: {book.owner.phone}</p>
                {book.reserved ? (
                  <p className="mb-1">Reserverad av: {book.reserved.email}</p>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReserveClick(book._id)}
                  >
                    Reservera
                  </button>
                )}

                {isAdmin ? (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleAdmin(book._id)}
                  >
                    Ta bort
                  </button>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
