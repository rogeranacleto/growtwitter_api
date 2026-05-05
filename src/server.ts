import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  TweetRoutes,
  LikeRoutes,
  FollowRoutes,
  UserRoutes,
  FeedRoutes
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
    TweetRoutes.bind(),
    LikeRoutes.bind(),
    FollowRoutes.bind(),
    UserRoutes.bind(),
    FeedRoutes.bind()
  ],
  Number(envs.PORT)
);

app.listen();