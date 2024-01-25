import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, ...props }) => {
	return (
		<button
			className="rounded active:scale-95 px-2 py-1 font-semibold transition hover:ring-4 hover:ring-blue-200 bg-blue text-blue-50"
			style={{
				backgroundColor: "rgb(63 59 241)",
			}}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
