import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { authSecret } from "./routers/authRouters";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send("Unauthorized");
  const token = authorization.split(" ")[1];
  try {
    jwt.verify(token, authSecret);
    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
}
