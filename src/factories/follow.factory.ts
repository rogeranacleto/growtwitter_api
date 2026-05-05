import prisma from "../database/prisma";
import { FollowRepository } from "../repositories/index";
import { UserRepository } from "../repositories/index";
import { FollowService } from "../services/index";
import { FollowController } from "../controllers/index";

export function makeFollowController(){
    const followRepository = new FollowRepository(prisma);
    const userRepository = new UserRepository(prisma);
    const followService = new FollowService(followRepository, userRepository);
    const followController = new FollowController(followService);

    return followController;
}