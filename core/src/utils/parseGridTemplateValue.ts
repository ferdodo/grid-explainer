import type {
	GridTrackSize,
	GridMinMax,
	GridTemplateColumnValue,
	GridTemplateRowValue,
} from "../types";

/**
 * Parses a simple track size string (e.g., "1fr", "100px", "auto")
 */
function parseTrackSize(str: string): GridTrackSize {
	const trimmed = str.trim();

	// Special keywords that don't need a numeric value
	if (trimmed === "auto") {
		return { unit: "auto" };
	}
	if (trimmed === "min-content") {
		return { unit: "min-content" };
	}
	if (trimmed === "max-content") {
		return { unit: "max-content" };
	}

	// Parse numeric value with unit
	const match = trimmed.match(/^([\d.]+)(fr|px|%|em|rem|vh|vw)$/);
	if (match) {
		const numericValue = Number.parseFloat(match[1]);
		const unit = match[2] as GridTrackSize["unit"];
		return { value: numericValue, unit };
	}

	// Fallback: try to extract unit from common patterns
	if (trimmed.endsWith("fr")) {
		const num = Number.parseFloat(trimmed);
		return { value: Number.isNaN(num) ? undefined : num, unit: "fr" };
	}
	if (trimmed.endsWith("px")) {
		const num = Number.parseFloat(trimmed);
		return { value: Number.isNaN(num) ? undefined : num, unit: "px" };
	}
	if (trimmed.endsWith("%")) {
		const num = Number.parseFloat(trimmed);
		return { value: Number.isNaN(num) ? undefined : num, unit: "%" };
	}

	// Default fallback
	return { unit: "auto" };
}

/**
 * Parses a CSS track size string into GridTrackSize or GridMinMax
 */
export function parseGridTemplateValue(
	str: string,
): GridTemplateColumnValue | GridTemplateRowValue {
	const trimmed = str.trim();

	// Check for minmax() function
	const minmaxMatch = trimmed.match(/^minmax\((.+?),\s*(.+?)\)$/);
	if (minmaxMatch) {
		const min = parseTrackSize(minmaxMatch[1]);
		const max = parseTrackSize(minmaxMatch[2]);
		return { min, max } as GridMinMax;
	}

	// Parse as simple track size
	return parseTrackSize(trimmed);
}

