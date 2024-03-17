import User from '../../../models/userSchema';
import { parse } from 'cookie';
import dbConnect from '../../../util/dbconnect';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "GET") {
        const cookies = parse(req.headers.cookie || '');

        if (!cookies.userID) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const user = await User.findById(cookies.userID);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.isAdmin) {
                return res.status(200).json({ isAdmin: true });
            } else {
                return res.status(403).json({ message: "Not Admin" });
            }
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ message: "Internal Error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
