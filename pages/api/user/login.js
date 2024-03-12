import User from "../../../models/userSchema";
import dbConnect from "../../../util/dbconnect";

export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
        const {email,password} = req.body;

        const user = User.findOne({email:email})
        

        
    }
  }