import type { GridContainerConfiguration } from "../GridContainerConfiguration";

interface Props {
	config: GridContainerConfiguration;
	onChange: (config: GridContainerConfiguration) => void;
}

export function GridContainerConfigurator({ config, onChange }: Props) {
	const updateField = (
		field: keyof GridContainerConfiguration,
		value: string | undefined,
	) => {
		onChange({
			...config,
			[field]: value || undefined,
		});
	};

	const fieldId = (name: string) =>
		`container-${name.replace(/[^a-zA-Z0-9]/g, "-")}`;

	return (
		<div className="config-form">
			<div className="form-group">
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

			<div className="form-group form-group-full">
				<label htmlFor={fieldId("grid-template-columns")}>
					grid-template-columns
				</label>
				<input
					id={fieldId("grid-template-columns")}
					type="text"
					value={config.gridTemplateColumns || ""}
					onChange={(e) => updateField("gridTemplateColumns", e.target.value)}
					placeholder="e.g., 1fr 2fr 1fr, repeat(3, 1fr), 100px auto 200px"
				/>
			</div>

			<div className="form-group form-group-full">
				<label htmlFor={fieldId("grid-template-rows")}>
					grid-template-rows
				</label>
				<input
					id={fieldId("grid-template-rows")}
					type="text"
					value={config.gridTemplateRows || ""}
					onChange={(e) => updateField("gridTemplateRows", e.target.value)}
					placeholder="e.g., auto 1fr auto, repeat(2, 100px)"
				/>
			</div>

			<div className="form-group form-group-full">
				<label htmlFor={fieldId("grid-template-areas")}>
					grid-template-areas
				</label>
				<input
					id={fieldId("grid-template-areas")}
					type="text"
					value={config.gridTemplateAreas || ""}
					onChange={(e) => updateField("gridTemplateAreas", e.target.value)}
					placeholder='e.g., "header header" "sidebar main"'
				/>
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
