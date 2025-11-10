import type { GridTemplateColumnsConfiguration } from "../types";
import { gridTrackValueToCss } from "./gridTrackValueToCss";

export function gridTemplateColumnsConfigurationToCss(
	config: GridTemplateColumnsConfiguration,
): string {
	// If repeat is provided, use it
	if (config.repeat) {
		const valueCss = gridTrackValueToCss(config.repeat.value);
		return `repeat(${config.repeat.count}, ${valueCss})`;
	}

	// If values are provided, join them
	if (config.values && config.values.length > 0) {
		return config.values.map(gridTrackValueToCss).join(" ");
	}

	// Fallback to empty string
	return "";
}
