import { describe, it, expect } from "vitest";
import { parseGridTemplateValue } from "./parseGridTemplateValue";

describe("parseGridTemplateValue", () => {
	it("should parse auto", () => {
		const result = parseGridTemplateValue("auto");
		expect(result).toEqual({ unit: "auto" });
	});

	it("should parse min-content", () => {
		const result = parseGridTemplateValue("min-content");
		expect(result).toEqual({ unit: "min-content" });
	});

	it("should parse max-content", () => {
		const result = parseGridTemplateValue("max-content");
		expect(result).toEqual({ unit: "max-content" });
	});

	it("should parse fr unit", () => {
		const result = parseGridTemplateValue("1fr");
		expect(result).toEqual({ value: 1, unit: "fr" });
	});

	it("should parse px unit", () => {
		const result = parseGridTemplateValue("100px");
		expect(result).toEqual({ value: 100, unit: "px" });
	});

	it("should parse % unit", () => {
		const result = parseGridTemplateValue("50%");
		expect(result).toEqual({ value: 50, unit: "%" });
	});

	it("should parse em unit", () => {
		const result = parseGridTemplateValue("1.5em");
		expect(result).toEqual({ value: 1.5, unit: "em" });
	});

	it("should parse rem unit", () => {
		const result = parseGridTemplateValue("2rem");
		expect(result).toEqual({ value: 2, unit: "rem" });
	});

	it("should parse vh unit", () => {
		const result = parseGridTemplateValue("50vh");
		expect(result).toEqual({ value: 50, unit: "vh" });
	});

	it("should parse vw unit", () => {
		const result = parseGridTemplateValue("25vw");
		expect(result).toEqual({ value: 25, unit: "vw" });
	});

	it("should parse minmax function", () => {
		const result = parseGridTemplateValue("minmax(100px, 1fr)");
		expect(result).toEqual({
			min: { value: 100, unit: "px" },
			max: { value: 1, unit: "fr" },
		});
	});

	it("should parse minmax with auto", () => {
		const result = parseGridTemplateValue("minmax(200px, auto)");
		expect(result).toEqual({
			min: { value: 200, unit: "px" },
			max: { unit: "auto" },
		});
	});

	it("should parse minmax with min-content", () => {
		const result = parseGridTemplateValue("minmax(min-content, 1fr)");
		expect(result).toEqual({
			min: { unit: "min-content" },
			max: { value: 1, unit: "fr" },
		});
	});

	it("should parse minmax with max-content", () => {
		const result = parseGridTemplateValue("minmax(50%, max-content)");
		expect(result).toEqual({
			min: { value: 50, unit: "%" },
			max: { unit: "max-content" },
		});
	});

	it("should handle whitespace in minmax", () => {
		const result = parseGridTemplateValue("minmax( 100px , 1fr )");
		expect(result).toEqual({
			min: { value: 100, unit: "px" },
			max: { value: 1, unit: "fr" },
		});
	});

	it("should handle fallback for invalid fr", () => {
		const result = parseGridTemplateValue("invalidfr");
		expect(result).toEqual({ value: undefined, unit: "fr" });
	});

	it("should handle fallback for invalid px", () => {
		const result = parseGridTemplateValue("invalidpx");
		expect(result).toEqual({ value: undefined, unit: "px" });
	});

	it("should handle fallback for invalid %", () => {
		const result = parseGridTemplateValue("invalid%");
		expect(result).toEqual({ value: undefined, unit: "%" });
	});

	it("should handle fallback for unknown format", () => {
		const result = parseGridTemplateValue("unknown");
		expect(result).toEqual({ unit: "auto" });
	});

	it("should trim whitespace", () => {
		const result = parseGridTemplateValue("  1fr  ");
		expect(result).toEqual({ value: 1, unit: "fr" });
	});
});
