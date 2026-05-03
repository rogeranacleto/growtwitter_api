import prisma from "../database/prisma";
import { LikeRepository } from "../repositories/index";
import { TweetRepository } from "../repositories/index";
import { LikeService } from "../services/index";
import { LikeController } from "../controllers/index";

export function makeLikeController(){
    const likeRepository = new LikeRepository(prisma);
    const tweetRepository = new TweetRepository(prisma);
    const likeService = new LikeService(likeRepository, tweetRepository);
    const likeController = new LikeController(likeService);

    return likeController;
}