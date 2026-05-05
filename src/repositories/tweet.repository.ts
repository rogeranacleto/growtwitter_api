import { PrismaClient } from "@prisma/client";

interface CreateTweetParams {
  content: string;
  userId: string;
  parentTweetId?: string;
}

export class TweetRepository {
  constructor(private prisma: PrismaClient) {}

  public async createTweet(data: CreateTweetParams) {
    return this.prisma.tweet.create({
      data: {
        content: data.content,
        userId: data.userId,
        parentTweetId: data.parentTweetId ?? null,
      },
    });
  }

  public async findTweetById(id: string) {
    return this.prisma.tweet.findUnique({
      where: { id },
    });
  }

  public async findTweetsByUserIds(userIds: string[]) {
    return this.prisma.tweet.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  }
}
