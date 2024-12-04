import { Elysia } from "elysia";

import { prisma } from "../../utils/prisma";
import { CreateFormConfigBody, SubmitData } from "../../types/Form";

export const formRoutes = (app: Elysia) => {
	app
		.get("/form-config/latest/:courseId", async ({ params }) => {
			const { courseId } = params;
			const latestFormConfig = await prisma.formConfig.findFirst({
				where: { courseId: parseInt(courseId) },
				orderBy: { version: "desc" },
			});
			return latestFormConfig || { message: "No form configuration found" };
		})
		.get("/form-config/:version/:courseId", async ({ params }) => {
			const { courseId, version } = params;
			const formConfig = await prisma.formConfig.findFirst({
				where: { courseId: parseInt(courseId), version: parseInt(version) },
			});
			return formConfig || { message: "No form configuration found" };
		})
		.post("/form-config", async ({ body }: { body: CreateFormConfigBody }) => {
			const { courseId, formData } = body;

			if (!courseId || typeof courseId !== "number") {
				return { error: "Invalid courseId. Must be a number." };
			}

			if (!formData || typeof formData !== "object") {
				return { error: "Invalid formData. Must be an object." };
			}

			try {
				const latestVersion = await prisma.formConfig.findFirst({
					where: { courseId },
					orderBy: { version: "desc" },
				});

				const newVersion = latestVersion ? latestVersion.version + 1 : 1;

				const newFormConfig = await prisma.formConfig.create({
					data: {
						courseId,
						version: newVersion,
						formData,
					},
				});

				return newFormConfig;
			} catch (error) {
				console.error("Error creating form configuration:", error);
				return { error: "Failed to create form configuration." };
			}
		})
		.post("/form-submission", async ({ body }: { body: SubmitData }) => {
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
};
