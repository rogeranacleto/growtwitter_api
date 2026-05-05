import jwt from "jsonwebtoken";
import { envs } from "../envs";

export class JwtAdapter {
  public generateToken(id: string, name: string, username: string) {
    return jwt.sign({ id, name, username }, envs.SECRET_KEY, {
      expiresIn: "1d",
    });
  }

  public verifyToken(token: string) {
    return jwt.verify(token, envs.SECRET_KEY);
  }
}