import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { deviceGroupRouter } from "./routes/configurations/device-groups/route";
import { client } from "./logpoint/client";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/configapi/DeviceGroups", deviceGroupRouter);

app.get("/", (req: Request, res: Response) => {
  client.SayHello({ name: "Director" }, (error: any, response: any) => {
    if (error) console.error(error);
    else res.send(response.message);
  });
});

console.log();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
