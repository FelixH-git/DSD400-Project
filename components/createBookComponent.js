import React, { useState } from "react";
import axios from "axios";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const book = {
                title, 
                img, 
                price,
            };

            const response = await axios.post("/api/book", book);

            setTitle("");
            setImg("");
            setPrice("");
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add new book</h1>

            <label htmlFor="title">title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <label htmlFor="img">img:</label>
            <input
                type="text"
                id="img"
                name="img"
                value={img}
                onChange={(event) => setImg(event.target.value)}
            />

            <label htmlFor="price">price:</label>
            <input
                type="text"
                id="price"
                name="price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />

            <button type="submit">submit</button>
        </form>
    );
};

export default CreateBook;
