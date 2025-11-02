import { useState } from "react";
import type {
	GridContainerConfiguration,
	GridChildConfiguration,
} from "@grid-explainer/core";
import {
	explainGridContainerConfiguration,
	explainGridChildConfiguration,
	gridContainerConfigurationToCss,
	gridChildConfigurationToCss,
} from "@grid-explainer/core";
import {
	GridContainerConfigurator,
	GridChildConfigurator,
	GridPreview,
} from "@grid-explainer/design-system";
import "./App.css";

interface ChildWithId {
	id: string;
	config: GridChildConfiguration;
}

function App() {
	const [containerConfig, setContainerConfig] =
		useState<GridContainerConfiguration>({
			display: "grid",
		});

	const generateId = () => {
		return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
	};

	const [children, setChildren] = useState<ChildWithId[]>([
		{ id: generateId(), config: {} },
	]);

	const addChild = () => {
		setChildren([...children, { id: generateId(), config: {} }]);
	};

	const removeChild = (id: string) => {
		setChildren(children.filter((child) => child.id !== id));
	};

	const updateChild = (id: string, config: GridChildConfiguration) => {
		setChildren(
			children.map((child) => (child.id === id ? { ...child, config } : child)),
		);
	};

	const containerExplanation =
		explainGridContainerConfiguration(containerConfig);
	const containerCss = gridContainerConfigurationToCss(containerConfig);
	const childrenExplanations = children.map((child) =>
		explainGridChildConfiguration(child.config),
	);
	const childrenCss = children.map((child) =>
		gridChildConfigurationToCss(child.config),
	);

	return (
		<div className="app">
			<header className="app-header">
				<h1>CSS Grid Configuration & Explainer</h1>
				<p>
					Configure your grid container and children, then see explanations
					below
				</p>
			</header>

			<div className="app-content">
				<section className="config-section">
					<h2>Grid Container Configuration</h2>
					<GridContainerConfigurator
						config={containerConfig}
						onChange={setContainerConfig}
					/>
					<div className="explanation-box">
						<h3>Explanation:</h3>
						<p>{containerExplanation}</p>
					</div>
					<div className="css-preview-box">
						<h3>CSS Preview:</h3>
						<pre className="css-code">
							<code>
								{containerCss || "/* No CSS properties configured */"}
							</code>
						</pre>
					</div>
				</section>

				<section className="config-section">
					<div className="section-header">
						<h2>Grid Children Configuration</h2>
						<button type="button" onClick={addChild} className="btn-add">
							+ Add Child
						</button>
					</div>

					{children.map((child, index) => (
						<div key={child.id} className="child-config-wrapper">
							<div className="child-header">
								<h3>Child #{index + 1}</h3>
								{children.length > 1 && (
									<button
										type="button"
										onClick={() => removeChild(child.id)}
										className="btn-remove"
									>
										Remove
									</button>
								)}
							</div>
							<GridChildConfigurator
								config={child.config}
								onChange={(config: GridChildConfiguration) =>
									updateChild(child.id, config)
								}
							/>
							<div className="explanation-box">
								<h4>Explanation:</h4>
								<p>{childrenExplanations[index]}</p>
							</div>
							<div className="css-preview-box">
								<h4>CSS Preview:</h4>
								<pre className="css-code">
									<code>
										{childrenCss[index] || "/* No CSS properties configured */"}
									</code>
								</pre>
							</div>
						</div>
					))}
				</section>

				<section className="config-section">
					<h2>Visual Preview</h2>
					<GridPreview containerCss={containerCss} childrenCss={childrenCss} />
				</section>
			</div>
		</div>
	);
}

export { App };
