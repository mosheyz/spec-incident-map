import express from "express"
import { createIncident, getAllIncidents } from "../ctrls/incident.ctrl.js"
import authMiddleware from "../utils/authMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, createIncident)
router.get("/", authMiddleware, getAllIncidents)

export default router