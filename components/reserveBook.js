import React, { useState } from "react";
import axios from "axios";

const ReserveBook = () => {
    const [bookID, setBookID] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(bookID);
            const response = await axios.post(`/api/book/reserve/${bookID}`);

            setBookID("");
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };


    return (
    <>
        <form onSubmit={handleSubmit}>
            <h1>Reserve book</h1>

            <label htmlFor="bookID">bookID:</label>
            <input
                type="text"
                id="bookID"
                name="bookID"
                value={bookID}
                onChange={(event) => setBookID(event.target.value)}
            />

            <button type="submit">Reserve</button>
        </form>
    </>
    );
};

export default ReserveBook;
