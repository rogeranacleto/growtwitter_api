import prisma from "../database/prisma";
import { UserRepository } from "../repositories/index";
import { AuthService } from "../services/index";
import { AuthController } from "../controllers/index";

export function makeAuthController(){
    const userRepository = new UserRepository(prisma);
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    return authController;
}