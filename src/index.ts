import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { deviceGroupRouter } from "./routes/configurations/device-groups/route";
import "./services/zookeeper";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/configapi/DeviceGroups", deviceGroupRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
