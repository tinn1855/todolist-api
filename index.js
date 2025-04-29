import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "./config/db.js";
import { env } from "./config/environment.js";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

const START_SERVER = () => {
  const app = express();
  const port = env.APP_PORT || 4000;

  app.use(express.json());
  app.use(cors()); // Cho phép tất cả các domain

  app.use("/api/todos", todoRoutes);

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
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
