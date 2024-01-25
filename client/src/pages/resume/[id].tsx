import Markdown from "@/components/Markdown";
import ResumeSection from "@/components/ResumeSection";
import { IResume } from "@/interfaces/interfaces";
import fetcher from "@/lib/fetcher";
import { NextPage, NextApiRequest, NextApiResponse } from "next";
import {
	summaryIcon,
	experienceIcon,
	basicInformationIcon,
} from "../../../public/images";

export async function getServerSideProps(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;
	const { data, error } = await fetcher(`/resumes/${id}`);

	return {
		props: { data: data[0], error },
	};
}

interface Props {
	data: IResume;
	error: string;
}

const Resume: NextPage<Props> = ({ data, error }) => {
	if (error) {
		return <></>;
	}
	return (
		<div className="p-12 flex max-w-screen-xl mx-auto">
			<div className="w-full">
				{sections.map((section, i) => (
					<ResumeSection key={i} section={section} data={data} />
				))}
			</div>
			{data && (
				<div className="flex-grow flex-shrink p-6 border-b border-gray-100 bg-white rounded shadow-sm self-start">
					<div className="flex items-center flex-col">
						<p className="mb-4 italic text-xl sm:text-4xl">{data.name}</p>
					</div>
					<div className="mb-4 flex justify-center bg-gray-100 font-bold">
						Summary
					</div>
					<p className="mb-4 text-sm">{data.summary}</p>
					<div className="mb-4 flex justify-center bg-gray-100 font-bold">
						Professional Experiences
					</div>
					<div>
						{data.experiences &&
							data.experiences.map((experience) => (
								<div className="flex mb-4">
									<div className="w-1/4 text-sm">{experience.timeFrame}</div>
									<div className="w-3/4 text-sm">
										<div className="flex">
											<p className="font-bold">{experience.title}, </p>
											<p className="italic text-xs self-end">
												{experience.companyName}
											</p>
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

const sections = [
	{ name: "Basic information", icon: basicInformationIcon },
	{ name: "Summary", icon: summaryIcon },
	{ name: "Professional Experience", icon: experienceIcon },
];
