import Book from "../../../models/bookSchema";
import dbConnect from "../../../util/dbconnect";
import { parse } from 'cookie';
import User from "../../../models/userSchema";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'public', 'img', 'upload'),
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  dbConnect();

  // Pagination loading
  if (req.method === "GET") {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
      const totalBooksCount = await Book.countDocuments();
      const totalPages = Math.ceil(totalBooksCount / limit);

      const books = await Book.find()
        .populate('owner')
        .populate('reserved')
        .skip((page - 1) * limit)
        .limit(limit);

      return res.status(200).json({ success: true, books, totalPages });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // Book creation
  if (req.method === "POST") {
    const cookies = parse(req.headers.cookie || '');

    if (!cookies.userID) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await User.findById(cookies.userID);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      upload.single('img')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ message: "Error uploading file", error: err.message });
        }

        const { title, price } = req.body;
        const img = req.file ? path.basename(req.file.path) : null;

        const book = new Book({
          title,
          img,
          price,
          owner: user._id,
        });

        const savedBook = await book.save();
        return res.status(200).json(savedBook);
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
