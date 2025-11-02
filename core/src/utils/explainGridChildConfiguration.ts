import type { GridChildConfiguration } from "../types";
import { explainValue } from "./explainValue";

export function explainGridChildConfiguration(
	config: GridChildConfiguration,
): string {
	const explanations: string[] = [];

	// Grid Area (takes precedence)
	if (config.gridArea) {
		const explainedValue = explainValue("grid-area", config.gridArea);
		if (config.gridArea.includes("/")) {
			explanations.push(
				`This item is placed using grid-area with values: ${explainedValue}.`,
			);
		} else if (config.gridArea.match(/^[a-zA-Z-]+$/)) {
			explanations.push(
				`This item is placed in the named grid area: ${explainedValue}.`,
			);
		} else {
			explanations.push(
				`This item spans from grid lines specified by: ${explainedValue}.`,
			);
		}
	} else {
		// Grid Column
		if (config.gridColumn) {
			const explainedValue = explainValue("grid-column", config.gridColumn);
			explanations.push(`This item spans columns: ${explainedValue}.`);
		} else {
			if (config.gridColumnStart) {
				const explainedValue = explainValue(
					"grid-column-start",
					config.gridColumnStart,
				);
				explanations.push(
					`This item starts at column line: ${explainedValue}.`,
				);
			}
			if (config.gridColumnEnd) {
				const explainedValue = explainValue(
					"grid-column-end",
					config.gridColumnEnd,
				);
				explanations.push(`This item ends at column line: ${explainedValue}.`);
			}
		}

		// Grid Row
		if (config.gridRow) {
			const explainedValue = explainValue("grid-row", config.gridRow);
			explanations.push(`This item spans rows: ${explainedValue}.`);
		} else {
			if (config.gridRowStart) {
				const explainedValue = explainValue(
					"grid-row-start",
					config.gridRowStart,
				);
				explanations.push(`This item starts at row line: ${explainedValue}.`);
			}
			if (config.gridRowEnd) {
				const explainedValue = explainValue("grid-row-end", config.gridRowEnd);
				explanations.push(`This item ends at row line: ${explainedValue}.`);
			}
		}
	}

	// Alignment
	if (config.justifySelf) {
		const explainedValue = explainValue("justify-self", config.justifySelf);
		explanations.push(
			`This item is horizontally aligned to: ${explainedValue}.`,
		);
	}
	if (config.alignSelf) {
		const explainedValue = explainValue("align-self", config.alignSelf);
		explanations.push(`This item is vertically aligned to: ${explainedValue}.`);
	}
	if (config.placeSelf) {
		const explainedValue = explainValue("place-self", config.placeSelf);
		explanations.push(`This item uses place-self: ${explainedValue}.`);
	}

	// Order
	if (config.order !== undefined && config.order !== null) {
		const orderStr = String(config.order);
		const explainedValue = explainValue("order", orderStr);
		explanations.push(
			`This item has an order value of ${explainedValue}, affecting its placement order.`,
		);
	}

	// Sizing
	if (config.width) {
		const explainedValue = explainValue("width", config.width);
		explanations.push(`This item has a width of ${explainedValue}.`);
	}
	if (config.height) {
		const explainedValue = explainValue("height", config.height);
		explanations.push(`This item has a height of ${explainedValue}.`);
	}
	if (config.minWidth) {
		const explainedValue = explainValue("min-width", config.minWidth);
		explanations.push(`This item has a minimum width of ${explainedValue}.`);
	}
	if (config.minHeight) {
		const explainedValue = explainValue("min-height", config.minHeight);
		explanations.push(`This item has a minimum height of ${explainedValue}.`);
	}
	if (config.maxWidth) {
		const explainedValue = explainValue("max-width", config.maxWidth);
		explanations.push(`This item has a maximum width of ${explainedValue}.`);
	}
	if (config.maxHeight) {
		const explainedValue = explainValue("max-height", config.maxHeight);
		explanations.push(`This item has a maximum height of ${explainedValue}.`);
	}

	// Position
	if (config.position && config.position !== "static") {
		const explainedValue = explainValue("position", config.position);
		explanations.push(`This item uses ${explainedValue}.`);
		if (config.top) {
			const explainedTop = explainValue("top", config.top);
			explanations.push(`Positioned ${explainedTop} from the top.`);
		}
		if (config.right) {
			const explainedRight = explainValue("right", config.right);
			explanations.push(`Positioned ${explainedRight} from the right.`);
		}
		if (config.bottom) {
			const explainedBottom = explainValue("bottom", config.bottom);
			explanations.push(`Positioned ${explainedBottom} from the bottom.`);
		}
		if (config.left) {
			const explainedLeft = explainValue("left", config.left);
			explanations.push(`Positioned ${explainedLeft} from the left.`);
		}
		if (config.zIndex !== undefined && config.zIndex !== null) {
			const zIndexStr = String(config.zIndex);
			const explainedZIndex = explainValue("z-index", zIndexStr);
			explanations.push(`Has a z-index of ${explainedZIndex}.`);
		}
	}

	// Display (for nested layouts)
	if (config.display && config.display !== "block") {
		const explainedValue = explainValue("display", config.display);
		explanations.push(
			`This item uses ${explainedValue} as its internal display type.`,
		);
		if (config.display === "flex" || config.display === "inline-flex") {
			if (config.flexDirection) {
				const explainedFlexDir = explainValue(
					"flex-direction",
					config.flexDirection,
				);
				explanations.push(`Flex direction is set to ${explainedFlexDir}.`);
			}
			if (config.justifyContent) {
				const explainedJustify = explainValue(
					"justify-content",
					config.justifyContent,
				);
				explanations.push(`Content is justified with: ${explainedJustify}.`);
			}
			if (config.alignItems) {
				const explainedAlign = explainValue("align-items", config.alignItems);
				explanations.push(`Items are aligned with: ${explainedAlign}.`);
			}
		}
	}

	// Default explanation if nothing is configured
	if (explanations.length === 0) {
		return "This grid item has no specific configuration. It will be placed automatically in the next available grid cell.";
	}

	return explanations.join(" ");
}
