import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    books: {
        type: String
    },
});

const User = models.User || model("User", userSchema);

export default User;
