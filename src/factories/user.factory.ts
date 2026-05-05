import prisma from "../database/prisma";
import { UserController } from "../controllers/index";
import { UserService } from "../services/index";
import { UserRepository } from "../repositories/index";

export function makeUserController(){
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    return userController;
}