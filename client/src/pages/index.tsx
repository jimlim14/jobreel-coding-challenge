import Image from "next/image";
import { useState, useEffect } from "react";
import { IResume } from "@/interfaces/interfaces";
import Button from "@/components/Button";
import fetcher from "@/lib/fetcher";
import Link from "next/link";
import ResumePreview from "@/components/ResumePreview";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
	const notify = () =>
		toast.success("Successfully created a resume!", {
			position: "bottom-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
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
		notify();
	}

	return (
		<div className="px-6 mx-auto w-full max-w-screen-xl">
			<div className="flex justify-between items-center py-6">
				<p className="text-2xl">My resumes</p>
				<Button onClick={addResume} variation="primary">
					Add resume
				</Button>
			</div>
			<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
				{resumes &&
					resumes.map((resume: IResume, i: number) => (
						<Link key={i} href={`/resume/${resume._id}`}>
							<div className="bg-white overflow-y-auto h-[400px] rounded-2xl border-b border-gray-100 shadow-lg">
								<ResumePreview resumeData={resume} />
							</div>
						</Link>
					))}
			</div>
			<ToastContainer />
		</div>
	);
}
