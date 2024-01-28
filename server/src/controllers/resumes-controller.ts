import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { database } from "../config/database";

const getResumes = async (req: Request, res: Response) => {
	try {
		const resumes = await database.collection("resumes").find({}).toArray();
		res.status(200).json(resumes);
	} catch (e) {
		console.error("something is wrong trying to retrieve resumes: ", e);
		res.status(500).json({ error: e });
	}
};

const getResume = async (req: Request, res: Response) => {
	try {
		const resumeId = req.params.id;
		const resumes = await database
			.collection("resumes")
			.find({ _id: new ObjectId(resumeId) })
			.toArray();
		res.status(200).json(resumes);
	} catch (e) {
		console.error("something is wrong trying to retrieve resumes: ", e);
		res.status(500).json({ error: e });
	}
};

const postResume = async (req: Request, res: Response) => {
	try {
		const { name, summary, experiences } = req.body;
		const resumeData = { name, summary, experiences };
		const insertResult = await database
			.collection("resumes")
			.insertOne(resumeData);
		const newResume = await database
			.collection("resumes")
			.findOne({ _id: insertResult.insertedId });
		res.status(201).json(newResume);
	} catch (e) {
		console.error("something is wrong trying to create a new resume: ", e);
		res.status(500).json({ error: e });
	}
};

const editResume = async (req: Request, res: Response) => {
	try {
		const resumeId = req.params.id;
		const updateResult = await database
			.collection("resumes")
			.updateOne({ _id: new ObjectId(resumeId) }, { $set: req.body });
		const updatedResume = await database
			.collection("resumes")
			.findOne({ _id: new ObjectId(resumeId) });
		res.status(200).json(updatedResume);
	} catch (e) {
		console.error("something is wrong trying to edit resume: ", e);
		res.status(500).json({ error: e });
	}
};

module.exports = {
	getResume,
	getResumes,
	postResume,
	editResume,
};
