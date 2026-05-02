import { Request, Response } from "express";
import { AuthService } from "../services/index";
import { onError } from "../utils/index";

export class AuthController {
  constructor(private authService: AuthService) { }

  public async register(req: Request, res: Response) {
    try {
      const { name, email, password, username } = req.body;

      const user = await this.authService.register({
        name,
        email,
        password,
        username,
      });

      return res.status(201).json({
        ok: true,
        message: "Usuario criado com sucesso!",
        data: user,
      });
    } catch (error) {
      return onError(error, res);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      return res.status(200).json({
        ok: true,
        message: "Login realizado com sucesso!",
        data: result,
      });
    } catch (error) {
      return onError(error, res);
    }
  }
}
