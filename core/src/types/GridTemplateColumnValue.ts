import type { GridTrackSize } from "./GridTrackSize";
import type { GridMinMax } from "./GridMinMax";

/**
 * Represents a single track size value (can be a simple size or a minmax function)
 */
export type GridTemplateColumnValue = GridTrackSize | GridMinMax;
