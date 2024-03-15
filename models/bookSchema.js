import { Schema, model, models } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reserved: {
        type: String,   
    },
});

const Book = models.Book || model("Book", bookSchema);

export default Book;
