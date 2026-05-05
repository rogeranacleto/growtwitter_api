import { Request, Response } from "express";
import { FeedService } from "../services/index";
import { onError } from "../utils/index";

export class FeedController {
    constructor(private feedService: FeedService) { }

    public async findFeed(req: Request, res: Response) {
        try {
            const userId = req.user.id;

            const feed = await this.feedService.findFeed(userId);

            return res.status(200).json({
                ok: true,
                message: "Feed buscado com sucesso!",
                data: feed,
            });
        } catch (error) {
            return onError(error, res);
        }
    }
}