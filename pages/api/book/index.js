import Book from "../../../models/bookSchema";
import dbConnect from "../../../util/dbconnect";
import { parse } from 'cookie';
import User from "../../../models/userSchema";

export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
        const cookies = parse(req.headers.cookie || '');

        if (!cookies.userID) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { title, img, price } = req.body;

        try {
            const user = await User.findById(cookies.userID);
            
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const book = new Book({
                title,
                img,
                price,
                owner: user._id,
            });
            
            const savedBook = await book.save();
            return res.status(200).json(savedBook);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
