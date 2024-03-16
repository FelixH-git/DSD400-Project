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
            <p className="formtitle">Lägg till ny bok</p>
            <div className="divinput">
            <div className="mb-3">
            <label htmlFor="title" className="labeltitle">Titel: </label>
            <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Boktitel"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            </div>
            </div>

            <div className="divinput">
            <label htmlFor="img" className="labeltitle">Bild: </label>
            <input
                className="form-control"
                type="text"
                id="img"
                name="img"
                placeholder="JAKOB FIXA BILD"
                value={img}
                onChange={(event) => setImg(event.target.value)}
            />
            </div>
            <div className="divinput">
            <div className="mb-3">
            <label htmlFor="price" className="labeltitle">Pris: </label>
            <input
                className="form-control"
                type="text"
                id="price"
                name="price"
                placeholder="Pris på bok"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            </div>
            </div>
            
            
            <div className="divinput">
            <button type="submit" className="btn btn-primary">Lägg till bok</button>
            </div>
            
        </form>
    );
};

export default CreateBook;
