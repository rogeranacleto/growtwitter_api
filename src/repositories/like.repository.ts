import { PrismaClient } from "@prisma/client";

export class LikeRepository {
    constructor(private prisma: PrismaClient) { }

    public async likeTweet(userId: string, tweetId: string) {
        return this.prisma.like.create({
            data: {
                userId,
                tweetId,
            },
        });
    }

    public async unlikeTweet(userId: string, tweetId: string) {
        return this.prisma.like.delete({
            where: {
                userId_tweetId: {
                    userId,
                    tweetId,
                },
            },
        });
    }

    public async findLike(userId: string, tweetId: string) {
        return this.prisma.like.findUnique({
            where: {
                userId_tweetId: {
                    userId,
                    tweetId,
                },
            },
        });
    }
}