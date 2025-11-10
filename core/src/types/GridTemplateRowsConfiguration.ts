import type { GridTemplateRowValue } from "./GridTemplateRowValue";

export interface GridTemplateRowsConfiguration {
	/**
	 * Track size values
	 * Can be a single value or multiple values
	 */
	values?: GridTemplateRowValue[];

	/**
	 * Use repeat() function
	 * Example: { repeat: { count: 2, value: { value: 100, unit: "px" } } } -> "repeat(2, 100px)"
	 */
	repeat?: {
		count: number | "auto-fit" | "auto-fill";
		value: GridTemplateRowValue;
	};
}
