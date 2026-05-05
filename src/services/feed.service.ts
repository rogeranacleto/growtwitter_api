import { TweetRepository, FollowRepository } from "../repositories/index";

export class FeedService {
    constructor(private tweetRepository: TweetRepository, private followRepository: FollowRepository) { }

    public async findFeed(userId: string) {
        const follows = await this.followRepository.findFollowingIds(userId);

        const followingIds = follows.map(follow => follow.followingId);

        const feedUserIds = [userId, ...followingIds];

        const tweets = await this.tweetRepository.findTweetsByUserIds(feedUserIds);

        return tweets.map(tweet => ({
            id: tweet.id,
            content: tweet.content,
            createdAt: tweet.createdAt,
            parentTweetId: tweet.parentTweetId,
            user: {
                id: tweet.user.id,
                name: tweet.user.name,
                username: tweet.user.username,
            },
            likesCount: tweet._count.likes,
        }));
    }
}