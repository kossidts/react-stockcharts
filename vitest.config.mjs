import { fileURLToPath } from "node:url";
import path from "node:path";

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// const __dirname = fileURLToPath(path.dirname(import.meta.url));

export default defineConfig({
	test: {
		environment: "jsdom",
		// setupFiles: ["./tests/setup.ts"],
		// testMatch: ["./tests/**/*.test.tsx"],
		// globals: true,
	},
	resolve: {
		alias: {
			"@/react-stockcharts": path.resolve(import.meta.dirname, "./src"),
			// "@/react-stockcharts": path.resolve(__dirname, "./src"),
			// "react-stockcharts": import.meta.resolve("./src"),
		},
	},

	plugins: [
		react({
			babel: {
				configFile: true,
			},
		}),
	],
});
