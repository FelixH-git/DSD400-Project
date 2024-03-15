import User from "../../../models/userSchema";
import dbConnect from "../../../util/dbconnect";
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie';

export default async function handler(req, res) {
    dbConnect();
    if (req.method === "POST") {
        const {email,password} = req.body;

        try{
            const user = await User.findOne({email:email});
        
            if(!user){
                return res.status(500).json({message: "This user dosent exist"});;
            }

            const passmatch = await bcrypt.compare(password, user.password);
            
            if(!passmatch){
                return res.status(500).json({message: "Wrong Password"});;
            }
            //NEVER DO THIS IN REAL PROJECT
            res.setHeader('Set-Cookie', serialize('userID', user._id.toString(), {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
                sameSite: 'strict',
            }));
            return res.status(200).json({message: `Welcome ${user.email}, to the bookstore.`});
            
        } catch(error) {
            return res.status(500).json(error);
        }
    
        
    }
  }