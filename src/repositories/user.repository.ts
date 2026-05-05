import { PrismaClient } from "@prisma/client";
interface CreateUserParams {
    name: string;
    username: string;
    email: string;
    password: string;
    profileImage?: string;
}
export class UserRepository {
    constructor(private prisma: PrismaClient) { }

    public async createUser(data: CreateUserParams) {
        return this.prisma.user.create({ data });
    }
    
    public async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    public async findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    
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