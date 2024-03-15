import ListGroup from "./ListGroup";
import React from "react";

import 'bootstrap/dist/css/bootstrap.css';
function ViewBook() {
  let items = ["bok1", "bok2", "bok3", "bok4"];

  const handleSelectItem = (item) => {
    console.log(item);
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading={"Böcker"}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default ViewBook;

//yep