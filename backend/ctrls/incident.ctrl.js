import Incident from "../models/incident.model.js";

export const createIncident = async (req, res) => {
    const { title, description, category, location } = req.body;
    const { _id } = req.user;

    const newIncident = await Incident.create({
        title,
        description,
        category,
        location,
        createdBy: _id,
    });

    res.status(201).send({ success: true, data: newIncident.toObject() });
};

export const getAllIncidents = async (req, res) => {
    const incidents = await Incident.find()
        .populate("createdBy", "email")
        .lean();

    res.status(200).send({ success: true, data: incidents });
};
