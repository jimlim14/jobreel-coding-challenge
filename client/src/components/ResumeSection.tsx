import React from "react";
import Image from "next/image";
import { accordionIcon } from "../../public/images";
import { IResume } from "@/interfaces/interfaces";

interface Props {
	section: { name: string; icon: string };
  data: IResume;
}

const ResumeSection: React.FC<Props> = ({ section }) => {
	return (
		<div className="cursor-pointer mr-8 mb-4 flex justify-between p-6 border-b border-gray-100 bg-white rounded-2xl shadow">
			<div className="flex">
				<Image
					src={section.icon}
					alt="summary-icon"
					height={24}
					width={24}
					className="mr-2"
				/>
				<p className="truncate">{section.name}</p>
			</div>
			<Image src={accordionIcon} alt="accordion-icon" />
		</div>
	);
};

export default ResumeSection;
