import { useId } from "react";
import type { GridChildConfiguration } from "../GridChildConfiguration";

interface Props {
	config: GridChildConfiguration;
	onChange: (config: GridChildConfiguration) => void;
}

export function GridChildConfigurator({ config, onChange }: Props) {
	const baseId = useId();
	const fieldId = (name: string) =>
		`${baseId}-${name.replace(/[^a-zA-Z0-9]/g, "-")}`;

	const updateField = (
		field: keyof GridChildConfiguration,
		value: string | number | undefined,
	) => {
		onChange({
			...config,
			[field]: value || undefined,
		});
	};

	return (
		<div className="config-form">
			<div className="form-group form-group-full">
				<label htmlFor={fieldId("grid-area")}>grid-area</label>
				<input
					id={fieldId("grid-area")}
					type="text"
					value={config.gridArea || ""}
					onChange={(e) => updateField("gridArea", e.target.value)}
					placeholder='e.g., "header", 1 / 1 / 3 / 3'
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-column")}>grid-column</label>
				<input
					id={fieldId("grid-column")}
					type="text"
					value={config.gridColumn || ""}
					onChange={(e) => updateField("gridColumn", e.target.value)}
					placeholder="e.g., 1 / 3, span 2"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-row")}>grid-row</label>
				<input
					id={fieldId("grid-row")}
					type="text"
					value={config.gridRow || ""}
					onChange={(e) => updateField("gridRow", e.target.value)}
					placeholder="e.g., 1 / 3, span 2"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-column-start")}>grid-column-start</label>
				<input
					id={fieldId("grid-column-start")}
					type="text"
					value={config.gridColumnStart || ""}
					onChange={(e) => updateField("gridColumnStart", e.target.value)}
					placeholder="e.g., 1, auto"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-column-end")}>grid-column-end</label>
				<input
					id={fieldId("grid-column-end")}
					type="text"
					value={config.gridColumnEnd || ""}
					onChange={(e) => updateField("gridColumnEnd", e.target.value)}
					placeholder="e.g., 3, auto"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-row-start")}>grid-row-start</label>
				<input
					id={fieldId("grid-row-start")}
					type="text"
					value={config.gridRowStart || ""}
					onChange={(e) => updateField("gridRowStart", e.target.value)}
					placeholder="e.g., 1, auto"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("grid-row-end")}>grid-row-end</label>
				<input
					id={fieldId("grid-row-end")}
					type="text"
					value={config.gridRowEnd || ""}
					onChange={(e) => updateField("gridRowEnd", e.target.value)}
					placeholder="e.g., 3, auto"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("justify-self")}>justify-self</label>
				<select
					id={fieldId("justify-self")}
					value={config.justifySelf || ""}
					onChange={(e) => updateField("justifySelf", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="start">start</option>
					<option value="end">end</option>
					<option value="center">center</option>
					<option value="stretch">stretch</option>
					<option value="auto">auto</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("align-self")}>align-self</label>
				<select
					id={fieldId("align-self")}
					value={config.alignSelf || ""}
					onChange={(e) => updateField("alignSelf", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="start">start</option>
					<option value="end">end</option>
					<option value="center">center</option>
					<option value="stretch">stretch</option>
					<option value="auto">auto</option>
					<option value="baseline">baseline</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("place-self")}>place-self</label>
				<input
					id={fieldId("place-self")}
					type="text"
					value={config.placeSelf || ""}
					onChange={(e) => updateField("placeSelf", e.target.value)}
					placeholder="e.g., center stretch"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("order")}>order</label>
				<input
					id={fieldId("order")}
					type="number"
					value={config.order || ""}
					onChange={(e) =>
						updateField(
							"order",
							e.target.value ? Number.parseInt(e.target.value, 10) : undefined,
						)
					}
					placeholder="e.g., 1, -1"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("width")}>width</label>
				<input
					id={fieldId("width")}
					type="text"
					value={config.width || ""}
					onChange={(e) => updateField("width", e.target.value)}
					placeholder="e.g., 100%, 200px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("height")}>height</label>
				<input
					id={fieldId("height")}
					type="text"
					value={config.height || ""}
					onChange={(e) => updateField("height", e.target.value)}
					placeholder="e.g., auto, 100px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("min-width")}>min-width</label>
				<input
					id={fieldId("min-width")}
					type="text"
					value={config.minWidth || ""}
					onChange={(e) => updateField("minWidth", e.target.value)}
					placeholder="e.g., 100px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("min-height")}>min-height</label>
				<input
					id={fieldId("min-height")}
					type="text"
					value={config.minHeight || ""}
					onChange={(e) => updateField("minHeight", e.target.value)}
					placeholder="e.g., 50px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("max-width")}>max-width</label>
				<input
					id={fieldId("max-width")}
					type="text"
					value={config.maxWidth || ""}
					onChange={(e) => updateField("maxWidth", e.target.value)}
					placeholder="e.g., 100%"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("max-height")}>max-height</label>
				<input
					id={fieldId("max-height")}
					type="text"
					value={config.maxHeight || ""}
					onChange={(e) => updateField("maxHeight", e.target.value)}
					placeholder="e.g., 300px"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("position")}>position</label>
				<select
					id={fieldId("position")}
					value={config.position || ""}
					onChange={(e) => updateField("position", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="static">static</option>
					<option value="relative">relative</option>
					<option value="absolute">absolute</option>
					<option value="fixed">fixed</option>
					<option value="sticky">sticky</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("z-index")}>z-index</label>
				<input
					id={fieldId("z-index")}
					type="number"
					value={config.zIndex || ""}
					onChange={(e) =>
						updateField(
							"zIndex",
							e.target.value ? Number.parseInt(e.target.value, 10) : undefined,
						)
					}
					placeholder="e.g., 10, -1"
				/>
			</div>

			<div className="form-group">
				<label htmlFor={fieldId("display")}>display</label>
				<select
					id={fieldId("display")}
					value={config.display || ""}
					onChange={(e) => updateField("display", e.target.value)}
				>
					<option value="">-- Select --</option>
					<option value="block">block</option>
					<option value="inline">inline</option>
					<option value="flex">flex</option>
					<option value="inline-flex">inline-flex</option>
					<option value="grid">grid</option>
					<option value="inline-grid">inline-grid</option>
				</select>
			</div>

			{config.display === "flex" || config.display === "inline-flex" ? (
				<>
					<div className="form-group">
						<label htmlFor={fieldId("flex-direction")}>flex-direction</label>
						<select
							id={fieldId("flex-direction")}
							value={config.flexDirection || ""}
							onChange={(e) => updateField("flexDirection", e.target.value)}
						>
							<option value="">-- Select --</option>
							<option value="row">row</option>
							<option value="row-reverse">row-reverse</option>
							<option value="column">column</option>
							<option value="column-reverse">column-reverse</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor={fieldId("flex-wrap")}>flex-wrap</label>
						<select
							id={fieldId("flex-wrap")}
							value={config.flexWrap || ""}
							onChange={(e) => updateField("flexWrap", e.target.value)}
						>
							<option value="">-- Select --</option>
							<option value="nowrap">nowrap</option>
							<option value="wrap">wrap</option>
							<option value="wrap-reverse">wrap-reverse</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor={fieldId("justify-content-flex")}>
							justify-content (flex)
						</label>
						<select
							id={fieldId("justify-content-flex")}
							value={config.justifyContent || ""}
							onChange={(e) => updateField("justifyContent", e.target.value)}
						>
							<option value="">-- Select --</option>
							<option value="flex-start">flex-start</option>
							<option value="flex-end">flex-end</option>
							<option value="center">center</option>
							<option value="space-between">space-between</option>
							<option value="space-around">space-around</option>
							<option value="space-evenly">space-evenly</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor={fieldId("align-items-flex")}>
							align-items (flex)
						</label>
						<select
							id={fieldId("align-items-flex")}
							value={config.alignItems || ""}
							onChange={(e) => updateField("alignItems", e.target.value)}
						>
							<option value="">-- Select --</option>
							<option value="flex-start">flex-start</option>
							<option value="flex-end">flex-end</option>
							<option value="center">center</option>
							<option value="stretch">stretch</option>
							<option value="baseline">baseline</option>
						</select>
					</div>
				</>
			) : null}
		</div>
	);
}
