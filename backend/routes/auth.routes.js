import express from "express";
import { login, register } from "../ctrls/auth.ctrl.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
    res.status(200).send({ success: true, data: { user: req.user } });
});

export default router;
