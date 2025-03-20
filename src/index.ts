import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { deviceGroupRouter } from "./routes/configurations/device-groups/route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/DeviceGroups",deviceGroupRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

