
export default async function handler(req, res) {
    if (req.method === "GET") {

        
        res.setHeader('Set-Cookie', 'userID=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict');
        return res.status(200).json({ message: "Logged out successfully" });
    }
  }
  