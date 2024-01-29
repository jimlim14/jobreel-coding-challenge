import { useState } from "react";
import { IExperience, IResume } from "@app/interfaces/interfaces";
import fetcher from "@app/lib/fetcher";
import { NextPage, NextApiRequest, NextApiResponse } from "next";
import {
	summaryIcon,
	experienceIcon,
	basicInformationIcon,
} from "@public/images";
import Accordion from "@app/components/Accordion";
import Divider from "@app/components/Divider";
import ResumeEditorHeader from "@app/components/ResumeEditorHeader";
import ResumePreview from "@app/components/ResumePreview";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BasicInformationSection from "@app/components/BasicInformationSection";
import SummarySection from "@app/components/SummarySection";
import ExperienceSection from "@app/components/ExperienceSection";

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
						<BasicInformationSection
							resumeData={resumeData}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>
					</Accordion>
				</div>

				<div className="mb-4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
					<Accordion
						header={
							<ResumeEditorHeader headerIcon={summaryIcon} title="Summary" />
						}
					>
						<Divider className="border-b my-6" />
						<SummarySection
							resumeData={resumeData}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>
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
						<ExperienceSection
							resumeData={resumeData}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							addExperience={addExperience}
						/>
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
