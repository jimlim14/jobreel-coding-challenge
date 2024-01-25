import Image from "next/image";
import { useState, useEffect } from "react";
import { IResume } from "@/interfaces/interfaces";
import Button from "@/components/Button";
import Resume from "@/components/Resume";
import fetcher from "@/lib/fetcher";
import Link from "next/link";

export default function Home() {
	const [resumes, setResumes] = useState<IResume[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchResumes = async () => {
			const { data, error } = await fetcher("/resumes");

			if (data) {
				setResumes(data);
			}

			if (error) {
				setError(error);
			}
		};

		fetchResumes();
	}, []);

	async function addResume() {
		const { data, error } = await fetcher("/resumes", "POST");
		setResumes((prevResumes) => [...prevResumes, data]);
	}

	return (
		<div className="px-6 mx-auto w-full max-w-screen-xl lg:h014">
			<div className="flex justify-between items-center py-6">
				<p className="text-2xl">My resumes</p>
				<Button onClick={addResume}>Add resume</Button>
			</div>
			{resumes &&
				resumes.map((resume: IResume, i: number) => (
					<Link href={`/resume/${resume._id}`}>
						<Resume key={resume._id} resume={resume} idx={i} />
					</Link>
				))}
		</div>
	);
}
