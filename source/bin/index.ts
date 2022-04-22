#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Module dependencies.
 */

import debug from "debug";
import http from "http";
import https from "https";
import { cpus } from "os";
import cluster from "cluster";
import app from "../app";
 
debug("node-typescript-express-boilerplate:server");

/**
  * Normalize a port into a number, string, or false.
  */
 
const normalizePort = (val: string): number | string | boolean => {
	// eslint-disable-next-line radix
	const serverPort = parseInt(val, 10);
	if (Number.isNaN(serverPort)) {
		// named pipe
		return val;
	}
	if (serverPort >= 0) {
		// port number
		return serverPort;
	}
	return false;
};
 
/**
  * Get port from environment and store in Express.
  */
 
const port = normalizePort("3000");
 
/**
 * 
 * @param error //TODO: add error type
 */
const onError = (error:any): void => {
	if (error.syscall !== "listen") throw error;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			//TODO: add logger EACCES
			throw new Error();
		case "EADDRINUSE":
			//TODO: add logger EADDRINUSE
			throw new Error();
		default:
			throw error;
	}
};
/**
  * Event listener for HTTP server "listening" event.
  */
const onListening = (): void => {
	const addr = {
		port,
	};
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	debug(`Listening on ${bind}`);
	//TODO: add logger
};


if (cluster.isPrimary) {
	for (let index = 0; index < cpus().length; index += 1) {
		cluster.fork();
	}
} else {
	const server = process.env.NODE_ENV === "production" ? https.createServer({}, app) : http.createServer(app);
	//TODO: add logger
	console.log(`${process.env.NODE_ENV} server is running on port ${port}`);
	server.listen(port);
	server.on("error", onError);
	server.on("listening", onListening);
}