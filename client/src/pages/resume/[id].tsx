import { useState } from "react";
import { IExperience, IResume } from "@app/interfaces/interfaces";
import fetcher from "@app/lib/fetcher";
import { NextPage, NextApiRequest, NextApiResponse } from "next";
import {
	summaryIcon,
	experienceIcon,
	basicInformationIcon,
} from "@public/images";
import InputField from "@app/components/InputField";
import Button from "@app/components/Button";
import TextArea from "@app/components/TextArea";
import Accordion from "@app/components/Accordion";
import Divider from "@app/components/Divider";
import ResumeEditorHeader from "@app/components/ResumeEditorHeader";
import ResumePreview from "@app/components/ResumePreview";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
	const notify = () =>
		toast.success("Successfully saved!", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
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
		startYear: "",
		endMonth: "",
		endYear: "",
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

		const { data, error } = await fetcher(`/resumes/${resumeId}`, "PUT", {
			[section]: resumeData[section],
		});

		notify();
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
		<div className="w-full p-12 flex flex-col md:flex-row max-w-screen-2xl mx-auto">
			<div className="md:w-full md:mr-8 overflow-y-auto">
				<div className="mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
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
								className="mt-2 mb-4"
							/>
							<div className="flex justify-end">
								<Button type="submit" variation="primary">
									Save
								</Button>
							</div>
						</form>
					</Accordion>
				</div>

				<div className="mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
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
								className="mt-2 mb-4"
							/>
							<div className="flex justify-end">
								<Button type="submit" variation="primary">
									Save
								</Button>
							</div>
						</form>
					</Accordion>
				</div>

				<div className="mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
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
										<p className="text-xl font-bold my-2">Experience {i + 1}</p>
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
											<div className="flex mb-2">
												<p className="w-2/4 font-bold text-gray-600">
													Start date
												</p>
												<p className="w-2/4 font-bold text-gray-600">
													End date
												</p>
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
							<div className="flex justify-center">
								<Button
									type="button"
									onClick={addExperience}
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
					</Accordion>
				</div>
			</div>
			{data && (
				<div className="md:w-full sticky top-12 p-6 border-b border-gray-100 bg-white rounded shadow-sm self-start">
					<ResumePreview resumeData={resumeData} />
				</div>
			)}
			<ToastContainer />
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
