import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }
    const headerList = authorization.split(" ");
    const token = headerList[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userMongoose = await User.findOne({ _id: decoded.id });
    if (!userMongoose) {
        const err = new Error("User not found");
        err.status = 404;
        throw err;
    }
    const user = userMongoose.toObject();
    delete user.passwordHash;
    req.user = user;
    next();
};

export default authMiddleware