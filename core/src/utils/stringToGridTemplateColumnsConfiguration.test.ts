import { describe, it, expect } from "vitest";
import { stringToGridTemplateColumnsConfiguration } from "./stringToGridTemplateColumnsConfiguration";

describe("stringToGridTemplateColumnsConfiguration", () => {
	it("should return undefined for empty string", () => {
		const result = stringToGridTemplateColumnsConfiguration("");
		expect(result).toBeUndefined();
	});

	it("should return undefined for undefined", () => {
		const result = stringToGridTemplateColumnsConfiguration(undefined);
		expect(result).toBeUndefined();
	});

	it("should return undefined for whitespace only", () => {
		const result = stringToGridTemplateColumnsConfiguration("   ");
		expect(result).toBeUndefined();
	});

	it("should parse single value", () => {
		const result = stringToGridTemplateColumnsConfiguration("1fr");
		expect(result).toEqual({
			values: [{ value: 1, unit: "fr" }],
		});
	});

	it("should parse multiple values", () => {
		const result = stringToGridTemplateColumnsConfiguration("1fr 2fr 1fr");
		expect(result).toEqual({
			values: [
				{ value: 1, unit: "fr" },
				{ value: 2, unit: "fr" },
				{ value: 1, unit: "fr" },
			],
		});
	});

	it("should parse repeat with number", () => {
		const result = stringToGridTemplateColumnsConfiguration("repeat(3, 1fr)");
		expect(result).toEqual({
			repeat: {
				count: 3,
				value: { value: 1, unit: "fr" },
			},
		});
	});

	it("should parse repeat with auto-fit", () => {
		const result = stringToGridTemplateColumnsConfiguration(
			"repeat(auto-fit, 100px)",
		);
		expect(result).toEqual({
			repeat: {
				count: "auto-fit",
				value: { value: 100, unit: "px" },
			},
		});
	});

	it("should parse repeat with auto-fill", () => {
		const result = stringToGridTemplateColumnsConfiguration(
			"repeat(auto-fill, 1fr)",
		);
		expect(result).toEqual({
			repeat: {
				count: "auto-fill",
				value: { value: 1, unit: "fr" },
			},
		});
	});

	it("should parse repeat with minmax", () => {
		const result = stringToGridTemplateColumnsConfiguration(
			"repeat(3, minmax(100px, 1fr))",
		);
		expect(result).toEqual({
			repeat: {
				count: 3,
				value: {
					min: { value: 100, unit: "px" },
					max: { value: 1, unit: "fr" },
				},
			},
		});
	});

	it("should parse repeat with auto", () => {
		const result = stringToGridTemplateColumnsConfiguration("repeat(2, auto)");
		expect(result).toEqual({
			repeat: {
				count: 2,
				value: { unit: "auto" },
			},
		});
	});

	it("should handle invalid repeat count", () => {
		const result = stringToGridTemplateColumnsConfiguration(
			"repeat(invalid, 1fr)",
		);
		expect(result).toEqual({
			repeat: {
				count: 1,
				value: { value: 1, unit: "fr" },
			},
		});
	});

	it("should parse values with different units", () => {
		const result = stringToGridTemplateColumnsConfiguration("100px auto 1fr");
		expect(result).toEqual({
			values: [
				{ value: 100, unit: "px" },
				{ unit: "auto" },
				{ value: 1, unit: "fr" },
			],
		});
	});

	it("should handle whitespace", () => {
		const result = stringToGridTemplateColumnsConfiguration("  1fr  2fr  ");
		expect(result).toEqual({
			values: [
				{ value: 1, unit: "fr" },
				{ value: 2, unit: "fr" },
			],
		});
	});
});
