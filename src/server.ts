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
import { JwtAdapter } from "./adapters/index";

const jwtAdapter = new JwtAdapter();

const app = new App(
  [
    AuthRoutes.bind(),
    TweetRoutes.bind(jwtAdapter),
    LikeRoutes.bind(jwtAdapter),
    FollowRoutes.bind(jwtAdapter),
    UserRoutes.bind(jwtAdapter),
    FeedRoutes.bind(jwtAdapter),
  ],
  Number(envs.PORT),
);

app.listen();