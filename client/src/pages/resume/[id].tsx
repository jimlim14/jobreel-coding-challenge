import { useState } from "react";
import Markdown from "@/components/Markdown";

import { IExperience, IResume } from "@/interfaces/interfaces";
import fetcher from "@/lib/fetcher";
import { NextPage, NextApiRequest, NextApiResponse } from "next";
import {
	summaryIcon,
	experienceIcon,
	basicInformationIcon,
} from "../../../public/images";
import Image from "next/image";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import Accordion from "@/components/Accordion";
import Divider from "@/components/Divider";
import ResumeEditorHeader from "@/components/ResumeEditorHeader";

export async function getServerSideProps(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;
	const { data, error } = await fetcher(`/resumes/${id}`);

	return {
		props: { data: data[0], error, resumeId: id },
	};
}

interface Props {
	data: IResume;
	error: string;
	resumeId: string;
}

const Resume: NextPage<Props> = ({ data, error, resumeId }) => {
	const currentYear = new Date().getFullYear();
	const yearOptions: number[] = [];
	for (let year = currentYear; year >= currentYear - 40; year--) {
		yearOptions.push(year);
	}
	const [resumeData, setResumeData] = useState<IResume>(data);
	const newExperience: IExperience = {
		title: "",
		companyName: "",
		startMonth: "",
		startYear: 0,
		endMonth: "",
		endYear: 0,
		description: "",
	};

	if (error) {
		return <></>;
	}

	function handleChange(
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
		index: number | undefined = undefined
	) {
		const { name, value } = e.target;

		setResumeData((prevResumeData) => {
			if (index === undefined) {
				return {
					...prevResumeData,
					[name]: value,
				};
			}

			const updatedExperiences = [...prevResumeData.experiences];
			updatedExperiences[index] = {
				...updatedExperiences[index],
				[name]: value,
			};

			return {
				...prevResumeData,
				experiences: updatedExperiences,
			};
		});
	}

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>,
		section: string
	) {
		e.preventDefault();

		const editedResume = await fetcher(`/resumes/${resumeId}`, "PUT", {
			[section]: resumeData[section],
		});
	}

	function addExperience() {
		setResumeData((prevResumeData) => ({
			...prevResumeData,
			experiences: prevResumeData.experiences
				? [...prevResumeData.experiences, newExperience]
				: [newExperience],
		}));
	}

	function addSeparator(separator: string, experience: IExperience) {
		switch (separator) {
			case "-":
				if (
					(experience.startMonth || experience.startYear) &&
					(experience.endMonth || experience.endYear)
				) {
					return "-";
				}
				break;
			case "/":
				if (
					(experience.startMonth && experience.startYear) ||
					(experience.endMonth && experience.endYear)
				) {
					return "/";
				}
				break;
		}
	}

	return (
		<div className="p-12 flex max-w-screen-2xl mx-auto">
			<div className="w-2/4 overflow-y-auto">
				<div className="mr-8 mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
					<Accordion
						header={
							<ResumeEditorHeader
								headerIcon={basicInformationIcon}
								title="Basic Information"
							/>
						}
					>
						<Divider className="border-b my-6" />
						<form onSubmit={(e) => handleSubmit(e, "name")}>
							<label htmlFor="name" className="font-bold">
								Name
							</label>
							<InputField
								type="text"
								name="name"
								value={resumeData.name}
								onChange={handleChange}
							/>
							<Button type="submit">save</Button>
						</form>
					</Accordion>
				</div>

				<div className="mr-8 mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
					<Accordion
						header={
							<ResumeEditorHeader headerIcon={summaryIcon} title="Summary" />
						}
					>
						<Divider className="border-b my-6" />
						<form onSubmit={(e) => handleSubmit(e, "summary")}>
							<label htmlFor="summary" className="font-bold">
								Summary
							</label>
							<TextArea
								rows={5}
								name="summary"
								value={resumeData.summary}
								onChange={handleChange}
							/>
							<Button type="submit">save</Button>
						</form>
					</Accordion>
				</div>

				<div className="mr-8 mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
					<Accordion
						header={
							<ResumeEditorHeader
								headerIcon={experienceIcon}
								title="Professional Experience"
							/>
						}
					>
						<Divider className="border-b my-6" />
						<form onSubmit={(e) => handleSubmit(e, "experiences")}>
							{resumeData.experiences &&
								resumeData.experiences.map((experience, i) => (
									<div key={i}>
										<p className="my-2">Experience {i + 1}</p>
										<div className="mb-4">
											<label
												htmlFor="title"
												className="font-bold text-gray-600"
											>
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
											<label
												htmlFor="companyName"
												className="font-bold text-gray-600"
											>
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
											<label
												htmlFor="timeFrame"
												className="font-bold text-gray-600"
											>
												Time frame
											</label>
											<div className="flex">
												<p className="w-2/4">Start date</p>
												<p className="w-2/4">End date</p>
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
														<option value="">Year</option>
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
														<option value="">Year</option>
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
											<label
												htmlFor="description"
												className="font-bold text-gray-600"
											>
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
							<Button type="submit">Save</Button>
						</form>
						<Button onClick={addExperience}>add professional experience</Button>
					</Accordion>
				</div>
			</div>
			{data && (
				<div className="sticky top-12 w-3/4 p-6 border-b border-gray-100 bg-white rounded shadow-sm self-start">
					<div className="flex items-center flex-col">
						<p className="mb-4 italic text-xl sm:text-4xl">{resumeData.name}</p>
					</div>
					<div className="mb-4 flex justify-center bg-gray-100 font-bold">
						Summary
					</div>
					<p className="mb-4 text-sm">{resumeData.summary}</p>
					<div className="mb-4 flex justify-center bg-gray-100 font-bold">
						Professional Experiences
					</div>
					<div>
						{data.experiences &&
							resumeData.experiences.map((experience) => (
								<div className="flex mb-4">
									<div className="w-1/4 text-sm">
										{experience.startMonth}
										{addSeparator("/", experience)}
										{experience.startYear} {addSeparator("-", experience)}{" "}
										{experience.endMonth}
										{addSeparator("/", experience)}
										{experience.endYear}
									</div>
									<div className="w-3/4 text-sm">
										<div className="flex truncate">
											<p className="font-bold">
												{experience.title}
												{experience.companyName && ","}
											</p>
											<p className="italic">{experience.companyName}</p>
										</div>
										<Markdown>{experience.description}</Markdown>
									</div>
								</div>
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Resume;

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
