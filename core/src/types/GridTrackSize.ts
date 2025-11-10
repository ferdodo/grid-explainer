import type { GridTrackUnit } from "./GridTrackUnit";

/**
 * Represents a grid track size value
 */
export interface GridTrackSize {
	/**
	 * Numeric value (required for units that need a number)
	 * For "auto", "min-content", "max-content", this can be undefined
	 */
	value?: number;

	/**
	 * CSS unit for the track size
	 */
	unit: GridTrackUnit;
}
