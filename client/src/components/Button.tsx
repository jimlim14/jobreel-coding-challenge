import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variation: "primary" | "secondary";
}

const Button: React.FC<Props> = ({
	children,
	variation,
	className,
	...props
}) => {
	const classname: string =
		variation === "primary"
			? "hover:ring-blue-200 bg-blue text-blue-50 bg-blue-700"
			: variation === "secondary"
			? "hover:bg-gray-100 text-gray-900 bg-transparent bg-transparent hover:ring-gray-50"
			: "";

	return (
		<button
			className={`${className} ${classname} hover:ring-4 rounded active:scale-95 px-4 py-2 font-semibold transition`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
