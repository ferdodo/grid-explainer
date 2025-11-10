/**
 * CSS unit for grid track sizes
 */
export type GridTrackUnit =
	| "fr" // Fractional unit
	| "px" // Pixels
	| "%" // Percentage
	| "em" // Relative to font size
	| "rem" // Relative to root font size
	| "vh" // Viewport height
	| "vw" // Viewport width
	| "auto" // Auto sizing
	| "min-content" // Minimum content size
	| "max-content"; // Maximum content size
