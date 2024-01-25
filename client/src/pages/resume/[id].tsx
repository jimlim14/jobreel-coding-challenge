import { IResume } from "@/interfaces/interfaces";
import fetcher from "@/lib/fetcher";
import { NextPage } from "next";

export async function getServerSideProps(req, res) {
	const { id } = req.params;
	const { data, error } = await fetcher(`/resumes/${id}`);

	return {
		props: { data: data[0], error },
	};
}

interface Props {
	data: IResume;
	error: string;
}

const Resume: NextPage<Props> = ({ data, error }) => {
	return <div>{data.name}</div>;
};

export default Resume;
