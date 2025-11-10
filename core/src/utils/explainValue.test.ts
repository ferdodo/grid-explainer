import { describe, it, expect } from "vitest";
import { explainValue } from "./explainValue";

describe("explainValue", () => {
	describe("Display values", () => {
		it("should explain display: grid", () => {
			const result = explainValue("display", "grid");
			expect(result).toContain("grid");
			expect(result).toContain("grid container");
		});

		it("should explain display: inline-grid", () => {
			const result = explainValue("display", "inline-grid");
			expect(result).toContain("inline-grid");
			expect(result).toContain("inline-level grid container");
		});

		it("should explain display: subgrid", () => {
			const result = explainValue("display", "subgrid");
			expect(result).toContain("subgrid");
			expect(result).toContain("inherits the grid tracks");
		});

		it("should explain display: flex", () => {
			const result = explainValue("display", "flex");
			expect(result).toContain("flex");
			expect(result).toContain("flex container");
		});

		it("should explain display: inline-flex", () => {
			const result = explainValue("display", "inline-flex");
			expect(result).toContain("inline-flex");
			expect(result).toContain("inline-level flex container");
		});
	});

	describe("Flow values", () => {
		describe("Flex direction", () => {
			it("should explain flex-direction: row", () => {
				const result = explainValue("flex-direction", "row");
				expect(result).toContain("row");
				expect(result).toContain("horizontally from left to right");
			});

			it("should explain flex-direction: row-reverse", () => {
				const result = explainValue("flex-direction", "row-reverse");
				expect(result).toContain("row-reverse");
				expect(result).toContain("horizontally from right to left");
			});

			it("should explain flex-direction: column", () => {
				const result = explainValue("flex-direction", "column");
				expect(result).toContain("column");
				expect(result).toContain("vertically from top to bottom");
			});

			it("should explain flex-direction: column-reverse", () => {
				const result = explainValue("flex-direction", "column-reverse");
				expect(result).toContain("column-reverse");
				expect(result).toContain("vertically from bottom to top");
			});
		});

		describe("Grid auto-flow", () => {
			it("should explain grid-auto-flow: row", () => {
				const result = explainValue("grid-auto-flow", "row");
				expect(result).toContain("row");
				expect(result).toContain("horizontally");
				expect(result).toContain("filling each row");
			});

			it("should explain grid-auto-flow: column", () => {
				const result = explainValue("grid-auto-flow", "column");
				expect(result).toContain("column");
				expect(result).toContain("vertically");
				expect(result).toContain("filling each column");
			});

			it("should explain grid-auto-flow: row dense", () => {
				const result = explainValue("grid-auto-flow", "row dense");
				expect(result).toContain("row dense");
				expect(result).toContain("horizontally");
				expect(result).toContain("dense algorithm");
			});

			it("should explain grid-auto-flow: column dense", () => {
				const result = explainValue("grid-auto-flow", "column dense");
				expect(result).toContain("column dense");
				expect(result).toContain("vertically");
				expect(result).toContain("dense algorithm");
			});

			it("should explain grid-auto-flow: dense", () => {
				const result = explainValue("grid-auto-flow", "dense");
				expect(result).toContain("dense");
				expect(result).toContain("dense algorithm");
			});
		});
	});

	describe("Alignment values", () => {
		describe("justify-items", () => {
			it("should explain justify-items: start", () => {
				const result = explainValue("justify-items", "start");
				expect(result).toContain("start");
				expect(result).toContain("aligns the item");
				expect(result).toContain("left");
			});

			it("should explain justify-items: center", () => {
				const result = explainValue("justify-items", "center");
				expect(result).toContain("center");
				expect(result).toContain("centers");
			});

			it("should explain justify-items: stretch", () => {
				const result = explainValue("justify-items", "stretch");
				expect(result).toContain("stretch");
				expect(result).toContain("stretches to fill");
			});
		});

		describe("align-items", () => {
			it("should explain alignItems: end", () => {
				const result = explainValue("align-items", "end");
				expect(result).toContain("end");
				expect(result).toContain("aligns the item");
				expect(result).toContain("bottom");
			});

			it("should explain alignItems: baseline", () => {
				const result = explainValue("align-items", "baseline");
				expect(result).toContain("baseline");
				expect(result).toContain("baseline");
			});
		});

		describe("justify-content", () => {
			it("should explain justify-content: space-between", () => {
				const result = explainValue("justify-content", "space-between");
				expect(result).toContain("space-between");
				expect(result).toContain("distributes space");
				expect(result).toContain("no space at the edges");
			});

			it("should explain justify-content: space-around", () => {
				const result = explainValue("justify-content", "space-around");
				expect(result).toContain("space-around");
				expect(result).toContain("half-size spaces");
			});

			it("should explain justify-content: space-evenly", () => {
				const result = explainValue("justify-content", "space-evenly");
				expect(result).toContain("space-evenly");
				expect(result).toContain("around edges");
			});
		});

		describe("align-content", () => {
			it("should explain align-content: start", () => {
				const result = explainValue("align-content", "start");
				expect(result).toContain("start");
				expect(result).toContain("aligns content");
			});

			it("should explain align-content: center", () => {
				const result = explainValue("align-content", "center");
				expect(result).toContain("center");
				expect(result).toContain("centers");
			});
		});

		describe("justify-self and align-self", () => {
			it("should explain justify-self: auto", () => {
				const result = explainValue("justify-self", "auto");
				expect(result).toContain("auto");
				expect(result).toContain("uses the alignment");
			});

			it("should explain align-self: center", () => {
				const result = explainValue("align-self", "center");
				expect(result).toContain("center");
				expect(result).toContain("centers");
			});
		});

		describe("Flexbox alignment", () => {
			it("should explain justifyContent: flex-start for flex", () => {
				const result = explainValue("justify-content", "flex-start");
				expect(result).toContain("flex-start");
				expect(result).toContain("start of the flex container");
			});

			it("should explain alignItems: flex-end for flex", () => {
				const result = explainValue("align-items", "flex-end");
				expect(result).toContain("flex-end");
				expect(result).toContain("end of the flex container");
			});
		});
	});

	describe("Template values", () => {
		it("should explain grid-template-columns with repeat()", () => {
			const result = explainValue("grid-template-columns", "repeat(3, 1fr)");
			expect(result).toContain("repeat(3, 1fr)");
			expect(result).toContain("repeat() function");
		});

		it("should explain grid-template-rows with minmax()", () => {
			const result = explainValue("grid-template-rows", "minmax(100px, auto)");
			expect(result).toContain("minmax(100px, auto)");
			expect(result).toContain("minmax() function");
		});

		it("should explain grid-template-columns with fr", () => {
			const result = explainValue("grid-template-columns", "1fr 2fr 1fr");
			expect(result).toContain("1fr 2fr 1fr");
			expect(result).toContain("fractional unit");
		});

		it("should explain grid-template-rows with auto", () => {
			const result = explainValue("grid-template-rows", "auto");
			expect(result).toContain("auto");
			expect(result).toContain("available space");
		});

		it("should explain grid-template-areas with named areas", () => {
			const result = explainValue(
				"grid-template-areas",
				'"header header" "sidebar main"',
			);
			expect(result).toContain('"header header" "sidebar main"');
			expect(result).toContain("named grid areas");
		});

		it("should explain grid-template-columns with pixels", () => {
			const result = explainValue("grid-template-columns", "100px");
			expect(result).toContain("100px");
			expect(result).toContain("fixed pixel size");
		});

		it("should explain grid-template-rows with percentage", () => {
			const result = explainValue("grid-template-rows", "50%");
			expect(result).toContain("50%");
			expect(result).toContain("percentage");
		});
	});

	describe("Placement values", () => {
		it("should explain grid-column with grid line syntax", () => {
			const result = explainValue("grid-column", "1 / 3");
			expect(result).toContain("1 / 3");
			expect(result).toContain("grid line syntax");
		});

		it("should explain grid-row with span", () => {
			const result = explainValue("grid-row", "span 2");
			expect(result).toContain("span 2");
			expect(result).toContain("span keyword");
		});

		it("should explain grid-column-start with line number", () => {
			const result = explainValue("grid-column-start", "2");
			expect(result).toContain("2");
			expect(result).toContain("grid line number");
		});

		it("should explain grid-area with named area", () => {
			const result = explainValue("grid-area", "header");
			expect(result).toContain("header");
			expect(result).toContain("named grid area");
		});

		it("should explain grid-area with slash syntax", () => {
			const result = explainValue("grid-area", "1/1/2/3");
			expect(result).toContain("1/1/2/3");
			expect(result).toContain("grid line syntax");
		});
	});

	describe("Sizing values", () => {
		it("should explain width with pixels", () => {
			const result = explainValue("width", "200px");
			expect(result).toContain("200px");
			expect(result).toContain("fixed pixel size");
		});

		it("should explain height with percentage", () => {
			const result = explainValue("height", "100%");
			expect(result).toContain("100%");
			expect(result).toContain("percentage");
		});

		it("should explain gap with fr", () => {
			const result = explainValue("gap", "1fr");
			expect(result).toContain("1fr");
			expect(result).toContain("fractional unit");
		});

		it("should explain grid-auto-columns with minmax()", () => {
			const result = explainValue("grid-auto-columns", "minmax(50px, 1fr)");
			expect(result).toContain("minmax(50px, 1fr)");
			expect(result).toContain("minmax() function");
		});

		it("should explain grid-auto-rows with auto", () => {
			const result = explainValue("grid-auto-rows", "auto");
			expect(result).toContain("auto");
			expect(result).toContain("content or available space");
		});

		it("should explain min-width with min-content", () => {
			const result = explainValue("min-width", "min-content");
			expect(result).toContain("min-content");
			expect(result).toContain("smallest size");
		});

		it("should explain max-height with max-content", () => {
			const result = explainValue("max-height", "max-content");
			expect(result).toContain("max-content");
			expect(result).toContain("without wrapping");
		});

		it("should explain width with rem", () => {
			const result = explainValue("width", "2rem");
			expect(result).toContain("2rem");
			expect(result).toContain("root em unit");
		});

		it("should explain height with em", () => {
			const result = explainValue("height", "1.5em");
			expect(result).toContain("1.5em");
			expect(result).toContain("em unit");
		});

		it("should explain width with vh", () => {
			const result = explainValue("width", "100vh");
			expect(result).toContain("100vh");
			expect(result).toContain("viewport height");
		});

		it("should explain height with vw", () => {
			const result = explainValue("height", "50vw");
			expect(result).toContain("50vw");
			expect(result).toContain("viewport width");
		});
	});

	describe("Position values", () => {
		it("should explain position: static", () => {
			const result = explainValue("position", "static");
			expect(result).toContain("static");
			expect(result).toContain("default position");
		});

		it("should explain position: relative", () => {
			const result = explainValue("position", "relative");
			expect(result).toContain("relative");
			expect(result).toContain("positioned relative");
			expect(result).toContain("top/right/bottom/left");
		});

		it("should explain position: absolute", () => {
			const result = explainValue("position", "absolute");
			expect(result).toContain("absolute");
			expect(result).toContain("removed from normal flow");
		});

		it("should explain position: fixed", () => {
			const result = explainValue("position", "fixed");
			expect(result).toContain("fixed");
			expect(result).toContain("viewport");
			expect(result).toContain("scrolling");
		});

		it("should explain position: sticky", () => {
			const result = explainValue("position", "sticky");
			expect(result).toContain("sticky");
			expect(result).toContain("switches between");
		});
	});

	describe("Order values", () => {
		it("should explain order: 0", () => {
			const result = explainValue("order", "0");
			expect(result).toContain("0");
			expect(result).toContain("default order");
		});

		it("should explain order: 2 (positive)", () => {
			const result = explainValue("order", "2");
			expect(result).toContain("2");
			expect(result).toContain("appears later");
		});

		it("should explain order: -1 (negative)", () => {
			const result = explainValue("order", "-1");
			expect(result).toContain("-1");
			expect(result).toContain("appears earlier");
		});

		it("should return value as-is for non-numeric order", () => {
			const result = explainValue("order", "invalid");
			expect(result).toBe("invalid");
		});
	});

	describe("Overflow values", () => {
		it("should explain overflow: visible", () => {
			const result = explainValue("overflow", "visible");
			expect(result).toContain("visible");
			expect(result).toContain("overflows and is visible");
		});

		it("should explain overflow: hidden", () => {
			const result = explainValue("overflow", "hidden");
			expect(result).toContain("hidden");
			expect(result).toContain("clipped and hidden");
		});

		it("should explain overflow: scroll", () => {
			const result = explainValue("overflow", "scroll");
			expect(result).toContain("scroll");
			expect(result).toContain("scrollbars are always shown");
		});

		it("should explain overflow: auto", () => {
			const result = explainValue("overflow", "auto");
			expect(result).toContain("auto");
			expect(result).toContain("scrollbars appear only when");
		});
	});

	describe("Edge cases", () => {
		it("should return value as-is for unknown property", () => {
			const result = explainValue("unknown-property", "some-value");
			expect(result).toBe("some-value");
		});

		it("should return value as-is for unknown value", () => {
			const result = explainValue("display", "unknown-display");
			expect(result).toBe("unknown-display");
		});

		it("should handle empty string", () => {
			const result = explainValue("width", "");
			expect(result).toBe("");
		});

		it("should handle complex template values", () => {
			const result = explainValue(
				"grid-template-columns",
				"repeat(auto-fit, minmax(200px, 1fr))",
			);
			expect(result).toContain("repeat(auto-fit, minmax(200px, 1fr))");
			expect(result).toContain("repeat() function");
		});

		it("should handle mixed template values", () => {
			const result = explainValue("grid-template-columns", "100px 1fr auto");
			expect(result).toContain("100px 1fr auto");
		});
	});
});
