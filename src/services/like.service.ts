import { LikeRepository } from "../repositories/index";
import { TweetRepository } from "../repositories/index";
import { HTTPError } from "../utils/index";

export class LikeService {
    constructor(private likeRepository: LikeRepository, private tweetRepository: TweetRepository) { }

    public async likeTweet(userId: string, tweetId: string) {
        const tweetExists = await this.tweetRepository.findTweetById(tweetId);

        if (!tweetExists) {
            throw new HTTPError(404, "Tweet não encontrado");
        }

        const alreadyLiked = await this.likeRepository.findLike(userId, tweetId);

        if (alreadyLiked) {
            throw new HTTPError(409, "Você já curtiu este tweet");
        }

        return this.likeRepository.likeTweet(userId, tweetId);
    }

    public async unlikeTweet(userId: string, tweetId: string) {
        const tweetExists = await this.tweetRepository.findTweetById(tweetId);

        if (!tweetExists) {
            throw new HTTPError(404, "Tweet não encontrado");
        }

        const likeExists = await this.likeRepository.findLike(userId, tweetId);

        if (!likeExists) {
            throw new HTTPError(404, "Like não encontrado");
        }

        return this.likeRepository.unlikeTweet(userId, tweetId);
    }
}