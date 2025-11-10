import { describe, it, expect } from "vitest";
import { gridTemplateRowsConfigurationToCss } from "./gridTemplateRowsConfigurationToCss";
import type { GridTemplateRowsConfiguration } from "../types";

describe("gridTemplateRowsConfigurationToCss", () => {
	it("should return empty string for empty configuration", () => {
		const config: GridTemplateRowsConfiguration = {};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("");
	});

	it("should convert single value", () => {
		const config: GridTemplateRowsConfiguration = {
			values: [{ unit: "auto" }],
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("auto");
	});

	it("should convert multiple values", () => {
		const config: GridTemplateRowsConfiguration = {
			values: [{ unit: "auto" }, { value: 1, unit: "fr" }, { unit: "auto" }],
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("auto 1fr auto");
	});

	it("should convert values with different units", () => {
		const config: GridTemplateRowsConfiguration = {
			values: [
				{ value: 100, unit: "px" },
				{ value: 1, unit: "fr" },
				{ value: 50, unit: "%" },
			],
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("100px 1fr 50%");
	});

	it("should convert repeat with number", () => {
		const config: GridTemplateRowsConfiguration = {
			repeat: {
				count: 2,
				value: { value: 100, unit: "px" },
			},
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("repeat(2, 100px)");
	});

	it("should convert repeat with auto-fit", () => {
		const config: GridTemplateRowsConfiguration = {
			repeat: {
				count: "auto-fit",
				value: { value: 1, unit: "fr" },
			},
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("repeat(auto-fit, 1fr)");
	});

	it("should convert repeat with auto-fill", () => {
		const config: GridTemplateRowsConfiguration = {
			repeat: {
				count: "auto-fill",
				value: { value: 50, unit: "px" },
			},
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("repeat(auto-fill, 50px)");
	});

	it("should convert repeat with minmax", () => {
		const config: GridTemplateRowsConfiguration = {
			repeat: {
				count: 3,
				value: {
					min: { value: 50, unit: "px" },
					max: { unit: "auto" },
				},
			},
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("repeat(3, minmax(50px, auto))");
	});

	it("should convert repeat with min-content", () => {
		const config: GridTemplateRowsConfiguration = {
			repeat: {
				count: 2,
				value: { unit: "min-content" },
			},
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("repeat(2, min-content)");
	});

	it("should prioritize repeat over values", () => {
		const config: GridTemplateRowsConfiguration = {
			values: [{ unit: "auto" }],
			repeat: {
				count: 2,
				value: { value: 100, unit: "px" },
			},
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("repeat(2, 100px)");
	});

	it("should convert values with max-content", () => {
		const config: GridTemplateRowsConfiguration = {
			values: [{ unit: "max-content" }, { value: 1, unit: "fr" }],
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("max-content 1fr");
	});

	it("should convert values with minmax", () => {
		const config: GridTemplateRowsConfiguration = {
			values: [
				{
					min: { value: 100, unit: "px" },
					max: { value: 1, unit: "fr" },
				},
				{ unit: "auto" },
			],
		};
		const result = gridTemplateRowsConfigurationToCss(config);
		expect(result).toBe("minmax(100px, 1fr) auto");
	});
});
