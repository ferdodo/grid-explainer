export interface GridChildConfiguration {
	// Grid Placement
	gridColumnStart?: string;
	gridColumnEnd?: string;
	gridRowStart?: string;
	gridRowEnd?: string;

	// Grid Placement Shorthand
	gridColumn?: string;
	gridRow?: string;
	gridArea?: string;

	// Alignment (Item)
	justifySelf?: "start" | "end" | "center" | "stretch" | "auto";
	alignSelf?: "start" | "end" | "center" | "stretch" | "auto" | "baseline";
	placeSelf?: string;

	// Order
	order?: string | number;

	// Sizing
	width?: string;
	height?: string;
	minWidth?: string;
	minHeight?: string;
	maxWidth?: string;
	maxHeight?: string;

	// Spacing
	padding?: string;
	margin?: string;
	border?: string;

	// Appearance
	backgroundColor?: string;
	color?: string;
	opacity?: string | number;

	// Position
	position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	zIndex?: string | number;

	// Overflow
	overflow?: "visible" | "hidden" | "scroll" | "auto";
	overflowX?: "visible" | "hidden" | "scroll" | "auto";
	overflowY?: "visible" | "hidden" | "scroll" | "auto";

	// Typography
	fontSize?: string;
	fontWeight?: string;
	fontFamily?: string;
	textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";

	// Flexbox (if used inside grid item)
	display?:
		| "block"
		| "inline"
		| "flex"
		| "inline-flex"
		| "grid"
		| "inline-grid";
	flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
	flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
	justifyContent?:
		| "flex-start"
		| "flex-end"
		| "center"
		| "space-between"
		| "space-around"
		| "space-evenly";
	alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
}
