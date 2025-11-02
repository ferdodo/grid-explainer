import { describe, it, expect } from "vitest";
import { explainGridContainerConfiguration } from "./explainGridContainerConfiguration";
import type { GridContainerConfiguration } from "../types";

describe("explainGridContainerConfiguration", () => {
	it("should return default message for empty configuration", () => {
		const config: GridContainerConfiguration = {};
		const result = explainGridContainerConfiguration(config);
		expect(result).toBe(
			"The grid container has no specific configuration. Items will be placed automatically in a single column.",
		);
	});

	it("should explain display property", () => {
		const config: GridContainerConfiguration = { display: "grid" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("display: grid");
	});

	it("should explain inline-grid display", () => {
		const config: GridContainerConfiguration = { display: "inline-grid" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("display: inline-grid");
	});

	it("should explain gridTemplateColumns with single value", () => {
		const config: GridContainerConfiguration = {
			gridTemplateColumns: "1fr",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("columns");
		expect(result).toContain("1fr");
	});

	it("should explain gridTemplateColumns with multiple values", () => {
		const config: GridContainerConfiguration = {
			gridTemplateColumns: "1fr 2fr 1fr",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("multiple columns");
		expect(result).toContain("1fr 2fr 1fr");
	});

	it("should explain gridTemplateRows with single value", () => {
		const config: GridContainerConfiguration = { gridTemplateRows: "100px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("rows");
		expect(result).toContain("100px");
	});

	it("should explain gridTemplateRows with multiple values", () => {
		const config: GridContainerConfiguration = {
			gridTemplateRows: "100px 200px",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("multiple rows");
		expect(result).toContain("100px 200px");
	});

	it("should explain gridTemplateAreas", () => {
		const config: GridContainerConfiguration = {
			gridTemplateAreas: '"header header" "sidebar main"',
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("named areas");
		expect(result).toContain('"header header" "sidebar main"');
	});

	it("should explain gap property", () => {
		const config: GridContainerConfiguration = { gap: "20px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("gap of 20px");
		expect(result).not.toContain("column gap");
		expect(result).not.toContain("row gap");
	});

	it("should explain columnGap when gap is not set", () => {
		const config: GridContainerConfiguration = { columnGap: "10px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("column gap of 10px");
	});

	it("should explain gridColumnGap when gap is not set", () => {
		const config: GridContainerConfiguration = { gridColumnGap: "15px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("column gap of 15px");
	});

	it("should prefer columnGap over gridColumnGap", () => {
		const config: GridContainerConfiguration = {
			columnGap: "10px",
			gridColumnGap: "15px",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("column gap of 10px");
	});

	it("should explain rowGap when gap is not set", () => {
		const config: GridContainerConfiguration = { rowGap: "12px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("row gap of 12px");
	});

	it("should explain gridRowGap when gap is not set", () => {
		const config: GridContainerConfiguration = { gridRowGap: "18px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("row gap of 18px");
	});

	it("should prefer rowGap over gridRowGap", () => {
		const config: GridContainerConfiguration = {
			rowGap: "12px",
			gridRowGap: "18px",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("row gap of 12px");
	});

	it("should not explain columnGap or rowGap when gap is set", () => {
		const config: GridContainerConfiguration = {
			gap: "20px",
			columnGap: "10px",
			rowGap: "12px",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("gap of 20px");
		expect(result).not.toContain("column gap of 10px");
		expect(result).not.toContain("row gap of 12px");
	});

	it("should explain gridAutoFlow row", () => {
		const config: GridContainerConfiguration = { gridAutoFlow: "row" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("row");
		expect(result).toContain("horizontally");
		expect(result).not.toContain("dense");
	});

	it("should explain gridAutoFlow column", () => {
		const config: GridContainerConfiguration = { gridAutoFlow: "column" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("column");
		expect(result).toContain("vertically");
		expect(result).not.toContain("dense");
	});

	it("should explain gridAutoFlow row dense", () => {
		const config: GridContainerConfiguration = { gridAutoFlow: "row dense" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("row dense");
		expect(result).toContain("horizontally");
		expect(result).toContain("dense algorithm");
	});

	it("should explain gridAutoFlow column dense", () => {
		const config: GridContainerConfiguration = {
			gridAutoFlow: "column dense",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("column dense");
		expect(result).toContain("vertically");
		expect(result).toContain("dense algorithm");
	});

	it("should explain gridAutoFlow dense", () => {
		const config: GridContainerConfiguration = { gridAutoFlow: "dense" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("dense");
	});

	it("should explain gridAutoColumns", () => {
		const config: GridContainerConfiguration = {
			gridAutoColumns: "minmax(100px, auto)",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("minmax(100px, auto)");
	});

	it("should explain gridAutoRows", () => {
		const config: GridContainerConfiguration = { gridAutoRows: "50px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("50px");
	});

	it("should explain justifyItems", () => {
		const config: GridContainerConfiguration = { justifyItems: "center" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("horizontally aligned");
		expect(result).toContain("center");
	});

	it("should explain alignItems", () => {
		const config: GridContainerConfiguration = { alignItems: "stretch" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("vertically aligned");
		expect(result).toContain("stretch");
	});

	it("should explain justifyContent", () => {
		const config: GridContainerConfiguration = {
			justifyContent: "space-between",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("horizontally aligned");
		expect(result).toContain("space-between");
	});

	it("should explain alignContent", () => {
		const config: GridContainerConfiguration = { alignContent: "start" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("vertically aligned");
		expect(result).toContain("start");
	});

	it("should explain placeItems", () => {
		const config: GridContainerConfiguration = { placeItems: "center stretch" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("place-items");
		expect(result).toContain("center stretch");
	});

	it("should explain placeContent", () => {
		const config: GridContainerConfiguration = {
			placeContent: "center center",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("place-content");
		expect(result).toContain("center center");
	});

	it("should explain width", () => {
		const config: GridContainerConfiguration = { width: "100%" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("width of 100%");
	});

	it("should explain height", () => {
		const config: GridContainerConfiguration = { height: "500px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("height of 500px");
	});

	it("should explain minWidth", () => {
		const config: GridContainerConfiguration = { minWidth: "300px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("minimum width of 300px");
	});

	it("should explain minHeight", () => {
		const config: GridContainerConfiguration = { minHeight: "200px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("minimum height of 200px");
	});

	it("should explain maxWidth", () => {
		const config: GridContainerConfiguration = { maxWidth: "1200px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("maximum width of 1200px");
	});

	it("should explain maxHeight", () => {
		const config: GridContainerConfiguration = { maxHeight: "800px" };
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("maximum height of 800px");
	});

	it("should combine multiple explanations", () => {
		const config: GridContainerConfiguration = {
			display: "grid",
			gridTemplateColumns: "1fr 2fr",
			gap: "20px",
			justifyItems: "center",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toContain("display: grid");
		expect(result).toContain("multiple columns");
		expect(result).toContain("gap of 20px");
		expect(result).toContain("horizontally aligned");
		expect(result.split(" ").length).toBeGreaterThan(10);
	});

	it("should handle all properties together", () => {
		const config: GridContainerConfiguration = {
			display: "grid",
			gridTemplateColumns: "repeat(3, 1fr)",
			gridTemplateRows: "auto 1fr auto",
			gap: "1rem",
			gridAutoFlow: "row dense",
			justifyItems: "stretch",
			alignItems: "center",
			width: "100%",
			minHeight: "100vh",
		};
		const result = explainGridContainerConfiguration(config);
		expect(result).toBeTruthy();
		expect(result.length).toBeGreaterThan(0);
	});
});
