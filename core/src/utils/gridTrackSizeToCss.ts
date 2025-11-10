import type { GridTrackSize } from "../types";

/**
 * Converts a GridTrackSize to a CSS string
 */
export function gridTrackSizeToCss(size: GridTrackSize): string {
	// For units that don't need a numeric value
	if (
		size.unit === "auto" ||
		size.unit === "min-content" ||
		size.unit === "max-content"
	) {
		return size.unit;
	}

	// For units that require a numeric value
	if (size.value !== undefined) {
		return `${size.value}${size.unit}`;
	}

	// Fallback (shouldn't happen with proper types)
	return size.unit;
}
