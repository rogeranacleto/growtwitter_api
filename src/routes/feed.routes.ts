import express from "express";
import { authMiddleware } from "../middlewares/index";
import { makeFeedController } from "../factories/index";
import { JwtAdapter } from "../adapters/index";
export class FeedRoutes {
    public static bind(jwtAdapter: JwtAdapter) {
        const router = express.Router();
        const feedController = makeFeedController();

        router.get(
            "/feed",
            authMiddleware(jwtAdapter),
            feedController.findFeed.bind(feedController)
        );

        return router;
    }
}