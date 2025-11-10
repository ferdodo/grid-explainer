import { useState, useEffect } from "react";
import type { GridContainerConfiguration } from "../GridContainerConfiguration.js";

// Local types matching core types
type GridTrackUnit =
	| "fr"
	| "px"
	| "%"
	| "em"
	| "rem"
	| "vh"
	| "vw"
	| "auto"
	| "min-content"
	| "max-content";

interface GridTrackSize {
	value?: number;
	unit: GridTrackUnit;
}

interface GridMinMax {
	min: GridTrackSize;
	max: GridTrackSize;
}

type GridTemplateValue = GridTrackSize | GridMinMax;

interface GridTemplateConfiguration {
	values?: GridTemplateValue[];
	repeat?: {
		count: number | "auto-fit" | "auto-fill";
		value: GridTemplateValue;
	};
}

interface Props {
	config: GridContainerConfiguration;
	onChange: (config: GridContainerConfiguration) => void;
}

// Helper to convert GridTrackSize to CSS string
function trackSizeToCss(size: GridTrackSize): string {
	if (
		size.unit === "auto" ||
		size.unit === "min-content" ||
		size.unit === "max-content"
	) {
		return size.unit;
	}
	if (size.value !== undefined) {
		return `${size.value}${size.unit}`;
	}
	return size.unit;
}

// Helper to convert GridMinMax to CSS string
function minMaxToCss(minmax: GridMinMax): string {
	return `minmax(${trackSizeToCss(minmax.min)}, ${trackSizeToCss(minmax.max)})`;
}

// Helper to convert GridTemplateValue to CSS string
function valueToCss(value: GridTemplateValue): string {
	if ("min" in value && "max" in value) {
		return minMaxToCss(value);
	}
	return trackSizeToCss(value);
}

// Helper to convert GridTemplateConfiguration to CSS string
function configToCss(config: GridTemplateConfiguration): string {
	if (config.repeat) {
		return `repeat(${config.repeat.count}, ${valueToCss(config.repeat.value)})`;
	}
	if (config.values && config.values.length > 0) {
		return config.values.map(valueToCss).join(" ");
	}
	return "";
}

export function GridContainerConfigurator({ config, onChange }: Props) {
	const [columnsConfig, setColumnsConfig] = useState<GridTemplateConfiguration>(
		{},
	);
	const [rowsConfig, setRowsConfig] = useState<GridTemplateConfiguration>({});
	const [areasConfig, setAreasConfig] = useState<string[][]>([]);
	const [useRepeatColumns, setUseRepeatColumns] = useState(false);
	const [useRepeatRows, setUseRepeatRows] = useState(false);

	// Parse string configs on mount/change
	useEffect(() => {
		if (
			config.gridTemplateColumns &&
			typeof config.gridTemplateColumns === "string"
		) {
			// Try to parse as repeat
			const repeatMatch = config.gridTemplateColumns.match(
				/^repeat\((.+?),\s*(.+?)\)$/,
			);
			if (repeatMatch) {
				setUseRepeatColumns(true);
				// Simplified parsing - would need full parser for production
			} else {
				setUseRepeatColumns(false);
			}
		}
		if (
			config.gridTemplateRows &&
			typeof config.gridTemplateRows === "string"
		) {
			const repeatMatch = config.gridTemplateRows.match(
				/^repeat\((.+?),\s*(.+?)\)$/,
			);
			if (repeatMatch) {
				setUseRepeatRows(true);
			} else {
				setUseRepeatRows(false);
			}
		}
		if (
			config.gridTemplateAreas &&
			typeof config.gridTemplateAreas === "string"
		) {
			const areaRows = config.gridTemplateAreas.match(/"([^"]+)"/g);
			if (areaRows) {
				setAreasConfig(
					areaRows.map((row) => row.replace(/"/g, "").trim().split(/\s+/)),
				);
			}
		}
	}, [
		config.gridTemplateColumns,
		config.gridTemplateRows,
		config.gridTemplateAreas,
	]);

	const updateField = (
		field: keyof GridContainerConfiguration,
		value: string | undefined,
	) => {
		onChange({
			...config,
			[field]: value || undefined,
		});
	};

	const updateColumnsConfig = (newConfig: GridTemplateConfiguration) => {
		setColumnsConfig(newConfig);
		onChange({
			...config,
			gridTemplateColumns: configToCss(newConfig),
		});
	};

	const updateRowsConfig = (newConfig: GridTemplateConfiguration) => {
		setRowsConfig(newConfig);
		onChange({
			...config,
			gridTemplateRows: configToCss(newConfig),
		});
	};

	const updateAreasConfig = (newAreas: string[][]) => {
		const areasString =
			newAreas.length > 0
				? newAreas.map((row) => `"${row.join(" ")}"`).join(" ")
				: undefined;
		setAreasConfig(newAreas);
		onChange({
			...config,
			gridTemplateAreas: areasString,
		});
	};

	const fieldId = (name: string) =>
		`container-${name.replace(/[^a-zA-Z0-9]/g, "-")}`;

	return (
		<div className="config-form">
			{/* Grid Template Columns and Rows - Double Column Layout with Display */}
			<div className="form-group grid-template-item">
				<label htmlFor={fieldId("display")}>Display</label>
				<select
					id={fieldId("display")}
					value={config.display || ""}
					onChange={(e) => updateField("display", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="grid">grid</option>
					<option value="inline-grid">inline-grid</option>
					<option value="subgrid">subgrid</option>
				</select>
			</div>
			{/* Grid Template Columns - Structured Interface */}
			<div
				className="form-group grid-template-item"
				style={{ marginTop: "30px", marginBottom: "30px" }}
			>
				<label>grid-template-columns</label>
				<div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
					<button
						type="button"
						onClick={() => {
							setUseRepeatColumns(false);
							updateColumnsConfig({ values: [] });
						}}
						style={{
							padding: "5px 10px",
							backgroundColor: !useRepeatColumns ? "#667eea" : "#e0e0e0",
							color: !useRepeatColumns ? "white" : "black",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Values
					</button>
					<button
						type="button"
						onClick={() => {
							setUseRepeatColumns(true);
							updateColumnsConfig({
								repeat: { count: 3, value: { value: 1, unit: "fr" } },
							});
						}}
						style={{
							padding: "5px 10px",
							backgroundColor: useRepeatColumns ? "#667eea" : "#e0e0e0",
							color: useRepeatColumns ? "white" : "black",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Repeat
					</button>
				</div>
				{useRepeatColumns ? (
					<div
						style={{
							display: "flex",
							gap: "10px",
							flexWrap: "wrap",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
							<label style={{ fontSize: "0.9rem", marginRight: "5px" }}>
								Count:
							</label>
							<select
								value={
									typeof columnsConfig.repeat?.count === "string"
										? columnsConfig.repeat.count
										: "number"
								}
								onChange={(e) => {
									const countType = e.target.value;
									let count: number | "auto-fit" | "auto-fill";
									if (countType === "auto-fit") {
										count = "auto-fit";
									} else if (countType === "auto-fill") {
										count = "auto-fill";
									} else {
										count =
											typeof columnsConfig.repeat?.count === "number"
												? columnsConfig.repeat.count
												: 3;
									}
									updateColumnsConfig({
										repeat: {
											count,
											value: columnsConfig.repeat?.value || {
												value: 1,
												unit: "fr",
											},
										},
									});
								}}
								style={{
									padding: "5px",
									borderRadius: "4px",
									border: "1px solid #ddd",
								}}
							>
								<option value="number">Number</option>
								<option value="auto-fit">auto-fit</option>
								<option value="auto-fill">auto-fill</option>
							</select>
						</div>
						{typeof columnsConfig.repeat?.count === "number" && (
							<input
								type="number"
								placeholder="Count"
								min="1"
								value={columnsConfig.repeat.count || 3}
								onChange={(e) => {
									const count = Number.parseInt(e.target.value, 10) || 1;
									updateColumnsConfig({
										repeat: {
											count,
											value: columnsConfig.repeat?.value || {
												value: 1,
												unit: "fr",
											},
										},
									});
								}}
								style={{
									width: "100px",
									padding: "5px",
									borderRadius: "4px",
									border: "1px solid #ddd",
								}}
							/>
						)}
						<div
							style={{
								display: "flex",
								gap: "5px",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<label style={{ fontSize: "0.9rem", marginRight: "5px" }}>
								Value:
							</label>
							<button
								type="button"
								onClick={() => {
									const currentValue = columnsConfig.repeat?.value || {
										unit: "fr",
									};
									if ("min" in currentValue) {
										// Convert minmax to simple value (use min as default)
										updateColumnsConfig({
											repeat: {
												count: columnsConfig.repeat?.count || 3,
												value: currentValue.min,
											},
										});
									}
								}}
								style={{
									padding: "5px 10px",
									backgroundColor:
										columnsConfig.repeat?.value &&
										!("min" in columnsConfig.repeat.value)
											? "#667eea"
											: "#e0e0e0",
									color:
										columnsConfig.repeat?.value &&
										!("min" in columnsConfig.repeat.value)
											? "white"
											: "black",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									fontSize: "0.85rem",
								}}
							>
								Simple
							</button>
							<button
								type="button"
								onClick={() => {
									const currentValue = columnsConfig.repeat?.value || {
										value: 1,
										unit: "fr",
									};
									if (!("min" in currentValue)) {
										// Convert simple value to minmax
										updateColumnsConfig({
											repeat: {
												count: columnsConfig.repeat?.count || 3,
												value: {
													min: currentValue,
													max: { value: 1, unit: "fr" },
												},
											},
										});
									}
								}}
								style={{
									padding: "5px 10px",
									backgroundColor:
										columnsConfig.repeat?.value &&
										"min" in columnsConfig.repeat.value
											? "#667eea"
											: "#e0e0e0",
									color:
										columnsConfig.repeat?.value &&
										"min" in columnsConfig.repeat.value
											? "white"
											: "black",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									fontSize: "0.85rem",
								}}
							>
								minmax()
							</button>
						</div>
						{columnsConfig.repeat?.value &&
						"min" in columnsConfig.repeat.value &&
						columnsConfig.repeat ? (
							// minmax() mode
							(() => {
								const minmaxValue = columnsConfig.repeat.value as GridMinMax;
								return (
									<div
										style={{
											display: "flex",
											gap: "10px",
											flexWrap: "wrap",
											alignItems: "center",
											width: "100%",
										}}
									>
										<div
											style={{
												display: "flex",
												gap: "5px",
												alignItems: "center",
											}}
										>
											<label style={{ fontSize: "0.85rem" }}>min:</label>
											<input
												type="number"
												placeholder="Min"
												value={
													minmaxValue.min.value !== undefined
														? minmaxValue.min.value
														: ""
												}
												onChange={(e) => {
													const value =
														Number.parseFloat(e.target.value) || undefined;
													updateColumnsConfig({
														repeat: {
															count: columnsConfig.repeat?.count || 3,
															value: {
																min: {
																	...minmaxValue.min,
																	value,
																},
																max: minmaxValue.max,
															},
														},
													});
												}}
												style={{
													width: "80px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											/>
											<select
												value={minmaxValue.min.unit}
												onChange={(e) => {
													const unit = e.target.value as GridTrackUnit;
													updateColumnsConfig({
														repeat: {
															count: columnsConfig.repeat?.count || 3,
															value: {
																min: {
																	...minmaxValue.min,
																	unit,
																},
																max: minmaxValue.max,
															},
														},
													});
												}}
												style={{
													width: "100px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											>
												<option value="fr">fr</option>
												<option value="px">px</option>
												<option value="%">%</option>
												<option value="em">em</option>
												<option value="rem">rem</option>
												<option value="vh">vh</option>
												<option value="vw">vw</option>
												<option value="auto">auto</option>
												<option value="min-content">min-content</option>
												<option value="max-content">max-content</option>
											</select>
										</div>
										<div
											style={{
												display: "flex",
												gap: "5px",
												alignItems: "center",
											}}
										>
											<label style={{ fontSize: "0.85rem" }}>max:</label>
											<input
												type="number"
												placeholder="Max"
												value={
													minmaxValue.max.value !== undefined
														? minmaxValue.max.value
														: ""
												}
												onChange={(e) => {
													const value =
														Number.parseFloat(e.target.value) || undefined;
													updateColumnsConfig({
														repeat: {
															count: columnsConfig.repeat?.count || 3,
															value: {
																min: minmaxValue.min,
																max: {
																	...minmaxValue.max,
																	value,
																},
															},
														},
													});
												}}
												style={{
													width: "80px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											/>
											<select
												value={minmaxValue.max.unit}
												onChange={(e) => {
													const unit = e.target.value as GridTrackUnit;
													updateColumnsConfig({
														repeat: {
															count: columnsConfig.repeat?.count || 3,
															value: {
																min: minmaxValue.min,
																max: {
																	...minmaxValue.max,
																	unit,
																},
															},
														},
													});
												}}
												style={{
													width: "100px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											>
												<option value="fr">fr</option>
												<option value="px">px</option>
												<option value="%">%</option>
												<option value="em">em</option>
												<option value="rem">rem</option>
												<option value="vh">vh</option>
												<option value="vw">vw</option>
												<option value="auto">auto</option>
												<option value="min-content">min-content</option>
												<option value="max-content">max-content</option>
											</select>
										</div>
									</div>
								);
							})()
						) : (
							// Simple value mode
							<div
								style={{ display: "flex", gap: "5px", alignItems: "center" }}
							>
								<input
									type="number"
									placeholder="Value"
									value={
										columnsConfig.repeat?.value &&
										"value" in columnsConfig.repeat.value
											? columnsConfig.repeat.value.value
											: ""
									}
									onChange={(e) => {
										const value =
											Number.parseFloat(e.target.value) || undefined;
										const currentValue = columnsConfig.repeat?.value || {
											unit: "fr",
										};
										updateColumnsConfig({
											repeat: {
												count: columnsConfig.repeat?.count || 3,
												value:
													"min" in currentValue
														? currentValue
														: { ...currentValue, value },
											},
										});
									}}
									style={{
										width: "100px",
										padding: "5px",
										borderRadius: "4px",
										border: "1px solid #ddd",
									}}
								/>
								<select
									value={
										columnsConfig.repeat?.value &&
										"unit" in columnsConfig.repeat.value
											? columnsConfig.repeat.value.unit
											: "fr"
									}
									onChange={(e) => {
										const unit = e.target.value as GridTrackUnit;
										const currentValue = columnsConfig.repeat?.value || {
											unit: "fr",
										};
										updateColumnsConfig({
											repeat: {
												count: columnsConfig.repeat?.count || 3,
												value:
													"min" in currentValue
														? currentValue
														: { ...currentValue, unit },
											},
										});
									}}
									style={{
										width: "100px",
										padding: "5px",
										borderRadius: "4px",
										border: "1px solid #ddd",
									}}
								>
									<option value="fr">fr</option>
									<option value="px">px</option>
									<option value="%">%</option>
									<option value="em">em</option>
									<option value="rem">rem</option>
									<option value="vh">vh</option>
									<option value="vw">vw</option>
									<option value="auto">auto</option>
									<option value="min-content">min-content</option>
									<option value="max-content">max-content</option>
								</select>
							</div>
						)}
					</div>
				) : (
					<div>
						{(columnsConfig.values || []).length > 0 && (
							<div
								style={{
									display: "flex",
									gap: "10px",
									flexWrap: "wrap",
									marginBottom: "10px",
								}}
							>
								{(columnsConfig.values || []).map((value, index) => (
									<div
										key={index}
										style={{
											display: "flex",
											gap: "5px",
											alignItems: "center",
										}}
									>
										{"min" in value ? (
											<span>minmax(...)</span>
										) : (
											<>
												<input
													type="number"
													placeholder="Value"
													value={value.value || ""}
													onChange={(e) => {
														const newValues = [...(columnsConfig.values || [])];
														const val =
															Number.parseFloat(e.target.value) || undefined;
														newValues[index] = { ...value, value: val };
														updateColumnsConfig({ values: newValues });
													}}
													style={{ width: "80px" }}
												/>
												<select
													value={value.unit}
													onChange={(e) => {
														const newValues = [...(columnsConfig.values || [])];
														newValues[index] = {
															...value,
															unit: e.target.value as GridTrackUnit,
														};
														updateColumnsConfig({ values: newValues });
													}}
													style={{ width: "100px" }}
												>
													<option value="fr">fr</option>
													<option value="px">px</option>
													<option value="%">%</option>
													<option value="em">em</option>
													<option value="rem">rem</option>
													<option value="vh">vh</option>
													<option value="vw">vw</option>
													<option value="auto">auto</option>
													<option value="min-content">min-content</option>
													<option value="max-content">max-content</option>
												</select>
											</>
										)}
										<button
											type="button"
											onClick={() => {
												const newValues = [...(columnsConfig.values || [])];
												newValues.splice(index, 1);
												updateColumnsConfig({ values: newValues });
											}}
											style={{
												padding: "2px 8px",
												backgroundColor: "#e74c3c",
												color: "white",
												border: "none",
												borderRadius: "4px",
												cursor: "pointer",
											}}
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
						{(columnsConfig.values || []).length === 0 ? (
							<button
								type="button"
								onClick={() => {
									updateColumnsConfig({
										values: [
											...(columnsConfig.values || []),
											{ value: 1, unit: "fr" },
										],
									});
								}}
								style={{
									padding: "5px 10px",
									backgroundColor: "#667eea",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								+ Add Value
							</button>
						) : (
							<button
								type="button"
								onClick={() => {
									updateColumnsConfig({
										values: [
											...(columnsConfig.values || []),
											{ value: 1, unit: "fr" },
										],
									});
								}}
								style={{
									padding: "5px 10px",
									backgroundColor: "#667eea",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									marginTop: "5px",
								}}
							>
								+ Add Value
							</button>
						)}
					</div>
				)}
			</div>

			{/* Grid Template Rows - Structured Interface */}
			<div
				className="form-group grid-template-item"
				style={{ marginTop: "30px", marginBottom: "30px" }}
			>
				<label>grid-template-rows</label>
				<div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
					<button
						type="button"
						onClick={() => {
							setUseRepeatRows(false);
							updateRowsConfig({ values: [] });
						}}
						style={{
							padding: "5px 10px",
							backgroundColor: !useRepeatRows ? "#667eea" : "#e0e0e0",
							color: !useRepeatRows ? "white" : "black",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Values
					</button>
					<button
						type="button"
						onClick={() => {
							setUseRepeatRows(true);
							updateRowsConfig({
								repeat: { count: 2, value: { value: 100, unit: "px" } },
							});
						}}
						style={{
							padding: "5px 10px",
							backgroundColor: useRepeatRows ? "#667eea" : "#e0e0e0",
							color: useRepeatRows ? "white" : "black",
							border: "none",
							borderRadius: "4px",
							cursor: "pointer",
						}}
					>
						Repeat
					</button>
				</div>
				{useRepeatRows ? (
					<div
						style={{
							display: "flex",
							gap: "10px",
							flexWrap: "wrap",
							alignItems: "center",
						}}
					>
						<div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
							<label style={{ fontSize: "0.9rem", marginRight: "5px" }}>
								Count:
							</label>
							<select
								value={
									typeof rowsConfig.repeat?.count === "string"
										? rowsConfig.repeat.count
										: "number"
								}
								onChange={(e) => {
									const countType = e.target.value;
									let count: number | "auto-fit" | "auto-fill";
									if (countType === "auto-fit") {
										count = "auto-fit";
									} else if (countType === "auto-fill") {
										count = "auto-fill";
									} else {
										count =
											typeof rowsConfig.repeat?.count === "number"
												? rowsConfig.repeat.count
												: 2;
									}
									updateRowsConfig({
										repeat: {
											count,
											value: rowsConfig.repeat?.value || {
												value: 100,
												unit: "px",
											},
										},
									});
								}}
								style={{
									padding: "5px",
									borderRadius: "4px",
									border: "1px solid #ddd",
								}}
							>
								<option value="number">Number</option>
								<option value="auto-fit">auto-fit</option>
								<option value="auto-fill">auto-fill</option>
							</select>
						</div>
						{typeof rowsConfig.repeat?.count === "number" && (
							<input
								type="number"
								placeholder="Count"
								min="1"
								value={rowsConfig.repeat.count || 2}
								onChange={(e) => {
									const count = Number.parseInt(e.target.value, 10) || 1;
									updateRowsConfig({
										repeat: {
											count,
											value: rowsConfig.repeat?.value || {
												value: 100,
												unit: "px",
											},
										},
									});
								}}
								style={{
									width: "100px",
									padding: "5px",
									borderRadius: "4px",
									border: "1px solid #ddd",
								}}
							/>
						)}
						<div
							style={{
								display: "flex",
								gap: "5px",
								alignItems: "center",
								flexWrap: "wrap",
							}}
						>
							<label style={{ fontSize: "0.9rem", marginRight: "5px" }}>
								Value:
							</label>
							<button
								type="button"
								onClick={() => {
									const currentValue = rowsConfig.repeat?.value || {
										unit: "px",
									};
									if ("min" in currentValue) {
										// Convert minmax to simple value (use min as default)
										updateRowsConfig({
											repeat: {
												count: rowsConfig.repeat?.count || 2,
												value: currentValue.min,
											},
										});
									}
								}}
								style={{
									padding: "5px 10px",
									backgroundColor:
										rowsConfig.repeat?.value &&
										!("min" in rowsConfig.repeat.value)
											? "#667eea"
											: "#e0e0e0",
									color:
										rowsConfig.repeat?.value &&
										!("min" in rowsConfig.repeat.value)
											? "white"
											: "black",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									fontSize: "0.85rem",
								}}
							>
								Simple
							</button>
							<button
								type="button"
								onClick={() => {
									const currentValue = rowsConfig.repeat?.value || {
										value: 100,
										unit: "px",
									};
									if (!("min" in currentValue)) {
										// Convert simple value to minmax
										updateRowsConfig({
											repeat: {
												count: rowsConfig.repeat?.count || 2,
												value: {
													min: currentValue,
													max: { value: 1, unit: "fr" },
												},
											},
										});
									}
								}}
								style={{
									padding: "5px 10px",
									backgroundColor:
										rowsConfig.repeat?.value && "min" in rowsConfig.repeat.value
											? "#667eea"
											: "#e0e0e0",
									color:
										rowsConfig.repeat?.value && "min" in rowsConfig.repeat.value
											? "white"
											: "black",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									fontSize: "0.85rem",
								}}
							>
								minmax()
							</button>
						</div>
						{rowsConfig.repeat?.value &&
						"min" in rowsConfig.repeat.value &&
						rowsConfig.repeat ? (
							// minmax() mode
							(() => {
								const minmaxValue = rowsConfig.repeat.value as GridMinMax;
								return (
									<div
										style={{
											display: "flex",
											gap: "10px",
											flexWrap: "wrap",
											alignItems: "center",
											width: "100%",
										}}
									>
										<div
											style={{
												display: "flex",
												gap: "5px",
												alignItems: "center",
											}}
										>
											<label style={{ fontSize: "0.85rem" }}>min:</label>
											<input
												type="number"
												placeholder="Min"
												value={
													minmaxValue.min.value !== undefined
														? minmaxValue.min.value
														: ""
												}
												onChange={(e) => {
													const value =
														Number.parseFloat(e.target.value) || undefined;
													updateRowsConfig({
														repeat: {
															count: rowsConfig.repeat?.count || 2,
															value: {
																min: {
																	...minmaxValue.min,
																	value,
																},
																max: minmaxValue.max,
															},
														},
													});
												}}
												style={{
													width: "80px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											/>
											<select
												value={minmaxValue.min.unit}
												onChange={(e) => {
													const unit = e.target.value as GridTrackUnit;
													updateRowsConfig({
														repeat: {
															count: rowsConfig.repeat?.count || 2,
															value: {
																min: {
																	...minmaxValue.min,
																	unit,
																},
																max: minmaxValue.max,
															},
														},
													});
												}}
												style={{
													width: "100px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											>
												<option value="fr">fr</option>
												<option value="px">px</option>
												<option value="%">%</option>
												<option value="em">em</option>
												<option value="rem">rem</option>
												<option value="vh">vh</option>
												<option value="vw">vw</option>
												<option value="auto">auto</option>
												<option value="min-content">min-content</option>
												<option value="max-content">max-content</option>
											</select>
										</div>
										<div
											style={{
												display: "flex",
												gap: "5px",
												alignItems: "center",
											}}
										>
											<label style={{ fontSize: "0.85rem" }}>max:</label>
											<input
												type="number"
												placeholder="Max"
												value={
													minmaxValue.max.value !== undefined
														? minmaxValue.max.value
														: ""
												}
												onChange={(e) => {
													const value =
														Number.parseFloat(e.target.value) || undefined;
													updateRowsConfig({
														repeat: {
															count: rowsConfig.repeat?.count || 2,
															value: {
																min: minmaxValue.min,
																max: {
																	...minmaxValue.max,
																	value,
																},
															},
														},
													});
												}}
												style={{
													width: "80px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											/>
											<select
												value={minmaxValue.max.unit}
												onChange={(e) => {
													const unit = e.target.value as GridTrackUnit;
													updateRowsConfig({
														repeat: {
															count: rowsConfig.repeat?.count || 2,
															value: {
																min: minmaxValue.min,
																max: {
																	...minmaxValue.max,
																	unit,
																},
															},
														},
													});
												}}
												style={{
													width: "100px",
													padding: "5px",
													borderRadius: "4px",
													border: "1px solid #ddd",
												}}
											>
												<option value="fr">fr</option>
												<option value="px">px</option>
												<option value="%">%</option>
												<option value="em">em</option>
												<option value="rem">rem</option>
												<option value="vh">vh</option>
												<option value="vw">vw</option>
												<option value="auto">auto</option>
												<option value="min-content">min-content</option>
												<option value="max-content">max-content</option>
											</select>
										</div>
									</div>
								);
							})()
						) : (
							// Simple value mode
							<div
								style={{ display: "flex", gap: "5px", alignItems: "center" }}
							>
								<input
									type="number"
									placeholder="Value"
									value={
										rowsConfig.repeat?.value &&
										"value" in rowsConfig.repeat.value
											? rowsConfig.repeat.value.value
											: ""
									}
									onChange={(e) => {
										const value =
											Number.parseFloat(e.target.value) || undefined;
										const currentValue = rowsConfig.repeat?.value || {
											unit: "px",
										};
										updateRowsConfig({
											repeat: {
												count: rowsConfig.repeat?.count || 2,
												value:
													"min" in currentValue
														? currentValue
														: { ...currentValue, value },
											},
										});
									}}
									style={{
										width: "100px",
										padding: "5px",
										borderRadius: "4px",
										border: "1px solid #ddd",
									}}
								/>
								<select
									value={
										rowsConfig.repeat?.value &&
										"unit" in rowsConfig.repeat.value
											? rowsConfig.repeat.value.unit
											: "px"
									}
									onChange={(e) => {
										const unit = e.target.value as GridTrackUnit;
										const currentValue = rowsConfig.repeat?.value || {
											unit: "px",
										};
										updateRowsConfig({
											repeat: {
												count: rowsConfig.repeat?.count || 2,
												value:
													"min" in currentValue
														? currentValue
														: { ...currentValue, unit },
											},
										});
									}}
									style={{
										width: "100px",
										padding: "5px",
										borderRadius: "4px",
										border: "1px solid #ddd",
									}}
								>
									<option value="fr">fr</option>
									<option value="px">px</option>
									<option value="%">%</option>
									<option value="em">em</option>
									<option value="rem">rem</option>
									<option value="vh">vh</option>
									<option value="vw">vw</option>
									<option value="auto">auto</option>
									<option value="min-content">min-content</option>
									<option value="max-content">max-content</option>
								</select>
							</div>
						)}
					</div>
				) : (
					<div>
						{(rowsConfig.values || []).length > 0 && (
							<div
								style={{
									display: "flex",
									gap: "10px",
									flexWrap: "wrap",
									marginBottom: "10px",
								}}
							>
								{(rowsConfig.values || []).map((value, index) => (
									<div
										key={index}
										style={{
											display: "flex",
											gap: "5px",
											alignItems: "center",
										}}
									>
										{"min" in value ? (
											<span>minmax(...)</span>
										) : (
											<>
												<input
													type="number"
													placeholder="Value"
													value={value.value || ""}
													onChange={(e) => {
														const newValues = [...(rowsConfig.values || [])];
														const val =
															Number.parseFloat(e.target.value) || undefined;
														newValues[index] = { ...value, value: val };
														updateRowsConfig({ values: newValues });
													}}
													style={{ width: "80px" }}
												/>
												<select
													value={value.unit}
													onChange={(e) => {
														const newValues = [...(rowsConfig.values || [])];
														newValues[index] = {
															...value,
															unit: e.target.value as GridTrackUnit,
														};
														updateRowsConfig({ values: newValues });
													}}
													style={{ width: "100px" }}
												>
													<option value="fr">fr</option>
													<option value="px">px</option>
													<option value="%">%</option>
													<option value="em">em</option>
													<option value="rem">rem</option>
													<option value="vh">vh</option>
													<option value="vw">vw</option>
													<option value="auto">auto</option>
													<option value="min-content">min-content</option>
													<option value="max-content">max-content</option>
												</select>
											</>
										)}
										<button
											type="button"
											onClick={() => {
												const newValues = [...(rowsConfig.values || [])];
												newValues.splice(index, 1);
												updateRowsConfig({ values: newValues });
											}}
											style={{
												padding: "2px 8px",
												backgroundColor: "#e74c3c",
												color: "white",
												border: "none",
												borderRadius: "4px",
												cursor: "pointer",
											}}
										>
											×
										</button>
									</div>
								))}
							</div>
						)}
						{(rowsConfig.values || []).length === 0 ? (
							<button
								type="button"
								onClick={() => {
									updateRowsConfig({
										values: [...(rowsConfig.values || []), { unit: "auto" }],
									});
								}}
								style={{
									padding: "5px 10px",
									backgroundColor: "#667eea",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								+ Add Value
							</button>
						) : (
							<button
								type="button"
								onClick={() => {
									updateRowsConfig({
										values: [...(rowsConfig.values || []), { unit: "auto" }],
									});
								}}
								style={{
									padding: "5px 10px",
									backgroundColor: "#667eea",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
									marginTop: "5px",
								}}
							>
								+ Add Value
							</button>
						)}
					</div>
				)}
			</div>

			{/* Grid Template Areas - Structured Interface */}
			<div className="form-group" style={{ marginBottom: "30px" }}>
				<label>grid-template-areas</label>
				<div style={{ marginBottom: "15px" }}>
					{areasConfig.map((row, rowIndex) => (
						<div
							key={rowIndex}
							style={{
								display: "flex",
								gap: "5px",
								marginBottom: "10px",
								flexWrap: "wrap",
								alignItems: "center",
							}}
						>
							{row.map((area, areaIndex) => (
								<div
									key={areaIndex}
									style={{ display: "flex", gap: "2px", alignItems: "center" }}
								>
									<input
										type="text"
										value={area}
										onChange={(e) => {
											const newAreas = areasConfig.map((r, rIdx) =>
												rIdx === rowIndex
													? r.map((a, aIdx) =>
															aIdx === areaIndex ? e.target.value : a,
														)
													: r,
											);
											updateAreasConfig(newAreas);
										}}
										placeholder="Area name"
										style={{ width: "100px", padding: "5px" }}
									/>
									<button
										type="button"
										onClick={() => {
											const newAreas = areasConfig.map((r, rIdx) =>
												rIdx === rowIndex
													? r.filter((_, aIdx) => aIdx !== areaIndex)
													: r,
											);
											updateAreasConfig(newAreas);
										}}
										style={{
											padding: "2px 8px",
											backgroundColor: "#e74c3c",
											color: "white",
											border: "none",
											borderRadius: "4px",
											cursor: "pointer",
										}}
									>
										×
									</button>
								</div>
							))}
							<button
								type="button"
								onClick={() => {
									const newAreas = areasConfig.map((r, rIdx) =>
										rIdx === rowIndex ? [...r, ""] : r,
									);
									updateAreasConfig(newAreas);
								}}
								style={{
									padding: "5px 10px",
									backgroundColor: "#27ae60",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								+ Cell
							</button>
							<button
								type="button"
								onClick={() => {
									const newAreas = areasConfig.filter(
										(_, rIdx) => rIdx !== rowIndex,
									);
									updateAreasConfig(newAreas);
								}}
								style={{
									padding: "5px 10px",
									backgroundColor: "#e74c3c",
									color: "white",
									border: "none",
									borderRadius: "4px",
									cursor: "pointer",
								}}
							>
								× Row
							</button>
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => {
						updateAreasConfig([...areasConfig, [""]]);
					}}
					style={{
						padding: "5px 10px",
						backgroundColor: "#667eea",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}
				>
					+ Add Row
				</button>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("gap")}>gap</label>
				<input
					id={fieldId("gap")}
					type="text"
					value={config.gap || ""}
					onChange={(e) => updateField("gap", e.target.value)}
					placeholder="e.g., 10px, 1rem"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("column-gap")}>
					column-gap (grid-column-gap)
				</label>
				<input
					id={fieldId("column-gap")}
					type="text"
					value={config.columnGap || config.gridColumnGap || ""}
					onChange={(e) => updateField("columnGap", e.target.value)}
					placeholder="e.g., 10px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("row-gap")}>row-gap (grid-row-gap)</label>
				<input
					id={fieldId("row-gap")}
					type="text"
					value={config.rowGap || config.gridRowGap || ""}
					onChange={(e) => updateField("rowGap", e.target.value)}
					placeholder="e.g., 10px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-auto-flow")}>grid-auto-flow</label>
				<select
					id={fieldId("grid-auto-flow")}
					value={config.gridAutoFlow || ""}
					onChange={(e) => updateField("gridAutoFlow", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="row">row</option>
					<option value="column">column</option>
					<option value="dense">dense</option>
					<option value="row dense">row dense</option>
					<option value="column dense">column dense</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-auto-columns")}>grid-auto-columns</label>
				<input
					id={fieldId("grid-auto-columns")}
					type="text"
					value={config.gridAutoColumns || ""}
					onChange={(e) => updateField("gridAutoColumns", e.target.value)}
					placeholder="e.g., minmax(100px, auto)"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-auto-rows")}>grid-auto-rows</label>
				<input
					id={fieldId("grid-auto-rows")}
					type="text"
					value={config.gridAutoRows || ""}
					onChange={(e) => updateField("gridAutoRows", e.target.value)}
					placeholder="e.g., minmax(100px, auto)"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("justify-items")}>justify-items</label>
				<select
					id={fieldId("justify-items")}
					value={config.justifyItems || ""}
					onChange={(e) => updateField("justifyItems", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="start">start</option>
					<option value="end">end</option>
					<option value="center">center</option>
					<option value="stretch">stretch</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("align-items")}>align-items</label>
				<select
					id={fieldId("align-items")}
					value={config.alignItems || ""}
					onChange={(e) => updateField("alignItems", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="start">start</option>
					<option value="end">end</option>
					<option value="center">center</option>
					<option value="stretch">stretch</option>
					<option value="baseline">baseline</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("justify-content")}>justify-content</label>
				<select
					id={fieldId("justify-content")}
					value={config.justifyContent || ""}
					onChange={(e) => updateField("justifyContent", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="start">start</option>
					<option value="end">end</option>
					<option value="center">center</option>
					<option value="stretch">stretch</option>
					<option value="space-around">space-around</option>
					<option value="space-between">space-between</option>
					<option value="space-evenly">space-evenly</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("align-content")}>align-content</label>
				<select
					id={fieldId("align-content")}
					value={config.alignContent || ""}
					onChange={(e) => updateField("alignContent", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="start">start</option>
					<option value="end">end</option>
					<option value="center">center</option>
					<option value="stretch">stretch</option>
					<option value="space-around">space-around</option>
					<option value="space-between">space-between</option>
					<option value="space-evenly">space-evenly</option>
					<option value="baseline">baseline</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("place-items")}>place-items</label>
				<input
					id={fieldId("place-items")}
					type="text"
					value={config.placeItems || ""}
					onChange={(e) => updateField("placeItems", e.target.value)}
					placeholder="e.g., center stretch"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("place-content")}>place-content</label>
				<input
					id={fieldId("place-content")}
					type="text"
					value={config.placeContent || ""}
					onChange={(e) => updateField("placeContent", e.target.value)}
					placeholder="e.g., center space-between"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("width")}>width</label>
				<input
					id={fieldId("width")}
					type="text"
					value={config.width || ""}
					onChange={(e) => updateField("width", e.target.value)}
					placeholder="e.g., 100%, 800px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("height")}>height</label>
				<input
					id={fieldId("height")}
					type="text"
					value={config.height || ""}
					onChange={(e) => updateField("height", e.target.value)}
					placeholder="e.g., 100vh, 600px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("min-width")}>min-width</label>
				<input
					id={fieldId("min-width")}
					type="text"
					value={config.minWidth || ""}
					onChange={(e) => updateField("minWidth", e.target.value)}
					placeholder="e.g., 320px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("min-height")}>min-height</label>
				<input
					id={fieldId("min-height")}
					type="text"
					value={config.minHeight || ""}
					onChange={(e) => updateField("minHeight", e.target.value)}
					placeholder="e.g., 400px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("max-width")}>max-width</label>
				<input
					id={fieldId("max-width")}
					type="text"
					value={config.maxWidth || ""}
					onChange={(e) => updateField("maxWidth", e.target.value)}
					placeholder="e.g., 1200px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("max-height")}>max-height</label>
				<input
					id={fieldId("max-height")}
					type="text"
					value={config.maxHeight || ""}
					onChange={(e) => updateField("maxHeight", e.target.value)}
					placeholder="e.g., 800px"
				/>
			</div>
		</div>
	);
}
