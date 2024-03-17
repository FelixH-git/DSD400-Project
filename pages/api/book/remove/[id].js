import fs from 'fs';
import path from 'path';
import Book from "../../../../models/bookSchema";
import User from "../../../../models/userSchema";
import { parse } from 'cookie';
import dbConnect from "../../../../util/dbconnect";

export default async function handler(req, res) {
    await dbConnect(); 

    if (req.method === "POST") {
        const cookies = parse(req.headers.cookie || '');

        if (!cookies.userID) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = req.query;

        try {
            const user = await User.findById(cookies.userID);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!user.isAdmin) {
                return res.status(403).json({ message: "User is not an admin" });
            }

            const book = await Book.findById(id);
            if (!book) {
                return res.status(404).json({ message: "Book not found" });
            }

            await Book.findByIdAndDelete(id);

            const imagePath = path.join(process.cwd(), 'public', 'img', 'upload', book.img);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            return res.status(200).json({ message: "Book removed successfully" });
        } catch (error) {
            console.error("Error removing book:", error);
            return res.status(500).json({ message: "Internal Error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
