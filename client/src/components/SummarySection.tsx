import { IResume } from "@app/interfaces/interfaces";
import React from "react";
import Button from "./Button";
import TextArea from "./TextArea";

interface Props {
	resumeData: IResume;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
		index?: number | undefined
	) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, section: string) => void;
}

const SummarySection: React.FC<Props> = ({
	resumeData,
	handleChange,
	handleSubmit,
}) => {
	return (
		<form onSubmit={(e) => handleSubmit(e, "summary")}>
			<label htmlFor="summary" className="font-bold">
				Summary
			</label>
			<TextArea
				rows={5}
				name="summary"
				value={resumeData.summary}
				onChange={(e) =>handleChange(e, undefined)}
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

export default SummarySection;
