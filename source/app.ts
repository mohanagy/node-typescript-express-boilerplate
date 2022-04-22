import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import compression from "compression";
import { helpers, messages } from "@utils";
import routes from "@routes";

const app = express();
app.use(compression());
app.use(cookieParser());

app.use((_request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", "*");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
	response.setHeader(
		"Access-Control-Allow-Headers",
		"Access-Control-Allow-Headers, Origin,Accept, Content-Type, Authorization, Access-Control-Request-Headers",
	);
	next();
});
app.use(morgan("dev"));
app.use(
	express.json({
		limit: "100mb",
	}),
);

app.use("/", routes);

// catch 404
app.use((_req, res) => {
	return helpers.httpResponse.notFound(res, messages.responseMessages.notFound().value);
});
const errorHandler: ErrorRequestHandler = async (error, request, response, _next) => {
	const transaction = request.app.get("transaction");
	if (transaction && !["rollback", "commit"].includes(transaction.finished)) {
		await transaction.rollback();
		app.set("transaction", undefined);
	}

	const errorStatus = error.status || error.value ? 400 : 500;
	response.status(errorStatus);
	// TODO: if error status is 500 , send email to the developer or to the admin
	return response.json({
		message: helpers.errorMessageGenerator(error),
	});
};
// error handler
app.use(errorHandler);

export default app;
