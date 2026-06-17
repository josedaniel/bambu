import { expect, test } from "vite-plus/test";
import { BaseButton } from "../src/index.ts";

test("exports BaseButton", () => {
  expect(BaseButton).toBeDefined();
});
