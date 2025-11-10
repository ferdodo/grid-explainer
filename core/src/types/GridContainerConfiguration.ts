import type { GridTemplateColumnsConfiguration } from "./GridTemplateColumnsConfiguration";
import type { GridTemplateRowsConfiguration } from "./GridTemplateRowsConfiguration";
import type { GridTemplateAreasConfiguration } from "./GridTemplateAreasConfiguration";

export interface GridContainerConfiguration {
	// Display
	display?: "grid" | "inline-grid" | "subgrid";

	// Grid Template
	gridTemplateColumns?: GridTemplateColumnsConfiguration;
	gridTemplateRows?: GridTemplateRowsConfiguration;
	gridTemplateAreas?: GridTemplateAreasConfiguration;

	// Grid Gaps
	gridColumnGap?: string;
	gridRowGap?: string;
	gap?: string;
	columnGap?: string;
	rowGap?: string;

	// Auto Flow
	gridAutoFlow?: "row" | "column" | "dense" | "row dense" | "column dense";
	gridAutoColumns?: string;
	gridAutoRows?: string;

	// Alignment (Container)
	justifyItems?: "start" | "end" | "center" | "stretch";
	alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
	justifyContent?:
		| "start"
		| "end"
		| "center"
		| "stretch"
		| "space-around"
		| "space-between"
		| "space-evenly";
	alignContent?:
		| "start"
		| "end"
		| "center"
		| "stretch"
		| "space-around"
		| "space-between"
		| "space-evenly"
		| "baseline";

	// Place Items/Content (Shorthand)
	placeItems?: string;
	placeContent?: string;

	// Other CSS properties that might affect grid
	width?: string;
	height?: string;
	minWidth?: string;
	minHeight?: string;
	maxWidth?: string;
	maxHeight?: string;

	padding?: string;
	margin?: string;
	border?: string;
	backgroundColor?: string;

	// Position
	position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;

	// Overflow
	overflow?: "visible" | "hidden" | "scroll" | "auto";
	overflowX?: "visible" | "hidden" | "scroll" | "auto";
	overflowY?: "visible" | "hidden" | "scroll" | "auto";
}
