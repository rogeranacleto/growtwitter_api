import App from "./app";
import { envs } from "./envs";
import {
  AuthRoutes
} from "./routes";

const app = new App(
  [
    AuthRoutes.bind(),
  ],
  Number(envs.PORT)
);

app.listen();