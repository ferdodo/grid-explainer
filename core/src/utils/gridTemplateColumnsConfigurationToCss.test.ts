import { describe, it, expect } from "vitest";
import { gridTemplateColumnsConfigurationToCss } from "./gridTemplateColumnsConfigurationToCss";
import type { GridTemplateColumnsConfiguration } from "../types";

describe("gridTemplateColumnsConfigurationToCss", () => {
	it("should return empty string for empty configuration", () => {
		const config: GridTemplateColumnsConfiguration = {};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("");
	});

	it("should convert single value", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [{ value: 1, unit: "fr" }],
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("1fr");
	});

	it("should convert multiple values", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [
				{ value: 1, unit: "fr" },
				{ value: 2, unit: "fr" },
				{ value: 1, unit: "fr" },
			],
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("1fr 2fr 1fr");
	});

	it("should convert values with different units", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [
				{ value: 100, unit: "px" },
				{ unit: "auto" },
				{ value: 1, unit: "fr" },
			],
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("100px auto 1fr");
	});

	it("should convert repeat with number", () => {
		const config: GridTemplateColumnsConfiguration = {
			repeat: {
				count: 3,
				value: { value: 1, unit: "fr" },
			},
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("repeat(3, 1fr)");
	});

	it("should convert repeat with auto-fit", () => {
		const config: GridTemplateColumnsConfiguration = {
			repeat: {
				count: "auto-fit",
				value: { value: 100, unit: "px" },
			},
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("repeat(auto-fit, 100px)");
	});

	it("should convert repeat with auto-fill", () => {
		const config: GridTemplateColumnsConfiguration = {
			repeat: {
				count: "auto-fill",
				value: { value: 1, unit: "fr" },
			},
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("repeat(auto-fill, 1fr)");
	});

	it("should convert repeat with minmax", () => {
		const config: GridTemplateColumnsConfiguration = {
			repeat: {
				count: 3,
				value: {
					min: { value: 100, unit: "px" },
					max: { value: 1, unit: "fr" },
				},
			},
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("repeat(3, minmax(100px, 1fr))");
	});

	it("should convert repeat with auto", () => {
		const config: GridTemplateColumnsConfiguration = {
			repeat: {
				count: 2,
				value: { unit: "auto" },
			},
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("repeat(2, auto)");
	});

	it("should prioritize repeat over values", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [{ value: 1, unit: "fr" }],
			repeat: {
				count: 3,
				value: { value: 1, unit: "fr" },
			},
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("repeat(3, 1fr)");
	});

	it("should convert values with min-content", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [{ unit: "min-content" }, { value: 1, unit: "fr" }],
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("min-content 1fr");
	});

	it("should convert values with max-content", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [{ value: 1, unit: "fr" }, { unit: "max-content" }],
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("1fr max-content");
	});

	it("should convert values with minmax", () => {
		const config: GridTemplateColumnsConfiguration = {
			values: [
				{
					min: { value: 100, unit: "px" },
					max: { value: 1, unit: "fr" },
				},
				{ value: 2, unit: "fr" },
			],
		};
		const result = gridTemplateColumnsConfigurationToCss(config);
		expect(result).toBe("minmax(100px, 1fr) 2fr");
	});
});
