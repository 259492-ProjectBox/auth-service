import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";

const prisma = new PrismaClient();

export const formRoute = new Elysia();
formRoute.use(swagger());
formRoute.use(cors());
// API to get the latest form configuration
formRoute.get("/form-config/latest/:courseId", async ({ params }) => {
	const { courseId } = params;
	const latestFormConfig = await prisma.formConfig.findFirst({
		where: { courseId: parseInt(courseId) },
		orderBy: { version: "desc" },
	});
	return latestFormConfig || { message: "No form configuration found" };
});
formRoute.get("/form-config/:version/:courseId", async ({ params }) => {
	const { courseId, version } = params;
	const latestFormConfig = await prisma.formConfig.findFirst({
		where: { courseId: parseInt(courseId), version: parseInt(version) },
		orderBy: { version: "desc" },
	});
	return latestFormConfig || { message: "No form configuration found" };
});
interface CreateFormConfigBody {
	courseId: number;
	formData: any; // You can replace `any` with a more specific type if you have a known shape for `formData`
}
// API to create a new form configuration
formRoute.post(
	"/form-config",
	async ({ body }: { body: CreateFormConfigBody }) => {
		const { courseId, formData } = body;

		const latestVersion = await prisma.formConfig.findFirst({
			where: { courseId: courseId },
			orderBy: { version: "desc" },
		});

		const newVersion = latestVersion ? latestVersion.version + 1 : 1;

		const newFormConfig = await prisma.formConfig.create({
			data: {
				courseId: courseId,
				version: newVersion,
				formData,
			},
		});

		return newFormConfig;
	}
);
interface SubmitData {
	formConfigId: number;
	courseId: number;
	submittedData: any;
}
// API to submit a form
formRoute.post("/form-submission", async ({ body }: { body: SubmitData }) => {
	const { formConfigId, courseId, submittedData } = body;

	const submission = await prisma.formSubmission.create({
		data: {
			formConfigId,
			courseId,
			submittedData,
		},
	});

	return submission;
});
interface Course {
	id: number;
	courseCode: string;
	courseName: string;
	major: string;
}

formRoute.post("/create-course", async ({ body }: { body: Course }) => {
	const { courseCode, courseName, major } = body;

	// Create the course record in the database
	// const newCourse = await prisma.course.create({
	// 	data: {
	// 		id, // If id is auto-incremented, you can omit this field
	// 		courseCode,
	// 		courseName,
	// 		major,
	// 	},
	// });
	const newCourse = await prisma.course.create({
		data: {
			courseCode,
			courseName,
			major,
		},
	});
	return newCourse;
});

// Start the server
formRoute.listen(4000, () => {
	console.log("Server is running at http://localhost:4000");
});
