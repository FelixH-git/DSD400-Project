import Book from "../../../../models/bookSchema";
import User from "../../../../models/userSchema";
import { parse } from 'cookie';
import dbConnect from "../../../../util/dbconnect";

export default async function handler(req, res) {
    dbConnect
    
    if (req.method === "POST") {
        const cookies = parse(req.headers.cookie || '');

        if (!cookies.userID) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.query; 

        try {
            const book = await Book.findById(id);
            const user = await User.findById(cookies.userID);
            
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }


            book.reserved = user._id;
            const updatedBook = await book.save();

            return res.status(200).json(updatedBook);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    if (req.method === "GET") {
        const { id } = req.query; 

        try {
            const book = await Book.findById(id).populate('reserved', 'email');
            
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            if (!book.reserved) {
                return res.status(200).json({ message: "Book is available to reserve" });
            } else {
                const user = await User.findById(book.reserved);
                return res.status(200).json({ message: "Book is reserved by:", user: user.email });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
