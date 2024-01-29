import Markdown from "@app/components/Markdown";
import { IResume, IExperience } from "@app/interfaces/interfaces";

interface Props {
	resumeData: IResume;
}

const ResumePreview: React.FC<Props> = ({ resumeData }) => {
	function formateTimeFrame(experience: IExperience) {
		return (
			<>
				{experience.startMonth}
				{addSeparator("/", experience.startMonth, experience.startYear)}
				{experience.startYear && experience.startYear}{" "}
				{addSeparator("-", experience.endMonth, experience.endYear)}{" "}
				{experience.endMonth}
				{addSeparator("/", experience.endMonth, experience.endYear)}
				{experience.endYear && experience.endYear}
			</>
		);
	}

	function addSeparator(separator: string, month: string, year: string) {
		switch (separator) {
			case "-":
				if (month || year) {
					return "-";
				}
				break;
			case "/":
				if (month && year) {
					return "/";
				}
				break;
		}
	}

	return (
		<>
			<div className="flex items-center flex-col">
				<p className="mb-4 italic text-xl sm:text-3xl">{resumeData.name}</p>
			</div>
			<div className="mb-4 flex justify-center bg-gray-100 font-bold">
				Summary
			</div>
			<p className="mb-4 text-sm sm:text-base md:text-sm">
				{resumeData.summary}
			</p>
			<div className="mb-4 flex justify-center bg-gray-100 font-bold">
				Professional Experiences
			</div>
			<div>
				{resumeData.experiences &&
					resumeData.experiences.map((experience) => (
						<div className="flex mb-4">
							<div className="w-1/4 text-sm">
								{formateTimeFrame(experience)}
							</div>
							<div className="w-3/4 text-sm sm:text-base md:text-sm">
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
