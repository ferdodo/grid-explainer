import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@grid-explainer/core": path.resolve(__dirname, "./core/dist"),
			"@grid-explainer/design-system": path.resolve(
				__dirname,
				"./design-system/dist",
			),
		},
	},
});
