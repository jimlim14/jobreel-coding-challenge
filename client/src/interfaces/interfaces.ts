export interface IResume {
	_id: any;
	name: string;
	summary: string;
	experiences: IExperience[];
	[key: string]: any;
}

export interface IExperience {
	title: string;
	companyName: string;
	startMonth: string;
	startYear: number;
	endMonth: string;
	endYear: number;
	description: string;
}
