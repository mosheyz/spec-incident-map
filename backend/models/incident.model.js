import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["fire", "flood", "accident", "medical", "other"],
        },
        status: {
            type: String,
            required: true,
            enum: ["open", "in_progressod", "closed"],
            default: "open",
        },
        location: {
            lat: {
                required: true,
                type: Number,
                min: -90,
                max: 90,
            },
            lng: {
                required: true,
                type: Number,
                min: -180,
                max: 180,
            },
        },
        createdBy: {
            required: true,
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // חובה - השם המדויק של המודל שאליו אנחנו מקשרים
        },
    },
    { timestamps: true },
);

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;
