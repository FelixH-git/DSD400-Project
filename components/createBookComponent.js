import React, { useState } from "react";
import axios from "axios";

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [imgFile, setImgFile] = useState(null); 
    const [price, setPrice] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("img", imgFile); 
            formData.append("price", price);

            const response = await axios.post("/api/book", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setTitle("");
            setImgFile(null); 
            setPrice("");
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <div className="divindex"><a href='/books'>Till Katalog</a></div>
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
                    type="file" 
                    id="img"
                    name="img"
                    onChange={(event) => setImgFile(event.target.files[0])} 
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
