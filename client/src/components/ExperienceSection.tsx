import { IResume } from "@app/interfaces/interfaces";
import React from "react";
import Button from "./Button";
import Divider from "./Divider";
import InputField from "./InputField";
import TextArea from "./TextArea";

interface Props {
	resumeData: IResume;
	handleChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
		index: number | undefined
	) => void;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>, section: string) => void;
	addExperience: () => void;
}

const ExperienceSection: React.FC<Props> = ({
	resumeData,
	handleChange,
	handleSubmit,
	addExperience,
}) => {
	const currentYear = new Date().getFullYear();
	const yearOptions: number[] = [];
	for (let year = currentYear; year >= currentYear - 40; year--) {
		yearOptions.push(year);
	}
	return (
		<form onSubmit={(e) => handleSubmit(e, "experiences")}>
			{resumeData.experiences &&
				resumeData.experiences.map((experience, i) => (
					<div key={i}>
						<p className="text-xl font-bold my-2">Experience {i + 1}</p>
						<div className="mb-4">
							<label htmlFor="title" className="font-bold text-gray-600">
								Title
							</label>
							<div className="mt-2">
								<InputField
									type="text"
									name="title"
									value={experience.title}
									onChange={(e) => handleChange(e, i)}
								/>
							</div>
						</div>
						<div className="mb-4">
							<label htmlFor="companyName" className="font-bold text-gray-600">
								Employer
							</label>
							<div className="mt-2">
								<InputField
									type="text"
									name="companyName"
									value={experience.companyName}
									onChange={(e) => handleChange(e, i)}
								/>
							</div>
						</div>
						<div className="mb-4">
							<div className="flex mb-2">
								<p className="w-2/4 font-bold text-gray-600">Start date</p>
								<p className="w-2/4 font-bold text-gray-600">End date</p>
							</div>
							<div className="flex">
								<div className="flex w-2/4">
									<select
										onChange={(e) => handleChange(e, i)}
										name="startMonth"
										value={experience.startMonth}
										className="cursor-pointer appearance-none w-full outline-none rounded-lg border-2 border-gray-200 bg-white focus:border-blue-600 p-3 text-sm  text-gray-900"
									>
										<option value="">Don't show</option>
										{monthOptions.map((month, i) => (
											<option key={i} value={month.value}>
												{month.text}
											</option>
										))}
									</select>

									<select
										onChange={(e) => handleChange(e, i)}
										name="startYear"
										value={experience.startYear}
										className="cursor-pointer appearance-none w-full outline-none rounded-lg border-2 border-gray-200 bg-white focus:border-blue-600 p-3 text-sm  text-gray-900"
									>
										<option value={""}>Year</option>
										{yearOptions.map((year, i) => (
											<option key={i} value={year}>
												{year}
											</option>
										))}
									</select>
								</div>
								<div className="flex w-2/4">
									<select
										onChange={(e) => handleChange(e, i)}
										name="endMonth"
										value={experience.endMonth}
										className="cursor-pointer appearance-none w-full outline-none rounded-lg border-2 border-gray-200 bg-white focus:border-blue-600 p-3 text-sm  text-gray-900"
									>
										<option value="">Don't show</option>
										{monthOptions.map((month, i) => (
											<option key={i} value={month.value}>
												{month.text}
											</option>
										))}
									</select>

									<select
										onChange={(e) => handleChange(e, i)}
										name="endYear"
										value={experience.endYear}
										className="cursor-pointer appearance-none w-full outline-none rounded-lg border-2 border-gray-200 bg-white focus:border-blue-600 p-3 text-sm  text-gray-900"
									>
										<option value={""}>Year</option>
										{yearOptions.map((year, i) => (
											<option key={i} value={year}>
												{year}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="mb-4">
							<label htmlFor="description" className="font-bold text-gray-600">
								description
							</label>
							<div className="mt-2">
								<TextArea
									rows={5}
									name="description"
									value={experience.description}
									onChange={(e) => handleChange(e, i)}
								/>
							</div>
						</div>
						<Divider className="border-b my-6" />
					</div>
				))}
			<div className="flex justify-center">
				<Button
					type="button"
					onClick={() => addExperience()}
					variation="secondary"
				>
					add professional experience
				</Button>
			</div>
			<div className="flex justify-end">
				<Button type="submit" variation="primary">
					Save
				</Button>
			</div>
		</form>
	);
};

export default ExperienceSection;

const monthOptions = [
	{ text: "January", value: "01" },
	{ text: "February", value: "02" },
	{ text: "March", value: "03" },
	{ text: "April", value: "04" },
	{ text: "May", value: "05" },
	{ text: "June", value: "06" },
	{ text: "July", value: "07" },
	{ text: "August", value: "08" },
	{ text: "September", value: "09" },
	{ text: "October", value: "10" },
	{ text: "November", value: "11" },
	{ text: "December", value: "12" },
];
