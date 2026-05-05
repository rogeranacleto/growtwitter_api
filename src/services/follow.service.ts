import { FollowRepository } from "../repositories/index";
import { UserRepository } from "../repositories/index";
import { HTTPError } from "../utils/http.error";

export class FollowService {
    constructor(private followRepository: FollowRepository, private userRepository: UserRepository) { }

    public async followUser(followerId: string, followingId: string) {
        if (followerId === followingId) {
            throw new HTTPError(400, "Você não pode seguir a si mesmo");
        }

        const userExists = await this.userRepository.findById(followingId);

        if (!userExists) {
            throw new HTTPError(404, "Usuário não encontrado");
        }

        const alreadyFollowing = await this.followRepository.findFollow(followerId, followingId);

        if (alreadyFollowing) {
            throw new HTTPError(409, "Você já segue este usuário");
        }

        return this.followRepository.followUser(followerId, followingId);
    }

    public async unfollowUser(followerId: string, followingId: string) {
        const followExists = await this.followRepository.findFollow(followerId, followingId);

        if (!followExists) {
            throw new HTTPError(404, "Você não segue este usuário");
        }

        return this.followRepository.unfollowUser(followerId, followingId);
    }
}