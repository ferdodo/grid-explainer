import type { GridMinMax } from "../types";
import { gridTrackSizeToCss } from "./gridTrackSizeToCss";

/**
 * Converts a GridMinMax to a CSS string
 */
export function gridMinMaxToCss(minmax: GridMinMax): string {
	const minCss = gridTrackSizeToCss(minmax.min);
	const maxCss = gridTrackSizeToCss(minmax.max);
	return `minmax(${minCss}, ${maxCss})`;
}
