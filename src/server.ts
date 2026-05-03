import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  TweetRoutes,
  LikeRoutes
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
    TweetRoutes.bind(),
    LikeRoutes.bind()
  ],
  Number(envs.PORT)
);

app.listen();