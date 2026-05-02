import prisma from "../database/prisma";
import { AuthRepository } from "../repositories";
import { AuthService } from "../services";
import { AuthController } from "../controllers";

export function makeAuthController(){
    const authRepository = new AuthRepository(prisma);
    const authService = new AuthService(authRepository);
    const authController = new AuthController(authService);

    return authController
}