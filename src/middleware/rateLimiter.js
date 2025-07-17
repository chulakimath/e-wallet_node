import ratelimit from "../config/upstach.js";

const ratelimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit");
        if (!success) {
            return res.status(429).json({ message: "To many Requests pleasetry agin later" })
        }
        next();

    } catch (error) {
        console.log("ratelimit error", error);
        next(error);
    }
}; 

export default ratelimiter;