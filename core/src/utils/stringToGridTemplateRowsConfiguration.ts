import type { GridTemplateRowsConfiguration } from "../types";
import { parseGridTemplateValue } from "./parseGridTemplateValue";

/**
 * Converts a string to GridTemplateRowsConfiguration
 */
export function stringToGridTemplateRowsConfiguration(
	value: string | undefined,
): GridTemplateRowsConfiguration | undefined {
	if (!value || !value.trim()) {
		return undefined;
	}

	const trimmed = value.trim();

	// Check for repeat() function
	const repeatMatch = trimmed.match(/^repeat\((.+?),\s*(.+?)\)$/);
	if (repeatMatch) {
		const countStr = repeatMatch[1].trim();
		const valueStr = repeatMatch[2].trim();

		// Parse count
		let count: number | "auto-fit" | "auto-fill";
		if (countStr === "auto-fit") {
			count = "auto-fit";
		} else if (countStr === "auto-fill") {
			count = "auto-fill";
		} else {
			const num = Number.parseInt(countStr, 10);
			count = Number.isNaN(num) ? 1 : num;
		}

		// Parse value
		const parsedValue = parseGridTemplateValue(valueStr);

		return {
			repeat: {
				count,
				value: parsedValue,
			},
		};
	}

	// Parse as space-separated values
	const values = trimmed.split(/\s+/).map(parseGridTemplateValue);

	return { values };
}

