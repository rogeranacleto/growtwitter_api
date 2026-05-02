import prisma from "../database/prisma";
import { TweetRepository } from "../repositories/index";
import { TweetService } from "../services/index";
import { TweetController } from "../controllers/index";

export function makeTweetController(){
    const tweetRepository = new TweetRepository(prisma);
    const tweetService = new TweetService(tweetRepository);
    const tweetController = new TweetController(tweetService);

    return tweetController;
}