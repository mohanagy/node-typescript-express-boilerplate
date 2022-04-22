import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status-codes";
import FailureResponse from "./FailureResponse";
import SuccessResponse from "./SuccessResponse";

export default {
	created: (response: Response, data: any, message: string): Response =>
		response.status(httpStatus.StatusCodes.CREATED).json(new SuccessResponse(data, message)),
	ok: (response: Response, data?: any, message?: string): Response =>
		response.status(httpStatus.StatusCodes.OK).json(new SuccessResponse(data, message)),
	badRequest: (response: Response, message: string): Response =>
		response.status(httpStatus.StatusCodes.BAD_REQUEST).json(new FailureResponse(message)),
	notFound: (response: Response, message: string): Response =>
		response.status(httpStatus.StatusCodes.NOT_FOUND).json(new FailureResponse(message)),
	unAuthorized: (response: Response, message: string): Response =>
		response.status(httpStatus.StatusCodes.UNAUTHORIZED).json(new FailureResponse(message)),
	conflict: (response: Response, message: string): Response =>
		response.status(httpStatus.StatusCodes.CONFLICT).json(new FailureResponse(message)),
	forbidden: (response: Response, message: string): Response =>
		response.status(httpStatus.StatusCodes.FORBIDDEN).json(new FailureResponse(message)),
	notAllowedMethod: (request: Request, response: Response, message: string): Response =>
		response
			.status(httpStatus.StatusCodes.METHOD_NOT_ALLOWED)
			.json(
				new FailureResponse(
					message || `The requested resource does not support http method '${request.method}'.'${request.path}'`,
				),
			),
	payLoadTooLarge: (response: Response, message: string): Response =>
		response
			.status(httpStatus.StatusCodes.REQUEST_TOO_LONG)
			.json(new FailureResponse(message || "Request payload too large.")),
	internalServerError: (next: NextFunction, error: Error): void => next(error),
};
