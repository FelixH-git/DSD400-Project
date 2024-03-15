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
            <p class="formtitle">Lägg till ny bok</p>
            <div class="divinput">
            <div class="mb-3">
            <label htmlFor="title" class="labeltitle">Titel: </label>
            <input
                class="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Boktitel"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            </div>
            </div>

            <div class="divinput">
            <label htmlFor="img" class="labeltitle">Bild: </label>
            <input
                class="form-control"
                type="text"
                id="img"
                name="img"
                placeholder="JAKOB FIXA BILD"
                value={img}
                onChange={(event) => setImg(event.target.value)}
            />
            </div>
            <div class="divinput">
            <div class="mb-3">
            <label htmlFor="price" class="labeltitle">Pris: </label>
            <input
                class="form-control"
                type="text"
                id="price"
                name="price"
                placeholder="Pris på bok"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            </div>
            </div>
            
            
            <div class="divinput">
            <button type="submit" class="btn btn-primary">Lägg till bok</button>
            </div>
            
        </form>
    );
};

export default CreateBook;
