import { UserRepository } from "../repositories/index";
import { HTTPError } from "../utils/index";

export class UserService {
    constructor(private userRepository: UserRepository) { }

    public async findUserByIdWithRelations(userId: string) {
        const user = await this.userRepository.findUserByIdWithRelations(userId);

        if (!user) {
          throw new HTTPError(404, "Usuário não encontrado");
        }

        const { password, ...userWithoutPassword } = user;

        return {
            ...userWithoutPassword,
        
            tweets: userWithoutPassword.tweets.map(tweet => ({
                id: tweet.id,
                content: tweet.content,
                userId: tweet.userId,
                parentTweetId: tweet.parentTweetId,
                createdAt: tweet.createdAt,
                updatedAt: tweet.updatedAt,
                likesCount: tweet._count.likes,
            })),
        };
    }
}