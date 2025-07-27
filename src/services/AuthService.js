import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import "dotenv/config";


const secrate = process.env.SECRATEKEY
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

export const generateToken = async (user_obj) => {
    return jwt.sign(user_obj, secrate)
}
export const verifyToken = async (token)=>{
    return jwt.verify(token,secrate);
} 