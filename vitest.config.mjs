import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";

export default defineConfig({
	test: {
		environment: "jsdom",
		// setupFiles: ["./tests/setup.ts"],
		// testMatch: ["./tests/**/*.test.tsx"],
		// globals: true,
	},

	plugins: [
		react({
			babel: {
				configFile: true,
			},
		}),
	],
	resolve: {
		alias: {
			"react-stockcharts": fileURLToPath(new URL("./src", import.meta.url)),
			"@/react-stockcharts": fileURLToPath(new URL("./src", import.meta.url)),
			"@/": fileURLToPath(new URL("./src/", import.meta.url)),
			// "@/react-stockcharts": path.resolve(import.meta.dirname, "./src"),
			// "@/react-stockcharts": path.resolve(__dirname, "./src"),
			// "react-stockcharts": import.meta.resolve("./src"),
		},
	},
});
