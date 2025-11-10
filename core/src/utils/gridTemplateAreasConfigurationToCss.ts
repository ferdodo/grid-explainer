import type { GridTemplateAreasConfiguration } from "../types";

export function gridTemplateAreasConfigurationToCss(
	config: GridTemplateAreasConfiguration,
): string {
	// If areas are provided, format them as CSS grid-template-areas
	if (config.areas && config.areas.length > 0) {
		return config.areas.map((row) => `"${row.join(" ")}"`).join(" ");
	}

	// Fallback to empty string
	return "";
}
