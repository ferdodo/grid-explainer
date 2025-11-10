export function explainValue(property: string, value: string): string {
	const normalizedProperty = property.toLowerCase().trim();
	const normalizedValue = value.toLowerCase().trim();

	// Display properties
	if (normalizedProperty.includes("display")) {
		return explainDisplayValue(normalizedValue, value);
	}

	// Overflow values (must be checked before "flow" to avoid conflict)
	if (normalizedProperty.includes("overflow")) {
		return explainOverflowValue(normalizedValue, value);
	}

	// Flow direction (can be grid-auto-flow or flex-direction)
	if (
		normalizedProperty.includes("flow") ||
		normalizedProperty.includes("flex-direction")
	) {
		return explainFlowValue(normalizedValue, value, normalizedProperty);
	}

	// Alignment properties
	if (
		normalizedProperty.includes("justify") ||
		normalizedProperty.includes("align") ||
		normalizedProperty.includes("place")
	) {
		return explainAlignmentValue(normalizedValue, value, normalizedProperty);
	}

	// Grid template values
	if (normalizedProperty.includes("template")) {
		return explainTemplateValue(normalizedValue, value);
	}

	// Grid placement values
	if (
		normalizedProperty.includes("grid-column") ||
		normalizedProperty.includes("grid-row") ||
		normalizedProperty.includes("grid-area")
	) {
		return explainPlacementValue(normalizedValue, value);
	}

	// Sizing values
	if (
		normalizedProperty.includes("width") ||
		normalizedProperty.includes("height") ||
		normalizedProperty.includes("gap") ||
		normalizedProperty.includes("auto-rows") ||
		normalizedProperty.includes("auto-columns")
	) {
		return explainSizingValue(normalizedValue, value);
	}

	// Position values
	if (normalizedProperty.includes("position")) {
		return explainPositionValue(normalizedValue, value);
	}

	// Order values
	if (normalizedProperty.includes("order")) {
		return explainOrderValue(normalizedValue, value);
	}

	// Default: return the value as-is if no specific explanation
	return value;
}

function explainDisplayValue(
	normalizedValue: string,
	originalValue: string,
): string {
	switch (normalizedValue) {
		case "grid":
			return `${originalValue} (creates a grid container where items are placed in a defined grid structure)`;
		case "inline-grid":
			return `${originalValue} (creates an inline-level grid container, behaving like an inline element while containing a grid)`;
		case "subgrid":
			return `${originalValue} (creates a grid container that inherits the grid tracks from its parent grid)`;
		case "flex":
			return `${originalValue} (creates a flex container where items can flex and wrap)`;
		case "inline-flex":
			return `${originalValue} (creates an inline-level flex container)`;
		default:
			return originalValue;
	}
}

function explainFlowValue(
	normalizedValue: string,
	originalValue: string,
	property: string,
): string {
	const isFlex = property.includes("flex");

	if (isFlex) {
		switch (normalizedValue) {
			case "row":
				return `${originalValue} (items are laid out horizontally from left to right)`;
			case "row-reverse":
				return `${originalValue} (items are laid out horizontally from right to left)`;
			case "column":
				return `${originalValue} (items are laid out vertically from top to bottom)`;
			case "column-reverse":
				return `${originalValue} (items are laid out vertically from bottom to top)`;
			default:
				return originalValue;
		}
	}

	// Grid auto-flow
	if (normalizedValue.includes("dense")) {
		const direction = normalizedValue.replace("dense", "").trim() || "row";
		const directionText =
			direction === "column"
				? "vertically (column by column)"
				: "horizontally (row by row)";
		return `${originalValue} (items are placed ${directionText}, and the dense algorithm fills gaps by looking back for available spaces)`;
	}
	switch (normalizedValue) {
		case "row":
			return `${originalValue} (items are placed horizontally, filling each row before moving to the next)`;
		case "column":
			return `${originalValue} (items are placed vertically, filling each column before moving to the next)`;
		default:
			return originalValue;
	}
}

function explainAlignmentValue(
	normalizedValue: string,
	originalValue: string,
	property: string,
): string {
	const isJustify = property.includes("justify");
	const isAlign = property.includes("align");
	const isPlace = property.includes("place");
	const isContent = property.includes("content");
	const isSelf = property.includes("self");
	const isItems = property.includes("items");

	// Common alignment values
	switch (normalizedValue) {
		case "start":
			if (isJustify) {
				return isContent
					? `${originalValue} (aligns content to the start of the main axis - typically the left or top)`
					: `${originalValue} (aligns the item to the start of its grid area - typically the left)`;
			}
			if (isAlign) {
				return isContent
					? `${originalValue} (aligns content to the start of the cross axis - typically the top)`
					: `${originalValue} (aligns the item to the start of its grid area - typically the top)`;
			}
			return `${originalValue} (aligns to the start of the axis)`;
		case "end":
			if (isJustify) {
				return isContent
					? `${originalValue} (aligns content to the end of the main axis - typically the right or bottom)`
					: `${originalValue} (aligns the item to the end of its grid area - typically the right)`;
			}
			if (isAlign) {
				return isContent
					? `${originalValue} (aligns content to the end of the cross axis - typically the bottom)`
					: `${originalValue} (aligns the item to the end of its grid area - typically the bottom)`;
			}
			return `${originalValue} (aligns to the end of the axis)`;
		case "center":
			return `${originalValue} (centers the item or content within its area)`;
		case "stretch":
			if (isSelf || isItems) {
				return `${originalValue} (the item stretches to fill its grid area)`;
			}
			if (isContent) {
				return `${originalValue} (content stretches to fill the container)`;
			}
			return `${originalValue} (stretches to fill available space)`;
		case "baseline":
			return `${originalValue} (aligns items along their baseline - useful for text alignment)`;
		case "space-around":
			return `${originalValue} (distributes space evenly around items, with half-size spaces at the edges)`;
		case "space-between":
			return `${originalValue} (distributes space evenly between items, with no space at the edges)`;
		case "space-evenly":
			return `${originalValue} (distributes space evenly between items and around edges)`;
		case "auto":
			return isSelf
				? `${originalValue} (the item uses the alignment from justify-items or align-items on the container)`
				: `${originalValue} (uses default alignment behavior)`;
		case "flex-start":
			return `${originalValue} (aligns items to the start of the flex container)`;
		case "flex-end":
			return `${originalValue} (aligns items to the end of the flex container)`;
		default:
			return originalValue;
	}
}

function explainTemplateValue(
	normalizedValue: string,
	originalValue: string,
): string {
	if (normalizedValue.includes("repeat")) {
		return `${originalValue} (repeat() function - repeats a pattern of track sizes)`;
	}
	if (normalizedValue.includes("minmax")) {
		return `${originalValue} (minmax() function - defines a size range with minimum and maximum values)`;
	}
	if (normalizedValue.match(/^"[a-zA-Z\s-"]+"$/)) {
		return `${originalValue} (named grid areas - defines named regions in the grid)`;
	}
	if (normalizedValue.includes("fr")) {
		return `${originalValue} (fractional unit - distributes available space proportionally)`;
	}
	if (normalizedValue.includes("auto")) {
		return `${originalValue} (takes up available space based on content)`;
	}
	if (normalizedValue.match(/^\d+px$/)) {
		return `${originalValue} (fixed pixel size)`;
	}
	if (normalizedValue.match(/^\d+%$/)) {
		return `${originalValue} (percentage of container size)`;
	}
	return originalValue;
}

function explainPlacementValue(
	normalizedValue: string,
	originalValue: string,
): string {
	if (normalizedValue.includes("/")) {
		return `${originalValue} (grid line syntax - uses forward slash to separate start and end lines)`;
	}
	if (normalizedValue.includes("span")) {
		return `${originalValue} (span keyword - spans across a specified number of tracks)`;
	}
	if (normalizedValue.match(/^-?\d+$/)) {
		return `${originalValue} (grid line number - references a specific line in the grid)`;
	}
	if (normalizedValue.match(/^[a-zA-Z-]+$/)) {
		return `${originalValue} (named grid area - places item in a named area)`;
	}
	return originalValue;
}

function explainSizingValue(
	normalizedValue: string,
	originalValue: string,
): string {
	if (normalizedValue.includes("minmax")) {
		return `${originalValue} (minmax() function - defines minimum and maximum size constraints)`;
	}
	if (normalizedValue.includes("min-content")) {
		return `${originalValue} (smallest size that fits the content)`;
	}
	if (normalizedValue.includes("max-content")) {
		return `${originalValue} (smallest size that fits all content without wrapping)`;
	}
	if (normalizedValue.includes("fr")) {
		return `${originalValue} (fractional unit - takes a fraction of available space)`;
	}
	if (normalizedValue.includes("auto")) {
		return `${originalValue} (size based on content or available space)`;
	}
	if (normalizedValue.match(/^\d+px$/)) {
		return `${originalValue} (fixed pixel size)`;
	}
	if (normalizedValue.match(/^\d+%$/)) {
		return `${originalValue} (percentage of parent size)`;
	}
	if (normalizedValue.includes("rem")) {
		return `${originalValue} (root em unit - relative to root font size)`;
	}
	if (normalizedValue.includes("em")) {
		return `${originalValue} (em unit - relative to element's font size)`;
	}
	if (normalizedValue.includes("vh")) {
		return `${originalValue} (viewport height unit - percentage of viewport height)`;
	}
	if (normalizedValue.includes("vw")) {
		return `${originalValue} (viewport width unit - percentage of viewport width)`;
	}
	return originalValue;
}

function explainPositionValue(
	normalizedValue: string,
	originalValue: string,
): string {
	switch (normalizedValue) {
		case "static":
			return `${originalValue} (default position, follows normal document flow)`;
		case "relative":
			return `${originalValue} (positioned relative to its normal position, can use top/right/bottom/left)`;
		case "absolute":
			return `${originalValue} (positioned relative to nearest positioned ancestor, removed from normal flow)`;
		case "fixed":
			return `${originalValue} (positioned relative to viewport, stays in place when scrolling)`;
		case "sticky":
			return `${originalValue} (switches between relative and fixed based on scroll position)`;
		default:
			return originalValue;
	}
}

function explainOrderValue(
	normalizedValue: string,
	originalValue: string,
): string {
	const numValue = Number.parseInt(normalizedValue, 10);
	if (Number.isNaN(numValue)) {
		return originalValue;
	}
	if (numValue === 0) {
		return `${originalValue} (default order, appears in document order)`;
	}
	if (numValue > 0) {
		return `${originalValue} (appears later in visual order, after items with lower or default order)`;
	}
	return `${originalValue} (appears earlier in visual order, before items with higher or default order)`;
}

function explainOverflowValue(
	normalizedValue: string,
	originalValue: string,
): string {
	switch (normalizedValue) {
		case "visible":
			return `${originalValue} (content overflows and is visible outside the container)`;
		case "hidden":
			return `${originalValue} (content that overflows is clipped and hidden)`;
		case "scroll":
			return `${originalValue} (scrollbars are always shown, allowing scrolling even if content fits)`;
		case "auto":
			return `${originalValue} (scrollbars appear only when content overflows)`;
		default:
			return originalValue;
	}
}
