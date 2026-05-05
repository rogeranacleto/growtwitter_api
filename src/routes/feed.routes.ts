import express from "express";
import { authMiddleware } from "../middlewares/index";
import { makeFeedController } from "../factories/index";

export class FeedRoutes {
    public static bind() {
        const router = express.Router();
        const feedController = makeFeedController();

        router.get(
            "/feed",
            authMiddleware,
            feedController.findFeed.bind(feedController)
        );

        return router;
    }
}