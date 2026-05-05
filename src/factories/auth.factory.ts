import prisma from "../database/prisma";
import { UserRepository } from "../repositories/index";
import { JwtAdapter, BcryptAdapter } from "../adapters/index";
import { AuthService } from "../services/index";
import { AuthController } from "../controllers/index";

export function makeAuthController(){
    const userRepository = new UserRepository(prisma);
    const bcryptAdapter = new BcryptAdapter();
    const jwtAdapter = new JwtAdapter();
    const authService = new AuthService(userRepository, bcryptAdapter, jwtAdapter);
    const authController = new AuthController(authService);

    return authController;
}