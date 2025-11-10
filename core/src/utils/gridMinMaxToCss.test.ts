import { describe, it, expect } from "vitest";
import { gridMinMaxToCss } from "./gridMinMaxToCss";

describe("gridMinMaxToCss", () => {
	it("should convert minmax with fr units", () => {
		const result = gridMinMaxToCss({
			min: { value: 100, unit: "px" },
			max: { value: 1, unit: "fr" },
		});
		expect(result).toBe("minmax(100px, 1fr)");
	});

	it("should convert minmax with auto", () => {
		const result = gridMinMaxToCss({
			min: { value: 200, unit: "px" },
			max: { unit: "auto" },
		});
		expect(result).toBe("minmax(200px, auto)");
	});

	it("should convert minmax with min-content", () => {
		const result = gridMinMaxToCss({
			min: { unit: "min-content" },
			max: { value: 1, unit: "fr" },
		});
		expect(result).toBe("minmax(min-content, 1fr)");
	});

	it("should convert minmax with max-content", () => {
		const result = gridMinMaxToCss({
			min: { value: 50, unit: "%" },
			max: { unit: "max-content" },
		});
		expect(result).toBe("minmax(50%, max-content)");
	});

	it("should convert minmax with different units", () => {
		const result = gridMinMaxToCss({
			min: { value: 10, unit: "em" },
			max: { value: 20, unit: "rem" },
		});
		expect(result).toBe("minmax(10em, 20rem)");
	});

	it("should convert minmax with viewport units", () => {
		const result = gridMinMaxToCss({
			min: { value: 50, unit: "vh" },
			max: { value: 100, unit: "vw" },
		});
		expect(result).toBe("minmax(50vh, 100vw)");
	});

	it("should convert minmax with decimal values", () => {
		const result = gridMinMaxToCss({
			min: { value: 1.5, unit: "fr" },
			max: { value: 2.5, unit: "fr" },
		});
		expect(result).toBe("minmax(1.5fr, 2.5fr)");
	});
});
