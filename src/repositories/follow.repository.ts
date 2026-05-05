import { PrismaClient } from "@prisma/client";

export class FollowRepository {
    constructor(private prisma: PrismaClient) { }

    public async followUser(followerId: string, followingId: string) {
        return this.prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });
    }

    public async unfollowUser(followerId: string, followingId: string) {
        return this.prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });
    }

    public async findFollow(followerId: string, followingId: string) {
        return this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });
    }

    public async findFollowingIds(userId: string) {
        return this.prisma.follow.findMany({
            where: {
                followerId: userId,
            },
            select: {
                followingId: true,
            },
        });

    }
}