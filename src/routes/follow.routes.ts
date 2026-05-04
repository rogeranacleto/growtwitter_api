import express from "express";
import { dataValidation } from "../middlewares";
import { param } from "express-validator";
import { authMiddleware } from "../middlewares/index";
import { makeFollowController } from "../factories/index";

export class FollowRoutes {
    public static bind() {
        const router = express.Router();
        const followController = makeFollowController();

        router.post(
            "/users/:id/follow",
            authMiddleware,
            dataValidation([
                param("id")
                    .isUUID()
                    .withMessage("ID do usuario deve ser válido."),
                ]),
            followController.followUser.bind(followController)
        );

        router.delete(
            "/users/:id/follow",
            authMiddleware,
            dataValidation([
                param("id")
                    .isUUID()
                    .withMessage("ID do usuario deve ser válido."),
            ]),
            followController.unfollowUser.bind(followController)
        );

        return router;
    }
}