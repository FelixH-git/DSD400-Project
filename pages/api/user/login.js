import User from "../../../models/userSchema";
import dbConnect from "../../../util/dbconnect";
import bcrypt from 'bcryptjs'
export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
        const {email,password} = req.body;

        try{
        const user = await User.findOne({email:email});
        
        if(!user){
            return res.status(500);
        }

        const passmatch = await bcrypt.compare(password, user.password);
        
        if(!passmatch){
            return res.status(500);
        }
        console.log("bitch ass muffuka");
        return res.status(200).json({message: "Logged in lil bitch ass"});
        
        } catch(error) {
            return res.status(500).json(error);
        }
    
        
    }
  }