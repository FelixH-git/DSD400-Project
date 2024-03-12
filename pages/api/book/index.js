import Book from "../../../models/bookSchema";
import dbConnect from "../../../util/dbconnect";

export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
        const {title, img, price} = req.body;

        try{

            const book = new Book({
                title, 
                img, 
                price,
            })
            
            const savedBook = await book.save();
            res.status(200).json(savedBook);
        } catch (error) {
            res.status(500).json(error);
        }
    }
  }
  