import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { email, password } = req.body;
    const isExist = await User.findOne({ email: email });
    if (isExist) {
        const err = new Error("Already exist");
        err.status = 400;
        throw err;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = (await User.create({ email, passwordHash })).toObject();
    delete newUser.passwordHash;

    const token = generateToken(newUser._id);

    res.status(201).send({ success: true, data: { user: newUser, token } });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const isExist = await User.findOne({ email: email });
    if (!isExist) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }

    const isEqual = await bcrypt.compare(password, isExist.passwordHash);
    if (!isEqual) {
        const err = new Error("Unauthorized");
        err.status = 401;
        throw err;
    }
    const user = isExist.toObject();
    delete user.passwordHash;

    const token = generateToken(isExist._id);
    res.status(200).send({ success: true, data: { user, token } });
};