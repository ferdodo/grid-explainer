import type { GridContainerConfiguration } from "../types";

export function gridContainerConfigurationToCss(
	config: GridContainerConfiguration,
): string {
	const properties: string[] = [];

	// Display
	if (config.display) {
		properties.push(`display: ${config.display};`);
	}

	// Grid Template
	if (config.gridTemplateColumns) {
		properties.push(`grid-template-columns: ${config.gridTemplateColumns};`);
	}
	if (config.gridTemplateRows) {
		properties.push(`grid-template-rows: ${config.gridTemplateRows};`);
	}
	if (config.gridTemplateAreas) {
		properties.push(`grid-template-areas: ${config.gridTemplateAreas};`);
	}

	// Gaps (gap takes precedence)
	if (config.gap) {
		properties.push(`gap: ${config.gap};`);
	} else {
		if (config.columnGap || config.gridColumnGap) {
			properties.push(
				`column-gap: ${config.columnGap || config.gridColumnGap};`,
			);
		}
		if (config.rowGap || config.gridRowGap) {
			properties.push(`row-gap: ${config.rowGap || config.gridRowGap};`);
		}
	}

	// Auto Flow
	if (config.gridAutoFlow) {
		properties.push(`grid-auto-flow: ${config.gridAutoFlow};`);
	}
	if (config.gridAutoColumns) {
		properties.push(`grid-auto-columns: ${config.gridAutoColumns};`);
	}
	if (config.gridAutoRows) {
		properties.push(`grid-auto-rows: ${config.gridAutoRows};`);
	}

	// Alignment - Items
	if (config.justifyItems) {
		properties.push(`justify-items: ${config.justifyItems};`);
	}
	if (config.alignItems) {
		properties.push(`align-items: ${config.alignItems};`);
	}

	// Alignment - Content
	if (config.justifyContent) {
		properties.push(`justify-content: ${config.justifyContent};`);
	}
	if (config.alignContent) {
		properties.push(`align-content: ${config.alignContent};`);
	}

	// Place Items/Content
	if (config.placeItems) {
		properties.push(`place-items: ${config.placeItems};`);
	}
	if (config.placeContent) {
		properties.push(`place-content: ${config.placeContent};`);
	}

	// Sizing
	if (config.width) {
		properties.push(`width: ${config.width};`);
	}
	if (config.height) {
		properties.push(`height: ${config.height};`);
	}
	if (config.minWidth) {
		properties.push(`min-width: ${config.minWidth};`);
	}
	if (config.minHeight) {
		properties.push(`min-height: ${config.minHeight};`);
	}
	if (config.maxWidth) {
		properties.push(`max-width: ${config.maxWidth};`);
	}
	if (config.maxHeight) {
		properties.push(`max-height: ${config.maxHeight};`);
	}

	// Spacing
	if (config.padding) {
		properties.push(`padding: ${config.padding};`);
	}
	if (config.margin) {
		properties.push(`margin: ${config.margin};`);
	}
	if (config.border) {
		properties.push(`border: ${config.border};`);
	}

	// Appearance
	if (config.backgroundColor) {
		properties.push(`background-color: ${config.backgroundColor};`);
	}

	// Position
	if (config.position) {
		properties.push(`position: ${config.position};`);
	}
	if (config.top) {
		properties.push(`top: ${config.top};`);
	}
	if (config.right) {
		properties.push(`right: ${config.right};`);
	}
	if (config.bottom) {
		properties.push(`bottom: ${config.bottom};`);
	}
	if (config.left) {
		properties.push(`left: ${config.left};`);
	}

	// Overflow
	if (config.overflow) {
		properties.push(`overflow: ${config.overflow};`);
	}
	if (config.overflowX) {
		properties.push(`overflow-x: ${config.overflowX};`);
	}
	if (config.overflowY) {
		properties.push(`overflow-y: ${config.overflowY};`);
	}

	return properties.join("\n  ");
}
