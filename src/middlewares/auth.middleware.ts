import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from "../adapters/index";
import { HTTPError, onError } from "../utils";

interface DecodedToken {
  id: string;
  name: string;
  username: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new HTTPError(401, "Token não fornecido.");
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      throw new HTTPError(401, "Token não encontrado.");
    }

    const decoded = JwtAdapter.verifyToken(token) as DecodedToken;

    req.user = {
      id: decoded.id,
      name: decoded.name,
      username: decoded.username,
    };

    return next();

  } catch (error) {
    if(error instanceof HTTPError){
      return onError(error, res);
    }
    return onError(new HTTPError(401, "Token inválido ou expirado."), res);
  }
}
