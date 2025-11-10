import type { GridTrackSize } from "./GridTrackSize";

/**
 * Represents a minmax() function in CSS Grid
 */
export interface GridMinMax {
	/**
	 * Minimum size constraint
	 */
	min: GridTrackSize;

	/**
	 * Maximum size constraint
	 */
	max: GridTrackSize;
}
