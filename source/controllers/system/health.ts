import { General } from "@types";
import { httpResponse } from "@helpers";

export const checkHealth: General.ControllerI =  (_request, response) => {
	return httpResponse.ok(response, "Pong!");
};
