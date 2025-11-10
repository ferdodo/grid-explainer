import { describe, it, expect } from "vitest";
import { stringToGridTemplateAreasConfiguration } from "./stringToGridTemplateAreasConfiguration";

describe("stringToGridTemplateAreasConfiguration", () => {
	it("should return undefined for empty string", () => {
		const result = stringToGridTemplateAreasConfiguration("");
		expect(result).toBeUndefined();
	});

	it("should return undefined for undefined", () => {
		const result = stringToGridTemplateAreasConfiguration(undefined);
		expect(result).toBeUndefined();
	});

	it("should return undefined for whitespace only", () => {
		const result = stringToGridTemplateAreasConfiguration("   ");
		expect(result).toBeUndefined();
	});

	it("should parse single quoted area", () => {
		const result = stringToGridTemplateAreasConfiguration('"header"');
		expect(result).toEqual({
			areas: [["header"]],
		});
	});

	it("should parse multiple quoted areas", () => {
		const result = stringToGridTemplateAreasConfiguration(
			'"header header" "sidebar main"',
		);
		expect(result).toEqual({
			areas: [
				["header", "header"],
				["sidebar", "main"],
			],
		});
	});

	it("should parse three rows", () => {
		const result = stringToGridTemplateAreasConfiguration(
			'"header header" "sidebar main" "footer footer"',
		);
		expect(result).toEqual({
			areas: [
				["header", "header"],
				["sidebar", "main"],
				["footer", "footer"],
			],
		});
	});

	it("should handle areas with dots", () => {
		const result = stringToGridTemplateAreasConfiguration(
			'"header header" ". sidebar"',
		);
		expect(result).toEqual({
			areas: [
				["header", "header"],
				[".", "sidebar"],
			],
		});
	});

	it("should handle multiple spaces in area names", () => {
		const result = stringToGridTemplateAreasConfiguration(
			'"header  header" "sidebar   main"',
		);
		expect(result).toEqual({
			areas: [
				["header", "header"],
				["sidebar", "main"],
			],
		});
	});

	it("should handle fallback for unquoted string", () => {
		const result = stringToGridTemplateAreasConfiguration("header sidebar");
		expect(result).toEqual({
			areas: [["header", "sidebar"]],
		});
	});

	it("should handle single unquoted area", () => {
		const result = stringToGridTemplateAreasConfiguration("main");
		expect(result).toEqual({
			areas: [["main"]],
		});
	});

	it("should handle whitespace", () => {
		const result = stringToGridTemplateAreasConfiguration(
			'  "header header"  "sidebar main"  ',
		);
		expect(result).toEqual({
			areas: [
				["header", "header"],
				["sidebar", "main"],
			],
		});
	});

	it("should handle complex layout", () => {
		const result = stringToGridTemplateAreasConfiguration(
			'"header header header" "sidebar main aside" "footer footer footer"',
		);
		expect(result).toEqual({
			areas: [
				["header", "header", "header"],
				["sidebar", "main", "aside"],
				["footer", "footer", "footer"],
			],
		});
	});
});
