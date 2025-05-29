import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { deviceGroupRouter } from "./routes/configurations/device-groups/route";
import "./services/zookeeper";
import registeredRoutes from "../registered-routes.json";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/configapi/DeviceGroups", deviceGroupRouter);

app.get("/registered-routes", (req: Request, res: Response) => {
  res.status(200).json(registeredRoutes);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
