type SuccessResponse = {
	ok: true;
	cmuAccount: string;
	firstName: string;
	lastName: string;
	studentId?: string;
};

type ErrorResponse = {
	ok: false;
	message: string;
};

type WhoAmIResponse = SuccessResponse | ErrorResponse;
