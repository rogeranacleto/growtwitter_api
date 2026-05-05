import { Request, Response, NextFunction } from "express";
import { HTTPError, onError } from "../utils";
import { JwtAdapter } from "../adapters";

interface DecodedToken {
  id: string;
  name: string;
  username: string;
}

export function authMiddleware(jwtAdapter: JwtAdapter) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new HTTPError(401, "Token não fornecido.");
      }

      const [, token] = authHeader.split(" ");

      if (!token) {
        throw new HTTPError(401, "Token não encontrado.");
      }

      const decoded = jwtAdapter.verifyToken(token) as DecodedToken;

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

}