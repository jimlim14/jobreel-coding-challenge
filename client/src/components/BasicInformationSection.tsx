import { IResume } from "@app/interfaces/interfaces";
import React from "react";
import Button from "./Button";
import InputField from "./InputField";

interface Props {
	resumeData: IResume;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
		index: number | undefined
	) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, section: string) => void;
}

const BasicInformationSection: React.FC<Props> = ({
	resumeData,
	handleChange,
	handleSubmit,
}) => {
	return (
		<form onSubmit={(e) => handleSubmit(e, "name")}>
			<label htmlFor="name" className="font-bold">
				Name
			</label>
			<InputField
				type="text"
				name="name"
				value={resumeData.name}
				onChange={(e) => handleChange(e, undefined)}
				className="mt-2 mb-4"
			/>
			<div className="flex justify-end">
				<Button type="submit" variation="primary">
					Save
				</Button>
			</div>
		</form>
	);
};

export default BasicInformationSection;
