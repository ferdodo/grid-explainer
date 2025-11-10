import { describe, it, expect } from "vitest";
import { gridTrackSizeToCss } from "./gridTrackSizeToCss";

describe("gridTrackSizeToCss", () => {
	it("should convert auto unit", () => {
		const result = gridTrackSizeToCss({ unit: "auto" });
		expect(result).toBe("auto");
	});

	it("should convert min-content unit", () => {
		const result = gridTrackSizeToCss({ unit: "min-content" });
		expect(result).toBe("min-content");
	});

	it("should convert max-content unit", () => {
		const result = gridTrackSizeToCss({ unit: "max-content" });
		expect(result).toBe("max-content");
	});

	it("should convert fr unit with value", () => {
		const result = gridTrackSizeToCss({ value: 1, unit: "fr" });
		expect(result).toBe("1fr");
	});

	it("should convert px unit with value", () => {
		const result = gridTrackSizeToCss({ value: 100, unit: "px" });
		expect(result).toBe("100px");
	});

	it("should convert % unit with value", () => {
		const result = gridTrackSizeToCss({ value: 50, unit: "%" });
		expect(result).toBe("50%");
	});

	it("should convert em unit with value", () => {
		const result = gridTrackSizeToCss({ value: 1.5, unit: "em" });
		expect(result).toBe("1.5em");
	});

	it("should convert rem unit with value", () => {
		const result = gridTrackSizeToCss({ value: 2, unit: "rem" });
		expect(result).toBe("2rem");
	});

	it("should convert vh unit with value", () => {
		const result = gridTrackSizeToCss({ value: 50, unit: "vh" });
		expect(result).toBe("50vh");
	});

	it("should convert vw unit with value", () => {
		const result = gridTrackSizeToCss({ value: 25, unit: "vw" });
		expect(result).toBe("25vw");
	});

	it("should handle unit without value (fallback)", () => {
		const result = gridTrackSizeToCss({ unit: "fr" });
		expect(result).toBe("fr");
	});

	it("should handle decimal values", () => {
		const result = gridTrackSizeToCss({ value: 1.5, unit: "fr" });
		expect(result).toBe("1.5fr");
	});
});
