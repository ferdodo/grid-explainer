import { describe, it, expect } from "vitest";
import { gridContainerConfigurationToCss } from "./gridContainerConfigurationToCss";
import type { GridContainerConfiguration } from "../types";

describe("gridContainerConfigurationToCss", () => {
	it("should return empty string for empty configuration", () => {
		const config: GridContainerConfiguration = {};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toBe("");
	});

	it("should convert display property", () => {
		const config: GridContainerConfiguration = { display: "grid" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("display: grid;");
	});

	it("should convert inline-grid display", () => {
		const config: GridContainerConfiguration = { display: "inline-grid" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("display: inline-grid;");
	});

	it("should convert gridTemplateColumns", () => {
		const config: GridContainerConfiguration = {
			gridTemplateColumns: "1fr 2fr 1fr",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("grid-template-columns: 1fr 2fr 1fr;");
	});

	it("should convert gridTemplateRows", () => {
		const config: GridContainerConfiguration = {
			gridTemplateRows: "100px 200px",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("grid-template-rows: 100px 200px;");
	});

	it("should convert gridTemplateAreas", () => {
		const config: GridContainerConfiguration = {
			gridTemplateAreas: '"header header" "sidebar main"',
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain(
			'grid-template-areas: "header header" "sidebar main";',
		);
	});

	it("should convert gap property", () => {
		const config: GridContainerConfiguration = { gap: "20px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("gap: 20px;");
		expect(result).not.toContain("column-gap");
		expect(result).not.toContain("row-gap");
	});

	it("should convert columnGap when gap is not set", () => {
		const config: GridContainerConfiguration = { columnGap: "10px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("column-gap: 10px;");
	});

	it("should convert gridColumnGap when gap is not set", () => {
		const config: GridContainerConfiguration = { gridColumnGap: "15px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("column-gap: 15px;");
	});

	it("should prefer columnGap over gridColumnGap", () => {
		const config: GridContainerConfiguration = {
			columnGap: "10px",
			gridColumnGap: "15px",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("column-gap: 10px;");
		expect(result).not.toContain("column-gap: 15px;");
	});

	it("should convert rowGap when gap is not set", () => {
		const config: GridContainerConfiguration = { rowGap: "12px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("row-gap: 12px;");
	});

	it("should convert gridRowGap when gap is not set", () => {
		const config: GridContainerConfiguration = { gridRowGap: "18px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("row-gap: 18px;");
	});

	it("should prefer rowGap over gridRowGap", () => {
		const config: GridContainerConfiguration = {
			rowGap: "12px",
			gridRowGap: "18px",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("row-gap: 12px;");
		expect(result).not.toContain("row-gap: 18px;");
	});

	it("should not include columnGap or rowGap when gap is set", () => {
		const config: GridContainerConfiguration = {
			gap: "20px",
			columnGap: "10px",
			rowGap: "12px",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("gap: 20px;");
		expect(result).not.toContain("column-gap: 10px;");
		expect(result).not.toContain("row-gap: 12px;");
	});

	it("should convert gridAutoFlow", () => {
		const config: GridContainerConfiguration = { gridAutoFlow: "row" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("grid-auto-flow: row;");
	});

	it("should convert gridAutoFlow dense", () => {
		const config: GridContainerConfiguration = { gridAutoFlow: "row dense" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("grid-auto-flow: row dense;");
	});

	it("should convert gridAutoColumns", () => {
		const config: GridContainerConfiguration = {
			gridAutoColumns: "minmax(100px, auto)",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("grid-auto-columns: minmax(100px, auto);");
	});

	it("should convert gridAutoRows", () => {
		const config: GridContainerConfiguration = { gridAutoRows: "50px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("grid-auto-rows: 50px;");
	});

	it("should convert justifyItems", () => {
		const config: GridContainerConfiguration = { justifyItems: "center" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("justify-items: center;");
	});

	it("should convert alignItems", () => {
		const config: GridContainerConfiguration = { alignItems: "stretch" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("align-items: stretch;");
	});

	it("should convert justifyContent", () => {
		const config: GridContainerConfiguration = {
			justifyContent: "space-between",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("justify-content: space-between;");
	});

	it("should convert alignContent", () => {
		const config: GridContainerConfiguration = { alignContent: "start" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("align-content: start;");
	});

	it("should convert placeItems", () => {
		const config: GridContainerConfiguration = { placeItems: "center stretch" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("place-items: center stretch;");
	});

	it("should convert placeContent", () => {
		const config: GridContainerConfiguration = {
			placeContent: "center center",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("place-content: center center;");
	});

	it("should convert width", () => {
		const config: GridContainerConfiguration = { width: "100%" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("width: 100%;");
	});

	it("should convert height", () => {
		const config: GridContainerConfiguration = { height: "500px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("height: 500px;");
	});

	it("should convert minWidth", () => {
		const config: GridContainerConfiguration = { minWidth: "300px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("min-width: 300px;");
	});

	it("should convert minHeight", () => {
		const config: GridContainerConfiguration = { minHeight: "200px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("min-height: 200px;");
	});

	it("should convert maxWidth", () => {
		const config: GridContainerConfiguration = { maxWidth: "1200px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("max-width: 1200px;");
	});

	it("should convert maxHeight", () => {
		const config: GridContainerConfiguration = { maxHeight: "800px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("max-height: 800px;");
	});

	it("should convert padding", () => {
		const config: GridContainerConfiguration = { padding: "10px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("padding: 10px;");
	});

	it("should convert margin", () => {
		const config: GridContainerConfiguration = { margin: "20px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("margin: 20px;");
	});

	it("should convert border", () => {
		const config: GridContainerConfiguration = { border: "1px solid black" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("border: 1px solid black;");
	});

	it("should convert backgroundColor", () => {
		const config: GridContainerConfiguration = {
			backgroundColor: "#ffffff",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("background-color: #ffffff;");
	});

	it("should convert position", () => {
		const config: GridContainerConfiguration = { position: "relative" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("position: relative;");
	});

	it("should convert top", () => {
		const config: GridContainerConfiguration = { top: "10px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("top: 10px;");
	});

	it("should convert right", () => {
		const config: GridContainerConfiguration = { right: "20px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("right: 20px;");
	});

	it("should convert bottom", () => {
		const config: GridContainerConfiguration = { bottom: "30px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("bottom: 30px;");
	});

	it("should convert left", () => {
		const config: GridContainerConfiguration = { left: "40px" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("left: 40px;");
	});

	it("should convert overflow", () => {
		const config: GridContainerConfiguration = { overflow: "hidden" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("overflow: hidden;");
	});

	it("should convert overflowX", () => {
		const config: GridContainerConfiguration = { overflowX: "scroll" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("overflow-x: scroll;");
	});

	it("should convert overflowY", () => {
		const config: GridContainerConfiguration = { overflowY: "auto" };
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("overflow-y: auto;");
	});

	it("should combine multiple properties", () => {
		const config: GridContainerConfiguration = {
			display: "grid",
			gridTemplateColumns: "1fr 2fr",
			gap: "20px",
			justifyItems: "center",
			width: "100%",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("display: grid;");
		expect(result).toContain("grid-template-columns: 1fr 2fr;");
		expect(result).toContain("gap: 20px;");
		expect(result).toContain("justify-items: center;");
		expect(result).toContain("width: 100%;");
	});

	it("should format properties with line breaks and indentation", () => {
		const config: GridContainerConfiguration = {
			display: "grid",
			gap: "10px",
		};
		const result = gridContainerConfigurationToCss(config);
		expect(result).toContain("\n");
		expect(result.split("\n").length).toBeGreaterThan(1);
	});
});
