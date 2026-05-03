import express from "express";
import { makeLikeController } from "../factories/index";
import { authMiddleware, dataValidation } from "../middlewares/index";
import { param } from "express-validator";

export class LikeRoutes {
    public static bind() {
        const router = express.Router();
        const likeController = makeLikeController();

        router.post(
            "/tweets/:id/like",
            authMiddleware,
            dataValidation([
                param("id")
                    .isUUID()
                    .withMessage("ID do tweet deve ser válido."),
            ]),
            likeController.likeTweet.bind(likeController)
        );

        router.delete(
            "/tweets/:id/like",
            authMiddleware,
            dataValidation([
                param("id")
                    .isUUID()
                    .withMessage("ID do tweet deve ser válido."),
            ]),
            likeController.unlikeTweet.bind(likeController)
        );

        return router;
    }
}