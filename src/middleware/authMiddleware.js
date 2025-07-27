import jwt from 'jsonwebtoken';
import { verifyToken } from '../services/AuthService.js';

const authMuddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ "message": "Token missing or malformed" });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = await verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("token error auth middleware", error)
        return res.status(401).json({ "message": "PleaseLogin again" });
    }

}
export default authMuddleware;