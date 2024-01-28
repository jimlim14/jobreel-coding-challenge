import React, { useState } from "react";

interface Props {
	header: React.ReactNode;
	children: React.ReactNode;
}

const Accordion: React.FC<Props> = ({ header, children }) => {
	const [isActive, setIsActive] = useState(false);

	const handleToggle = () => {
		setIsActive((prevIsActive) => !prevIsActive);
	};

	const getHeader = () => {
		return React.isValidElement(header) ? header : null;
	};

	const getContent = () => {
		return isActive ? children : null;
	};

	return (
		<div>
			<div onClick={handleToggle}>{getHeader()}</div>
			{getContent()}
		</div>
	);
};

export default Accordion;
