import type { GridContainerConfiguration } from "../types";
import { explainValue } from "./explainValue";
import { gridTemplateColumnsConfigurationToCss } from "./gridTemplateColumnsConfigurationToCss";
import { gridTemplateRowsConfigurationToCss } from "./gridTemplateRowsConfigurationToCss";
import { gridTemplateAreasConfigurationToCss } from "./gridTemplateAreasConfigurationToCss";

export function explainGridContainerConfiguration(
	config: GridContainerConfiguration,
): string {
	const explanations: string[] = [];

	// Display
	if (config.display) {
		const explainedValue = explainValue("display", config.display);
		explanations.push(
			`The container uses CSS Grid with display: ${explainedValue}.`,
		);
	}

	// Grid Template Columns
	if (config.gridTemplateColumns) {
		const columnsCss = gridTemplateColumnsConfigurationToCss(
			config.gridTemplateColumns,
		);
		if (columnsCss) {
			const explainedValue = explainValue("grid-template-columns", columnsCss);
			explanations.push(
				`The grid defines ${columnsCss.includes(" ") ? "multiple columns" : "columns"} with template: ${explainedValue}.`,
			);
		}
	}

	// Grid Template Rows
	if (config.gridTemplateRows) {
		const rowsCss = gridTemplateRowsConfigurationToCss(config.gridTemplateRows);
		if (rowsCss) {
			const explainedValue = explainValue("grid-template-rows", rowsCss);
			explanations.push(
				`The grid defines ${rowsCss.includes(" ") ? "multiple rows" : "rows"} with template: ${explainedValue}.`,
			);
		}
	}

	// Grid Template Areas
	if (config.gridTemplateAreas) {
		const areasCss = gridTemplateAreasConfigurationToCss(
			config.gridTemplateAreas,
		);
		if (areasCss) {
			const explainedValue = explainValue("grid-template-areas", areasCss);
			explanations.push(`The grid uses named areas: ${explainedValue}.`);
		}
	}

	// Gaps
	if (config.gap) {
		const explainedValue = explainValue("gap", config.gap);
		explanations.push(
			`There is a gap of ${explainedValue} between all grid items.`,
		);
	} else {
		if (config.columnGap || config.gridColumnGap) {
			const gapValue = config.columnGap || config.gridColumnGap || "";
			const explainedValue = explainValue("column-gap", gapValue);
			explanations.push(
				`There is a column gap of ${explainedValue} between grid items.`,
			);
		}
		if (config.rowGap || config.gridRowGap) {
			const gapValue = config.rowGap || config.gridRowGap || "";
			const explainedValue = explainValue("row-gap", gapValue);
			explanations.push(
				`There is a row gap of ${explainedValue} between grid items.`,
			);
		}
	}

	// Auto Flow
	if (config.gridAutoFlow) {
		const explainedValue = explainValue("grid-auto-flow", config.gridAutoFlow);
		explanations.push(`Items are placed using ${explainedValue}.`);
	}

	// Auto Columns/Rows
	if (config.gridAutoColumns) {
		const explainedValue = explainValue(
			"grid-auto-columns",
			config.gridAutoColumns,
		);
		explanations.push(
			`Automatically created columns will have a size of ${explainedValue}.`,
		);
	}
	if (config.gridAutoRows) {
		const explainedValue = explainValue("grid-auto-rows", config.gridAutoRows);
		explanations.push(
			`Automatically created rows will have a size of ${explainedValue}.`,
		);
	}

	// Alignment - Items
	if (config.justifyItems) {
		const explainedValue = explainValue("justify-items", config.justifyItems);
		explanations.push(
			`All items are horizontally aligned to: ${explainedValue}.`,
		);
	}
	if (config.alignItems) {
		const explainedValue = explainValue("align-items", config.alignItems);
		explanations.push(
			`All items are vertically aligned to: ${explainedValue}.`,
		);
	}

	// Alignment - Content
	if (config.justifyContent) {
		const explainedValue = explainValue(
			"justify-content",
			config.justifyContent,
		);
		explanations.push(
			`The entire grid is horizontally aligned to: ${explainedValue}.`,
		);
	}
	if (config.alignContent) {
		const explainedValue = explainValue("align-content", config.alignContent);
		explanations.push(
			`The entire grid is vertically aligned to: ${explainedValue}.`,
		);
	}

	// Place Items/Content
	if (config.placeItems) {
		const explainedValue = explainValue("place-items", config.placeItems);
		explanations.push(
			`All items are positioned using place-items: ${explainedValue}.`,
		);
	}
	if (config.placeContent) {
		const explainedValue = explainValue("place-content", config.placeContent);
		explanations.push(
			`The grid content is positioned using place-content: ${explainedValue}.`,
		);
	}

	// Sizing
	if (config.width) {
		const explainedValue = explainValue("width", config.width);
		explanations.push(`The container has a width of ${explainedValue}.`);
	}
	if (config.height) {
		const explainedValue = explainValue("height", config.height);
		explanations.push(`The container has a height of ${explainedValue}.`);
	}
	if (config.minWidth) {
		const explainedValue = explainValue("min-width", config.minWidth);
		explanations.push(
			`The container has a minimum width of ${explainedValue}.`,
		);
	}
	if (config.minHeight) {
		const explainedValue = explainValue("min-height", config.minHeight);
		explanations.push(
			`The container has a minimum height of ${explainedValue}.`,
		);
	}
	if (config.maxWidth) {
		const explainedValue = explainValue("max-width", config.maxWidth);
		explanations.push(
			`The container has a maximum width of ${explainedValue}.`,
		);
	}
	if (config.maxHeight) {
		const explainedValue = explainValue("max-height", config.maxHeight);
		explanations.push(
			`The container has a maximum height of ${explainedValue}.`,
		);
	}

	// Default explanation if nothing is configured
	if (explanations.length === 0) {
		return "The grid container has no specific configuration. Items will be placed automatically in a single column.";
	}

	return explanations.join(" ");
}
