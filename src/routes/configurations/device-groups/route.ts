import { Router } from "express";
import { createDeviceGroup } from "./create-device-group/api";

const router = Router();

router.post("/", createDeviceGroup);

export { router as deviceGroupRouter };
