import { describe, it, expect } from "vitest";
import { validate } from "./api";

// Mocked request body samples
const validBody = {
  description: "Test device group",
  name: "DeviceGroup1",
  devices: ["device1", "device2"],
};

const missingDescription = {
  name: "DeviceGroup1",
  devices: ["device1"],
};

const emptyName = {
  description: "Test device group",
  name: "",
  devices: ["device1"],
};

describe("validate function", () => {
  it("should validate a correct request body", async () => {
    const result = await validate("7.8.0", validBody);
    expect(result).toEqual(validBody);
  });

  it("should return an error when description is missing", async () => {
    await expect(validate("7.8.0", missingDescription)).rejects.toThrow();
  });

  it("should return an error when name is empty", async () => {
    await expect(validate("7.8.0", emptyName)).rejects.toThrow();
  });

  it("should provide default value for devices when omitted (version 7.8.0)", async () => {
    const body = { description: "Test", name: "Group1" };
    const result = await validate("7.8.0", body);
    expect(result).toEqual({ ...body, devices: [] });
  });

  it("should validate correctly for latest version without adding defaults", async () => {
    const body = { description: "Test", name: "Group1" };
    const result = await validate("latest", body);
    expect(result).toEqual(body);
  });
});
