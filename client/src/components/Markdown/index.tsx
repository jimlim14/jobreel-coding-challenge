import React from "react";
import ReactMarkdown from "react-markdown";
import styles from "./Markdown.module.css";

interface Props {
	children: React.ReactNode;
}

const Markdown: React.FC<Props> = ({ children }) => {
	return (
		<ReactMarkdown className={styles.reactMarkdown}>
			{children as string}
		</ReactMarkdown>
	);
};

export default Markdown;
