import Image from "next/image";
import { accordionIcon } from "@public/images";

interface Props {
	headerIcon: string;
	title: string;
}

const ResumeEditorHeader: React.FC<Props> = ({ headerIcon, title }) => {
	return (
		<div className="cursor-pointer flex justify-between">
			<div className="flex">
				<Image
					src={headerIcon}
					alt="summary-icon"
					height={24}
					width={24}
					className="mr-2"
				/>
				<p className="truncate">{title}</p>
			</div>
			<Image src={accordionIcon} alt="accordion-icon" />
		</div>
	);
};

export default ResumeEditorHeader;
