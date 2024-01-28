import React from "react";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<Props> = ({ ...props }) => {
	return (
		<textarea
			className="transition w-full outline-none rounded-lg border-2 border-gray-200 bg-white text-left focus:border-blue-600 p-3 text-sm  text-gray-900"
			{...props}
		/>
	);
};

export default TextArea;
