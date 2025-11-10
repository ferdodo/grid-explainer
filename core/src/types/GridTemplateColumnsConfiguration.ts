import type { GridTemplateColumnValue } from "./GridTemplateColumnValue";

export interface GridTemplateColumnsConfiguration {
	/**
	 * Track size values
	 * Can be a single value or multiple values
	 */
	values?: GridTemplateColumnValue[];

	/**
	 * Use repeat() function
	 * Example: { repeat: { count: 3, value: { value: 1, unit: "fr" } } } -> "repeat(3, 1fr)"
	 */
	repeat?: {
		count: number | "auto-fit" | "auto-fill";
		value: GridTemplateColumnValue;
	};
}
