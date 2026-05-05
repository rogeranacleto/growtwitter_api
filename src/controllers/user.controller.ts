import { Request, Response } from "express";
import { UserService } from "../services/index";
import { onError } from "../utils/index";

export class UserController {
    constructor(private userService: UserService) { }

    public async findUserByIdWithRelations(req: Request, res: Response) {
        try {
            const id = req.params.id as string;

            const user = await this.userService.findUserByIdWithRelations(id);

            return res.status(200).json({
                ok: true,
                message: "Usuário encontrado com sucesso!",
                data: user,
            });
            
        } catch (error) {
            return onError(error, res);
        }
    }
}