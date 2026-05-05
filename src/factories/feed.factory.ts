import prisma from "../database/prisma";
import { FeedController } from "../controllers/index";
import { FeedService } from "../services/index";
import { TweetRepository, FollowRepository } from "../repositories/index";

export function makeFeedController() {
    const tweetRepository = new TweetRepository(prisma);
    const followRepository = new FollowRepository(prisma);
    const feedService = new FeedService(tweetRepository, followRepository);
    const feedController = new FeedController(feedService);

    return feedController;
}