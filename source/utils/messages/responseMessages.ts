const responseMessages = {
	notFound: () => ({
		status: 404,
		value: "Not Found",
	}),
	badRequest: (message: string) => ({
		status: 400,
		value: message,
	}),
	unauthorized: () => ({
		status: 401,
		value: "Unauthorized",
	}),
	forbidden: () => ({
		status: 403,
		value: "Forbidden",
	}),
	conflict: (message: string) => ({
		status: 409,
		value: message,
	}),
	internalServerError: () => ({
		status: 500,
		value: "Internal Server Error",
	}),
};

export default responseMessages;