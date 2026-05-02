import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes,
  TweetRoutes
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
    TweetRoutes.bind()
  ],
  Number(envs.PORT)
);

app.listen();