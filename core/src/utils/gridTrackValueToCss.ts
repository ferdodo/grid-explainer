import type { GridTrackSize, GridMinMax } from "../types";
import { gridTrackSizeToCss } from "./gridTrackSizeToCss";
import { gridMinMaxToCss } from "./gridMinMaxToCss";

/**
 * Converts a track value (GridTrackSize | GridMinMax) to CSS string
 */
export function gridTrackValueToCss(value: GridTrackSize | GridMinMax): string {
	if ("min" in value && "max" in value) {
		return gridMinMaxToCss(value);
	}
	return gridTrackSizeToCss(value);
}
