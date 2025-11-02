import { describe, it, expect } from "vitest";
import { explainGridChildConfiguration } from "./explainGridChildConfiguration";
import type { GridChildConfiguration } from "../types";

describe("explainGridChildConfiguration", () => {
	it("should return default message for empty configuration", () => {
		const config: GridChildConfiguration = {};
		const result = explainGridChildConfiguration(config);
		expect(result).toBe(
			"This grid item has no specific configuration. It will be placed automatically in the next available grid cell.",
		);
	});

	it("should explain gridArea with slash (grid-area syntax)", () => {
		const config: GridChildConfiguration = { gridArea: "1/1/2/3" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("grid-area");
		expect(result).toContain("1/1/2/3");
	});

	it("should explain gridArea as named area", () => {
		const config: GridChildConfiguration = { gridArea: "header" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("named grid area");
		expect(result).toContain("header");
	});

	it("should explain gridArea with dash as named area", () => {
		const config: GridChildConfiguration = { gridArea: "main-content" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("named grid area");
		expect(result).toContain("main-content");
	});

	it("should explain gridArea with numeric value (grid lines)", () => {
		const config: GridChildConfiguration = { gridArea: "123" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("grid lines");
		expect(result).toContain("123");
	});

	it("should explain gridColumn when gridArea is not set", () => {
		const config: GridChildConfiguration = { gridColumn: "1 / 3" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("spans columns");
		expect(result).toContain("1 / 3");
	});

	it("should not explain gridColumn when gridArea is set", () => {
		const config: GridChildConfiguration = {
			gridArea: "header",
			gridColumn: "1 / 3",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("spans columns");
		expect(result).not.toContain("1 / 3");
	});

	it("should explain gridColumnStart when gridColumn and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridColumnStart: "2" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("starts at column line");
		expect(result).toContain("2");
	});

	it("should explain gridColumnEnd when gridColumn and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridColumnEnd: "4" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("ends at column line");
		expect(result).toContain("4");
	});

	it("should explain both gridColumnStart and gridColumnEnd", () => {
		const config: GridChildConfiguration = {
			gridColumnStart: "2",
			gridColumnEnd: "4",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("starts at column line");
		expect(result).toContain("ends at column line");
	});

	it("should not explain gridColumnStart when gridColumn is set", () => {
		const config: GridChildConfiguration = {
			gridColumn: "1 / 3",
			gridColumnStart: "2",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("starts at column line");
	});

	it("should explain gridRow when gridArea is not set", () => {
		const config: GridChildConfiguration = { gridRow: "2 / 4" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("spans rows");
		expect(result).toContain("2 / 4");
	});

	it("should not explain gridRow when gridArea is set", () => {
		const config: GridChildConfiguration = {
			gridArea: "header",
			gridRow: "2 / 4",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("spans rows");
	});

	it("should explain gridRowStart when gridRow and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridRowStart: "1" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("starts at row line");
		expect(result).toContain("1");
	});

	it("should explain gridRowEnd when gridRow and gridArea are not set", () => {
		const config: GridChildConfiguration = { gridRowEnd: "3" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("ends at row line");
		expect(result).toContain("3");
	});

	it("should explain both gridRowStart and gridRowEnd", () => {
		const config: GridChildConfiguration = {
			gridRowStart: "1",
			gridRowEnd: "3",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("starts at row line");
		expect(result).toContain("ends at row line");
	});

	it("should explain justifySelf", () => {
		const config: GridChildConfiguration = { justifySelf: "end" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("horizontally aligned");
		expect(result).toContain("end");
	});

	it("should explain alignSelf", () => {
		const config: GridChildConfiguration = { alignSelf: "center" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("vertically aligned");
		expect(result).toContain("center");
	});

	it("should explain placeSelf", () => {
		const config: GridChildConfiguration = { placeSelf: "center stretch" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("place-self");
		expect(result).toContain("center stretch");
	});

	it("should explain order as number", () => {
		const config: GridChildConfiguration = { order: 2 };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("order value of 2");
	});

	it("should explain order as string", () => {
		const config: GridChildConfiguration = { order: "-1" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("order value of -1");
	});

	it("should not explain order when it is undefined", () => {
		const config: GridChildConfiguration = { order: undefined };
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("order value");
	});

	it("should not explain order when it is null", () => {
		const config: GridChildConfiguration = {
			order: null as unknown as undefined,
		};
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("order value");
	});

	it("should explain width", () => {
		const config: GridChildConfiguration = { width: "200px" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("width of 200px");
	});

	it("should explain height", () => {
		const config: GridChildConfiguration = { height: "150px" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("height of 150px");
	});

	it("should explain minWidth", () => {
		const config: GridChildConfiguration = { minWidth: "100px" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("minimum width of 100px");
	});

	it("should explain minHeight", () => {
		const config: GridChildConfiguration = { minHeight: "80px" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("minimum height of 80px");
	});

	it("should explain maxWidth", () => {
		const config: GridChildConfiguration = { maxWidth: "500px" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("maximum width of 500px");
	});

	it("should explain maxHeight", () => {
		const config: GridChildConfiguration = { maxHeight: "400px" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("maximum height of 400px");
	});

	it("should not explain position when it is static", () => {
		const config: GridChildConfiguration = { position: "static" };
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("position");
	});

	it("should explain position relative", () => {
		const config: GridChildConfiguration = { position: "relative" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("relative");
		expect(result).toContain("positioned relative");
	});

	it("should explain position absolute", () => {
		const config: GridChildConfiguration = { position: "absolute" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("absolute");
		expect(result).toContain("positioned relative");
	});

	it("should explain position fixed", () => {
		const config: GridChildConfiguration = { position: "fixed" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("fixed");
		expect(result).toContain("viewport");
	});

	it("should explain position sticky", () => {
		const config: GridChildConfiguration = { position: "sticky" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("sticky");
		expect(result).toContain("switches between");
	});

	it("should explain top when position is set", () => {
		const config: GridChildConfiguration = {
			position: "absolute",
			top: "10px",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("10px from the top");
	});

	it("should explain right when position is set", () => {
		const config: GridChildConfiguration = {
			position: "absolute",
			right: "20px",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("20px from the right");
	});

	it("should explain bottom when position is set", () => {
		const config: GridChildConfiguration = {
			position: "absolute",
			bottom: "30px",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("30px from the bottom");
	});

	it("should explain left when position is set", () => {
		const config: GridChildConfiguration = {
			position: "absolute",
			left: "40px",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("40px from the left");
	});

	it("should explain zIndex when position is set", () => {
		const config: GridChildConfiguration = {
			position: "absolute",
			zIndex: "10",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("z-index of 10");
	});

	it("should not explain top when position is static", () => {
		const config: GridChildConfiguration = {
			position: "static",
			top: "10px",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("from the top");
	});

	it("should not explain display when it is block", () => {
		const config: GridChildConfiguration = { display: "block" };
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("display type");
	});

	it("should explain display flex", () => {
		const config: GridChildConfiguration = { display: "flex" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("flex");
		expect(result).toContain("display type");
	});

	it("should explain display inline-flex", () => {
		const config: GridChildConfiguration = { display: "inline-flex" };
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("inline-flex");
		expect(result).toContain("display type");
	});

	it("should explain flexDirection when display is flex", () => {
		const config: GridChildConfiguration = {
			display: "flex",
			flexDirection: "column",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("Flex direction");
		expect(result).toContain("column");
	});

	it("should explain flexDirection when display is inline-flex", () => {
		const config: GridChildConfiguration = {
			display: "inline-flex",
			flexDirection: "row-reverse",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("Flex direction");
		expect(result).toContain("row-reverse");
	});

	it("should explain justifyContent when display is flex", () => {
		const config: GridChildConfiguration = {
			display: "flex",
			justifyContent: "space-around",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("Content is justified");
		expect(result).toContain("space-around");
	});

	it("should explain alignItems when display is flex", () => {
		const config: GridChildConfiguration = {
			display: "flex",
			alignItems: "baseline",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("Items are aligned");
		expect(result).toContain("baseline");
	});

	it("should not explain flexDirection when display is not flex or inline-flex", () => {
		const config: GridChildConfiguration = {
			display: "grid",
			flexDirection: "column",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).not.toContain("Flex direction");
	});

	it("should combine multiple explanations", () => {
		const config: GridChildConfiguration = {
			gridArea: "main",
			justifySelf: "center",
			width: "100%",
			minHeight: "200px",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toContain("named grid area");
		expect(result).toContain("horizontally aligned");
		expect(result).toContain("width of 100%");
		expect(result).toContain("minimum height of 200px");
		expect(result.split(" ").length).toBeGreaterThan(10);
	});

	it("should handle complex configuration with all properties", () => {
		const config: GridChildConfiguration = {
			gridColumn: "1 / span 2",
			gridRow: "2 / 4",
			justifySelf: "stretch",
			alignSelf: "center",
			order: 1,
			width: "100%",
			minHeight: "200px",
			position: "relative",
			top: "10px",
			display: "flex",
			flexDirection: "row",
		};
		const result = explainGridChildConfiguration(config);
		expect(result).toBeTruthy();
		expect(result.length).toBeGreaterThan(0);
	});
});
