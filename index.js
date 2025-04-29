import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "./config/db.js";
import { env } from "./config/environment.js";
import todoRoutes from "./routes/todoRoutes.js";

const START_SERVER = () => {
  const app = express();
  const port = process.env.APP_PORT || 4000;

  app.use(express.json());

  app.use("/api/todos", todoRoutes);

  app.listen(port, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${port}`);
  });

  exitHook(() => {
    CLOSE_DB();
    console.log("Disconnected");
  });
};

CONNECT_DB()
  .then(() => console.log("Connected to MongoDB Cloud Atlas!"))
  .then(() => START_SERVER())
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
