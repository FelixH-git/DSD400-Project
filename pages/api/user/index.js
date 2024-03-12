import User from "../../../models/userSchema";
import dbConnect from "../../../util/dbconnect";

export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
        const {email,password,phone} = req.body;

        try{
            const user = new User({
                email,
                password,
                phone,
            })
            
            const savedUser = await user.save();
            res.status(200).json(savedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
  }
  