import { NextFunction, Request, Response } from "express";

export type MiddlewareI = (
  request: Request,
  response: Response,
  _next: NextFunction,
) => Promise<Response | void>;

export type ControllerI = (
  request: Request,
  response: Response,
) => Promise<Response | void> | Response | void;
