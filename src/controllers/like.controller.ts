import { Request, Response } from "express";
import { LikeService } from "../services/index";
import { onError } from "../utils/index";

export class LikeController {
    constructor(private likeService: LikeService) { }

    public async likeTweet(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const tweetId = req.params.id as string;

            await this.likeService.likeTweet(userId, tweetId);

            return res.status(200).json({
                ok: true,
                message: "Tweet curtido com sucesso!",
            });
        } catch (error) {
            return onError(error, res);
        }
    }

    public async unlikeTweet(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const tweetId = req.params.id as string;

            await this.likeService.unlikeTweet(userId, tweetId);

            return res.status(200).json({
                ok: true,
                message: "Like removido com sucesso!",
            });
        } catch (error) {
            return onError(error, res);
        }
    }
}