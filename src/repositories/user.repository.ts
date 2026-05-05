import { PrismaClient } from "@prisma/client";

export class UserRepository {
    constructor(private prisma: PrismaClient) { }

    public async findUserByIdWithRelations(userId: string) {
        return this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                tweets: {
                    include: {
                        _count: {
                            select: {
                                likes: true
                            },
                        },
                    },
                },
                followers: {
                    select: {
                        followerId: true,
                        follower: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                            }
                        }
                    }
                }
            },
        });
    }
}