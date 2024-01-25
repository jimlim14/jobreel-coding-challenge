import Image from "next/image";
import { useState, useEffect } from "react";
import { IResume } from "@/interfaces/interfaces";
import Button from "@/components/Button";
import Resume from "@/components/Resume";
import fetcher from "@/lib/fetcher";


export default function Home() {
  const [resumes, setResumes] = useState<IResume[] | null>(null);
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

	return (
		<>
			{/* <img
				src="https://app.jobreel.com/assets/jobreel_logo-030ad757.svg"
				alt=""
        height="14px"
        width="110px"
			/> */}
			<div className="px-6 mx-auto w-full max-w-screen-xl lg:h014">
				<div className="flex justify-between items-center py-6">
					<p className="text-2xl">My resumes</p>
					<Button>Add resume</Button>
				</div>
				{resumes &&
					resumes.map((resume: IResume) => (
						<Resume key={resume._id} resume={resume} />
					))}
			</div>
		</>
	);
}
