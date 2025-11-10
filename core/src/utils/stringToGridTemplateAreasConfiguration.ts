import type { GridTemplateAreasConfiguration } from "../types";

/**
 * Converts a string to GridTemplateAreasConfiguration
 */
export function stringToGridTemplateAreasConfiguration(
	value: string | undefined,
): GridTemplateAreasConfiguration | undefined {
	if (!value || !value.trim()) {
		return undefined;
	}

	const trimmed = value.trim();

	// Match quoted strings
	const areaRows = trimmed.match(/"([^"]+)"/g);
	if (areaRows) {
		const areas = areaRows.map((row: string) =>
			row.replace(/"/g, "").trim().split(/\s+/),
		);
		return { areas };
	}

	// Fallback: treat as single row
	return {
		areas: [trimmed.split(/\s+/)],
	};
}

