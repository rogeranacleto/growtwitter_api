import express from "express";
import { authMiddleware, dataValidation } from "../middlewares/index";
import { makeUserController } from "../factories/index";
import { param } from "express-validator";
import { JwtAdapter } from "../adapters/index";

export class UserRoutes {
    public static bind(jwtAdapter: JwtAdapter) {
        const router = express.Router();
        const userController = makeUserController();

        router.get(
            "/users/:id",
            authMiddleware(jwtAdapter),
            dataValidation([
                param("id")
                    .isUUID()
                    .withMessage("ID do usuário deve ser válido."),
            ]),
            userController.findUserByIdWithRelations.bind(userController)
        );

        return router;
    }
}