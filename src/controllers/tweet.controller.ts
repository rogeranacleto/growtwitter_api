import { Request, Response } from "express";
import { TweetService } from "../services/index";
import { onError } from "../utils/index";

export class TweetController {
    constructor(private tweetService: TweetService) { }

    public async createTweet(req: Request, res: Response) {
        try {
            const { content } = req.body;
            const userId = req.user.id;

            const tweet = await this.tweetService.createTweet({ content, userId });

            return res.status(201).json({
                ok: true,
                message: "Tweet criado com sucesso!",
                data: tweet,
            });
        } catch (error) {
            return onError(error, res);
        }
    }
}
