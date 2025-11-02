import type { GridChildConfiguration } from "../types";

export function gridChildConfigurationToCss(
	config: GridChildConfiguration,
): string {
	const properties: string[] = [];

	// Grid Area (takes precedence)
	if (config.gridArea) {
		properties.push(`grid-area: ${config.gridArea};`);
	} else {
		// Grid Column
		if (config.gridColumn) {
			properties.push(`grid-column: ${config.gridColumn};`);
		} else {
			if (config.gridColumnStart) {
				properties.push(`grid-column-start: ${config.gridColumnStart};`);
			}
			if (config.gridColumnEnd) {
				properties.push(`grid-column-end: ${config.gridColumnEnd};`);
			}
		}

		// Grid Row
		if (config.gridRow) {
			properties.push(`grid-row: ${config.gridRow};`);
		} else {
			if (config.gridRowStart) {
				properties.push(`grid-row-start: ${config.gridRowStart};`);
			}
			if (config.gridRowEnd) {
				properties.push(`grid-row-end: ${config.gridRowEnd};`);
			}
		}
	}

	// Alignment
	if (config.justifySelf) {
		properties.push(`justify-self: ${config.justifySelf};`);
	}
	if (config.alignSelf) {
		properties.push(`align-self: ${config.alignSelf};`);
	}
	if (config.placeSelf) {
		properties.push(`place-self: ${config.placeSelf};`);
	}

	// Order
	if (config.order !== undefined && config.order !== null) {
		properties.push(`order: ${config.order};`);
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
	if (config.color) {
		properties.push(`color: ${config.color};`);
	}
	if (config.opacity !== undefined && config.opacity !== null) {
		properties.push(`opacity: ${config.opacity};`);
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
	if (config.zIndex !== undefined && config.zIndex !== null) {
		properties.push(`z-index: ${config.zIndex};`);
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

	// Typography
	if (config.fontSize) {
		properties.push(`font-size: ${config.fontSize};`);
	}
	if (config.fontWeight) {
		properties.push(`font-weight: ${config.fontWeight};`);
	}
	if (config.fontFamily) {
		properties.push(`font-family: ${config.fontFamily};`);
	}
	if (config.textAlign) {
		properties.push(`text-align: ${config.textAlign};`);
	}

	// Flexbox
	if (config.display) {
		properties.push(`display: ${config.display};`);
	}
	if (config.flexDirection) {
		properties.push(`flex-direction: ${config.flexDirection};`);
	}
	if (config.flexWrap) {
		properties.push(`flex-wrap: ${config.flexWrap};`);
	}
	if (config.justifyContent) {
		properties.push(`justify-content: ${config.justifyContent};`);
	}
	if (config.alignItems) {
		properties.push(`align-items: ${config.alignItems};`);
	}

	return properties.join("\n  ");
}
