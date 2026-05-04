import { Request, Response } from "express";
import { FollowService } from "../services/index";
import { onError } from "../utils/index";

export class FollowController {
    constructor(private followService: FollowService) { }

    public async followUser(req: Request, res: Response) {
        try {
            const followerId = req.user.id
            const followingId = req.params.id as string

            await this.followService.followUser(followerId, followingId);

            return res.status(201).json({
                ok: true,
                message: "Usuário seguido com sucesso!",
            });
        } catch (error) {
            return onError(error, res);
        }
    }

    public async unfollowUser(req: Request, res: Response) {
        try {
            const followerId = req.user.id
            const followingId = req.params.id as string

            await this.followService.unfollowUser(followerId, followingId);

            return res.status(200).json({
                ok: true,
                message: "Deixou de seguir o usuário com sucesso!",
            });
        } catch (error) {
            return onError(error, res);
        }
    }
}