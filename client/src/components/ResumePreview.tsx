import Markdown from "@/components/Markdown";
import { IResume, IExperience } from "@/interfaces/interfaces";

interface Props {
	resumeData: IResume;
}

const ResumePreview: React.FC<Props> = ({ resumeData }) => {

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
		<>
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
				{resumeData.experiences &&
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
		</>
	);
};

export default ResumePreview;
