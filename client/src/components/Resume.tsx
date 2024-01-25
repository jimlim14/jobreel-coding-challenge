import React from "react";
import { IResume } from "../interfaces/interfaces";

interface Props {
	resume: IResume;
}

const Resume: React.FC<Props> = ({ resume }) => {
	return (
		<div className="border-b border-gray-100 p-6 mb-4 bg-white rounded-2xl shadow-lg">
			{resume.name}
		</div>
	);
};

export default Resume;
