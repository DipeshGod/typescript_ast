import { Router } from "express";
import {
  createDeviceGroup,
  getCreateDeviceGroupJsonSchema,
} from "./create-device-group/api";

const router = Router();

router.post("/", createDeviceGroup);
router.get("/json-schema", getCreateDeviceGroupJsonSchema);

export { router as deviceGroupRouter };
