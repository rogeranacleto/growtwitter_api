import express from "express";
import { authMiddleware, dataValidation } from "../middlewares/index";
import { makeUserController } from "../factories/index";
import { param } from "express-validator";

export class UserRoutes {
    public static bind() {
        const router = express.Router();
        const userController = makeUserController();

        router.get(
            "/users/:id",
            authMiddleware,
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