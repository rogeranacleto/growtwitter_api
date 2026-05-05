import express from "express";
import { body, param } from "express-validator";
import { dataValidation, authMiddleware } from "../middlewares/index";
import { makeTweetController } from "../factories/index";
import { JwtAdapter } from "../adapters/index";

export class TweetRoutes {
    public static bind(jwtAdapter: JwtAdapter) {
        const router = express.Router();
        const tweetController = makeTweetController();

        router.post(
            "/tweets",
            authMiddleware(jwtAdapter),
            dataValidation([
                body("content")
                    .isString().withMessage("Conteúdo deve ser texto.")
                    .isLength({ min: 1, max: 200 })
                    .withMessage("Conteúdo deve ter entre 1 e 200 caracteres."),
            ]),
            tweetController.createTweet.bind(tweetController)
        );

        router.post(
            "/tweets/:id/reply",
            authMiddleware(jwtAdapter),
            dataValidation([
                param("id")
                    .isUUID()
                    .withMessage("ID do tweet deve ser válido."),
                body("content")
                    .isString().withMessage("Conteúdo deve ser texto.")
                    .isLength({ min: 1, max: 200 })
                    .withMessage("Conteúdo deve ter entre 1 e 200 caracteres."),
            ]),
            tweetController.replyTweet.bind(tweetController)
        );

        return router;
    }
}