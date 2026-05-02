import express from "express";
import { body } from "express-validator";
import { dataValidation, authMiddleware } from "../middlewares/index";
import { makeTweetController } from "../factories/index";

export class TweetRoutes {
    public static bind() {
        const router = express.Router();
        const tweetController = makeTweetController();

        router.post(
            "/tweets",
            authMiddleware,
            dataValidation([
                body("content")
                    .isString().withMessage("Conteúdo deve ser texto.")
                    .isLength({ min: 1, max: 200 })
                    .withMessage("Conteudo deve ter entre 1 e 200 caracteres."),
            ]),
            tweetController.createTweet.bind(tweetController)
        );

        return router;
    }
}