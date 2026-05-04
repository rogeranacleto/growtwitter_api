import prisma from "../database/prisma";
import { FollowRepository } from "../repositories/follow.repository";
import { AuthRepository } from "../repositories/auth.repository";
import { FollowService } from "../services/follow.service";
import { FollowController } from "../controllers/follow.controller";

export function makeFollowController(){
    const followRepository = new FollowRepository(prisma);
    const authRepository = new AuthRepository(prisma);
    const followService = new FollowService(followRepository, authRepository);
    const followController = new FollowController(followService);

    return followController;
}