export interface CreateFormConfigBody {
	courseId: number;
	formData: any; // Replace `any` with a more specific type if you have a schema
}

export interface SubmitData {
	formConfigId: number;
	courseId: number;
	submittedData: any;
}

export interface Course {
	id?: number; // Optional if auto-incremented
	courseCode: string;
	courseName: string;
	major: string;
}
