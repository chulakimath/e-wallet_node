import { sql } from "../config/db.js";
import { hashPassword, comparePassword, generateToken } from "../services/AuthService.js";
export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hash = await hashPassword(password);
        const response = await sql`INSERT INTO USERS (user_name,original_password,password) VALUES (${email},${password},${hash}) RETURNING *`;
        return res.status(200).json({ "Message": "Created", "data": response });
    } catch (error) {
        if (error.code == "23505") {
            return res.status(409).json({ message: "User Name Already Exists" });
        }
        console.log("signup-error", error);
    }
}
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password) {
            return res.status(200).json({ "Message": "Missing Info" });

        }
        const user = await sql`SELECT * FROM users WHERE user_name=${email}`;
        if (user.length === 0) {
            return res.status(200).json({ "Message": "Invalid username" });
        }
        const userinfo = user[0];
        const is_validated = await comparePassword(password, userinfo.password);
        if (!is_validated) {
            return res.status(200).json({ "Message": "Invalid Password" });
        }
        const login= { "id": userinfo.id, "email": userinfo.user_name };
        const token= await generateToken(login);
        return res.status(200).json({'_token':token});


    } catch (error) {
        console.log("siginin error");
        return res.status(500).json({ "message": "Server Error" });
    }
}
