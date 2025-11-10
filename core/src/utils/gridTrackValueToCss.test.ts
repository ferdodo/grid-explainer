import { describe, it, expect } from "vitest";
import { gridTrackValueToCss } from "./gridTrackValueToCss";

describe("gridTrackValueToCss", () => {
	it("should convert GridTrackSize", () => {
		const result = gridTrackValueToCss({ value: 1, unit: "fr" });
		expect(result).toBe("1fr");
	});

	it("should convert GridMinMax", () => {
		const result = gridTrackValueToCss({
			min: { value: 100, unit: "px" },
			max: { value: 1, unit: "fr" },
		});
		expect(result).toBe("minmax(100px, 1fr)");
	});

	it("should handle auto unit", () => {
		const result = gridTrackValueToCss({ unit: "auto" });
		expect(result).toBe("auto");
	});

	it("should handle min-content", () => {
		const result = gridTrackValueToCss({ unit: "min-content" });
		expect(result).toBe("min-content");
	});

	it("should handle max-content", () => {
		const result = gridTrackValueToCss({ unit: "max-content" });
		expect(result).toBe("max-content");
	});

	it("should handle minmax with auto", () => {
		const result = gridTrackValueToCss({
			min: { value: 200, unit: "px" },
			max: { unit: "auto" },
		});
		expect(result).toBe("minmax(200px, auto)");
	});
});
