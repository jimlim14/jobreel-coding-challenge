export interface IResume {
	_id: any;
	name: string;
	summary: string;
	experiences: IExperience[];
}

export interface IExperience {
	title: string;
	companyName: string;
	timeFrame: string;
	description: string;
}
