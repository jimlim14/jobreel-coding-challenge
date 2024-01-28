import { useState } from "react";
import Markdown from "@/components/Markdown";
import ResumeSection from "@/components/ResumeSection";
import { IExperience, IResume } from "@/interfaces/interfaces";
import fetcher from "@/lib/fetcher";
import { NextPage, NextApiRequest, NextApiResponse } from "next";
import {
	summaryIcon,
	experienceIcon,
	basicInformationIcon,
	accordionIcon,
} from "../../../public/images";
import Image from "next/image";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import Accordion from "@/components/Accordion";
import Divider from "@/components/Divider";

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

	return (
		<div className="p-12 flex max-w-screen-2xl mx-auto">
			<div className="w-2/4 overflow-y-auto">
				<form onSubmit={(e) => handleSubmit(e, "name")}>
					<div className="mr-8 mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
						<Accordion
							header={
								<div className="cursor-pointer flex justify-between">
									<div className="flex">
										<Image
											src={basicInformationIcon}
											alt="summary-icon"
											height={24}
											width={24}
											className="mr-2"
										/>
										<p className="truncate">Basic Information</p>
									</div>
									<Image src={accordionIcon} alt="accordion-icon" />
								</div>
							}
						>
							<Divider className="border-b my-6" />
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
						</Accordion>
					</div>
				</form>

				<div className="mr-8 mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
					<Accordion
						header={
							<div className="cursor-pointer flex justify-between">
								<div className="flex">
									<Image
										src={summaryIcon}
										alt="summary-icon"
										height={24}
										width={24}
										className="mr-2"
									/>
									<p className="truncate">Summary</p>
								</div>
								<Image src={accordionIcon} alt="accordion-icon" />
							</div>
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
							<div className="cursor-pointer flex justify-between">
								<div className="flex">
									<Image
										src={experienceIcon}
										alt="summary-icon"
										height={24}
										width={24}
										className="mr-2"
									/>
									<p className="truncate">Professional Experience</p>
								</div>
								<Image src={accordionIcon} alt="accordion-icon" />
							</div>
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
														{yearOptions.map((year) => (
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
														{yearOptions.map((year) => (
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
										{experience.startMonth} {experience.startYear} -{" "}
										{experience.endMonth} {experience.endYear}
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

// const yearSelection = [
// 	{ text: "2000", value: "2000" },
// 	{ text: "2001", value: "2001" },
// 	{ text: "2002", value: "2002" },
// 	{ text: "2003", value: "2003" },
// 	{ text: "2004", value: "2004" },
// 	{ text: "2005", value: "2005" },
// 	{ text: "2006", value: "2006" },
// 	{ text: "2007", value: "2007" },
// 	{ text: "2008", value: "2008" },
// 	{ text: "2009", value: "2009" },
// 	{ text: "2010", value: "2010" },
// 	{ text: "2011", value: "2011" },
// 	{ text: "2012", value: "2012" },
// 	{ text: "2013", value: "2013" },
// 	{ text: "2014", value: "2014" },
// 	{ text: "2015", value: "2015" },
// 	{ text: "2016", value: "2016" },
// 	{ text: "2017", value: "2017" },
// 	{ text: "2018", value: "2018" },
// 	{ text: "2019", value: "2019" },
// 	{ text: "2020", value: "2020" },
// 	{ text: "2021", value: "2021" },
// 	{ text: "2022", value: "2022" },
// 	{ text: "2023", value: "2023" },
// 	{ text: "2024", value: "2024" },
// ];

const sections = [
	{
		title: "Basic information",
		icon: basicInformationIcon,
		name: "name",
		value: "su",
	},
	{ title: "Summary", icon: summaryIcon },
	{ title: "Professional Experience", icon: experienceIcon },
];
