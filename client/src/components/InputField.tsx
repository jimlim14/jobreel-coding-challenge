import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField: React.FC<Props> = ({ className, ...props }) => {
	return (
		<input
			className={`${className} transition w-full outline-none rounded-lg border-2 border-gray-200 bg-white focus:border-blue-600 p-3 text-sm  text-gray-900`}
			{...props}
		/>
	);
};

export default InputField;
