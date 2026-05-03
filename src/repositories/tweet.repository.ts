import { PrismaClient } from "@prisma/client";

interface CreateTweetParams {
  content: string;
  userId: string;
  parentTweetId?: string;
}

export class TweetRepository {
    constructor(private prisma: PrismaClient) { }

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

}