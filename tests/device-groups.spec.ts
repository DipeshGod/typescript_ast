import test from "@playwright/test";

test("should create a bug report", async ({ request }) => {
  const response = await request.post(`/configapi/DeviceGroups`, {
    data: {
      name: "testgroup1",
      description: "this is description",
    },
  });

  const data = await response.json();

  console.log(data);
});
