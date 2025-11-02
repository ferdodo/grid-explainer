import { describe, it, expect } from "vitest";
import { gridChildConfigurationToCss } from "./gridChildConfigurationToCss";
import type { GridChildConfiguration } from "../types";

describe("gridChildConfigurationToCss", () => {
	it("should return empty string for empty configuration", () => {
		const config: GridChildConfiguration = {};
		const result = gridChildConfigurationToCss(config);
		expect(result).toBe("");
	});

	it("should convert gridArea", () => {
		const config: GridChildConfiguration = { gridArea: "header" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-area: header;");
		expect(result).not.toContain("grid-column");
		expect(result).not.toContain("grid-row");
	});

	it("should convert gridArea with slash syntax", () => {
		const config: GridChildConfiguration = { gridArea: "1/1/2/3" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-area: 1/1/2/3;");
	});

	it("should not convert gridColumn when gridArea is set", () => {
		const config: GridChildConfiguration = {
			gridArea: "header",
			gridColumn: "1 / 3",
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("grid-column");
	});

	it("should convert gridColumn when gridArea is not set", () => {
		const config: GridChildConfiguration = { gridColumn: "1 / 3" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-column: 1 / 3;");
	});

	it("should convert gridColumnStart when gridColumn and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridColumnStart: "2" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-column-start: 2;");
	});

	it("should convert gridColumnEnd when gridColumn and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridColumnEnd: "4" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-column-end: 4;");
	});

	it("should convert both gridColumnStart and gridColumnEnd", () => {
		const config: GridChildConfiguration = {
			gridColumnStart: "2",
			gridColumnEnd: "4",
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-column-start: 2;");
		expect(result).toContain("grid-column-end: 4;");
	});

	it("should not convert gridColumnStart when gridColumn is set", () => {
		const config: GridChildConfiguration = {
			gridColumn: "1 / 3",
			gridColumnStart: "2",
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("grid-column-start");
	});

	it("should convert gridRow when gridArea is not set", () => {
		const config: GridChildConfiguration = { gridRow: "2 / 4" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-row: 2 / 4;");
	});

	it("should convert gridRowStart when gridRow and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridRowStart: "1" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-row-start: 1;");
	});

	it("should convert gridRowEnd when gridRow and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridRowEnd: "3" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-row-end: 3;");
	});

	it("should convert justifySelf", () => {
		const config: GridChildConfiguration = { justifySelf: "end" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("justify-self: end;");
	});

	it("should convert alignSelf", () => {
		const config: GridChildConfiguration = { alignSelf: "center" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("align-self: center;");
	});

	it("should convert placeSelf", () => {
		const config: GridChildConfiguration = { placeSelf: "center stretch" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("place-self: center stretch;");
	});

	it("should convert order as number", () => {
		const config: GridChildConfiguration = { order: 2 };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("order: 2;");
	});

	it("should convert order as string", () => {
		const config: GridChildConfiguration = { order: "-1" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("order: -1;");
	});

	it("should not convert order when it is undefined", () => {
		const config: GridChildConfiguration = { order: undefined };
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("order");
	});

	it("should not convert order when it is null", () => {
		const config: GridChildConfiguration = {
			order: null as unknown as undefined,
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("order");
	});

	it("should convert width", () => {
		const config: GridChildConfiguration = { width: "200px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("width: 200px;");
	});

	it("should convert height", () => {
		const config: GridChildConfiguration = { height: "150px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("height: 150px;");
	});

	it("should convert minWidth", () => {
		const config: GridChildConfiguration = { minWidth: "100px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("min-width: 100px;");
	});

	it("should convert minHeight", () => {
		const config: GridChildConfiguration = { minHeight: "80px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("min-height: 80px;");
	});

	it("should convert maxWidth", () => {
		const config: GridChildConfiguration = { maxWidth: "500px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("max-width: 500px;");
	});

	it("should convert maxHeight", () => {
		const config: GridChildConfiguration = { maxHeight: "400px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("max-height: 400px;");
	});

	it("should convert padding", () => {
		const config: GridChildConfiguration = { padding: "10px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("padding: 10px;");
	});

	it("should convert margin", () => {
		const config: GridChildConfiguration = { margin: "20px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("margin: 20px;");
	});

	it("should convert border", () => {
		const config: GridChildConfiguration = { border: "1px solid black" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("border: 1px solid black;");
	});

	it("should convert backgroundColor", () => {
		const config: GridChildConfiguration = { backgroundColor: "#ff0000" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("background-color: #ff0000;");
	});

	it("should convert color", () => {
		const config: GridChildConfiguration = { color: "#ffffff" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("color: #ffffff;");
	});

	it("should convert opacity as number", () => {
		const config: GridChildConfiguration = { opacity: 0.5 };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("opacity: 0.5;");
	});

	it("should convert opacity as string", () => {
		const config: GridChildConfiguration = { opacity: "0.8" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("opacity: 0.8;");
	});

	it("should not convert opacity when it is undefined", () => {
		const config: GridChildConfiguration = { opacity: undefined };
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("opacity");
	});

	it("should not convert opacity when it is null", () => {
		const config: GridChildConfiguration = {
			opacity: null as unknown as undefined,
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("opacity");
	});

	it("should convert position", () => {
		const config: GridChildConfiguration = { position: "relative" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("position: relative;");
	});

	it("should convert top", () => {
		const config: GridChildConfiguration = { top: "10px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("top: 10px;");
	});

	it("should convert right", () => {
		const config: GridChildConfiguration = { right: "20px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("right: 20px;");
	});

	it("should convert bottom", () => {
		const config: GridChildConfiguration = { bottom: "30px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("bottom: 30px;");
	});

	it("should convert left", () => {
		const config: GridChildConfiguration = { left: "40px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("left: 40px;");
	});

	it("should convert zIndex as number", () => {
		const config: GridChildConfiguration = { zIndex: 10 };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("z-index: 10;");
	});

	it("should convert zIndex as string", () => {
		const config: GridChildConfiguration = { zIndex: "999" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("z-index: 999;");
	});

	it("should not convert zIndex when it is undefined", () => {
		const config: GridChildConfiguration = { zIndex: undefined };
		const result = gridChildConfigurationToCss(config);
		expect(result).not.toContain("z-index");
	});

	it("should convert overflow", () => {
		const config: GridChildConfiguration = { overflow: "hidden" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("overflow: hidden;");
	});

	it("should convert overflowX", () => {
		const config: GridChildConfiguration = { overflowX: "scroll" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("overflow-x: scroll;");
	});

	it("should convert overflowY", () => {
		const config: GridChildConfiguration = { overflowY: "auto" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("overflow-y: auto;");
	});

	it("should convert fontSize", () => {
		const config: GridChildConfiguration = { fontSize: "16px" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("font-size: 16px;");
	});

	it("should convert fontWeight", () => {
		const config: GridChildConfiguration = { fontWeight: "bold" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("font-weight: bold;");
	});

	it("should convert fontFamily", () => {
		const config: GridChildConfiguration = { fontFamily: "Arial, sans-serif" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("font-family: Arial, sans-serif;");
	});

	it("should convert textAlign", () => {
		const config: GridChildConfiguration = { textAlign: "center" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("text-align: center;");
	});

	it("should convert display", () => {
		const config: GridChildConfiguration = { display: "flex" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("display: flex;");
	});

	it("should convert flexDirection", () => {
		const config: GridChildConfiguration = { flexDirection: "column" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("flex-direction: column;");
	});

	it("should convert flexWrap", () => {
		const config: GridChildConfiguration = { flexWrap: "wrap" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("flex-wrap: wrap;");
	});

	it("should convert justifyContent for flex", () => {
		const config: GridChildConfiguration = {
			justifyContent: "space-around",
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("justify-content: space-around;");
	});

	it("should convert alignItems for flex", () => {
		const config: GridChildConfiguration = { alignItems: "baseline" };
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("align-items: baseline;");
	});

	it("should combine multiple properties", () => {
		const config: GridChildConfiguration = {
			gridArea: "main",
			justifySelf: "center",
			width: "100%",
			minHeight: "200px",
			padding: "10px",
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("grid-area: main;");
		expect(result).toContain("justify-self: center;");
		expect(result).toContain("width: 100%;");
		expect(result).toContain("min-height: 200px;");
		expect(result).toContain("padding: 10px;");
	});

	it("should format properties with line breaks and indentation", () => {
		const config: GridChildConfiguration = {
			gridColumn: "1 / 3",
			width: "100%",
		};
		const result = gridChildConfigurationToCss(config);
		expect(result).toContain("\n");
		expect(result.split("\n").length).toBeGreaterThan(1);
	});
});
