
   
import { ErrnoException } from "@types";

export default (error: ErrnoException, statusCode?: number): string => {
	error.status = statusCode ? statusCode : error.status;
	return (
		(error?.errors && error.errors[0]?.message) ||
    error.message ||
    error.error?.details[0]?.message ||
    "Internal server"
	);
}; 