import { describe, it, expect } from "vitest";
import { stringToGridTemplateRowsConfiguration } from "./stringToGridTemplateRowsConfiguration";

describe("stringToGridTemplateRowsConfiguration", () => {
	it("should return undefined for empty string", () => {
		const result = stringToGridTemplateRowsConfiguration("");
		expect(result).toBeUndefined();
	});

	it("should return undefined for undefined", () => {
		const result = stringToGridTemplateRowsConfiguration(undefined);
		expect(result).toBeUndefined();
	});

	it("should return undefined for whitespace only", () => {
		const result = stringToGridTemplateRowsConfiguration("   ");
		expect(result).toBeUndefined();
	});

	it("should parse single value", () => {
		const result = stringToGridTemplateRowsConfiguration("auto");
		expect(result).toEqual({
			values: [{ unit: "auto" }],
		});
	});

	it("should parse multiple values", () => {
		const result = stringToGridTemplateRowsConfiguration("auto 1fr auto");
		expect(result).toEqual({
			values: [{ unit: "auto" }, { value: 1, unit: "fr" }, { unit: "auto" }],
		});
	});

	it("should parse repeat with number", () => {
		const result = stringToGridTemplateRowsConfiguration("repeat(2, 100px)");
		expect(result).toEqual({
			repeat: {
				count: 2,
				value: { value: 100, unit: "px" },
			},
		});
	});

	it("should parse repeat with auto-fit", () => {
		const result = stringToGridTemplateRowsConfiguration(
			"repeat(auto-fit, 1fr)",
		);
		expect(result).toEqual({
			repeat: {
				count: "auto-fit",
				value: { value: 1, unit: "fr" },
			},
		});
	});

	it("should parse repeat with auto-fill", () => {
		const result = stringToGridTemplateRowsConfiguration(
			"repeat(auto-fill, 50px)",
		);
		expect(result).toEqual({
			repeat: {
				count: "auto-fill",
				value: { value: 50, unit: "px" },
			},
		});
	});

	it("should parse repeat with minmax", () => {
		const result = stringToGridTemplateRowsConfiguration(
			"repeat(3, minmax(50px, auto))",
		);
		expect(result).toEqual({
			repeat: {
				count: 3,
				value: {
					min: { value: 50, unit: "px" },
					max: { unit: "auto" },
				},
			},
		});
	});

	it("should parse repeat with min-content", () => {
		const result = stringToGridTemplateRowsConfiguration(
			"repeat(2, min-content)",
		);
		expect(result).toEqual({
			repeat: {
				count: 2,
				value: { unit: "min-content" },
			},
		});
	});

	it("should handle invalid repeat count", () => {
		const result = stringToGridTemplateRowsConfiguration(
			"repeat(invalid, 100px)",
		);
		expect(result).toEqual({
			repeat: {
				count: 1,
				value: { value: 100, unit: "px" },
			},
		});
	});

	it("should parse values with different units", () => {
		const result = stringToGridTemplateRowsConfiguration("100px 1fr 50%");
		expect(result).toEqual({
			values: [
				{ value: 100, unit: "px" },
				{ value: 1, unit: "fr" },
				{ value: 50, unit: "%" },
			],
		});
	});

	it("should handle whitespace", () => {
		const result = stringToGridTemplateRowsConfiguration("  auto  1fr  ");
		expect(result).toEqual({
			values: [{ unit: "auto" }, { value: 1, unit: "fr" }],
		});
	});
});
