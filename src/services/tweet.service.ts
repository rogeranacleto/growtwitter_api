import { TweetRepository } from "../repositories/index";
import { CreateTweetDto } from "../dtos/index";
import { HTTPError } from "../utils/index";
export class TweetService {
    constructor(private tweetRepository: TweetRepository) { }

    public async createTweet(data: CreateTweetDto) {

        if (!data.content || data.content.trim() === "") {
            throw new HTTPError(400, "Conteúdo do tweet é obrigatório");
        }

        return this.tweetRepository.createTweet({
            content: data.content,
            userId: data.userId,
        });
    }
}
