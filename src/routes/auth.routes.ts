import express from "express";
import { body } from "express-validator";
import { dataValidation } from "../middlewares/index";
import { makeAuthController } from "../factories/index";

export class AuthRoutes {
    public static bind() {
        const router = express.Router();
        const authController = makeAuthController();
        router.post(
            "/register",
            dataValidation([
                body("name")
                .isString()
                .withMessage("Nome deve ser um texto.").bail()
                .isLength({ min: 1 }).withMessage("Nome é obrigatório."),
                body("username")
                .isString().withMessage("Username deve ser um texto.").bail()
                .notEmpty().withMessage("Username é obrigatório."),
                body("email")
                .isEmail().withMessage("E-mail inválido.")
                .notEmpty().withMessage("E-mail é obrigatório."),
                body("password")
                .isString().withMessage("Senha deve ser um texto.").bail()
                .isLength({ min: 6 }).withMessage("Senha deve ter no mínimo 6 caracteres."),
            ]),
            authController.register.bind(authController)
        );

        router.post(
            "/login",
            dataValidation([
                body("email")
                .isEmail()
                .withMessage("E-mail inválido.")
                .notEmpty()
                .withMessage("E-mail é obrigatório."),
                body("password")
                .isString()
                .withMessage("Senha é obrigatória.")
                .bail()
                .isLength({ min: 1 })
                .withMessage("Senha é obrigatória."),
            ]),
            authController.login.bind(authController)
        );

    return router;
  }
}
