import Markdown from "@/components/Markdown";
import { IResume } from "@/interfaces/interfaces";
import fetcher from "@/lib/fetcher";
import { NextPage, NextApiRequest, NextApiResponse } from "next";

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
		return (
			<></>
		)
	}
	return (
		<div className="p-12 flex">
			<div className="w-full sm:w-2/4 p-6 border-b border-gray-100 bg-white rounded-2xl shadow self-start">
				testfa wfawe fawef
				<p>fa wefawe fawef </p>
			</div>
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
					{data.experiences.map((experience) => (
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
		</div>
	);
};

export default Resume;
