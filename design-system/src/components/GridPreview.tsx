import { useId } from "react";

interface GridPreviewProps {
	containerCss: string;
	childrenCss: string[];
	className?: string;
}

export function GridPreview({
	containerCss,
	childrenCss,
	className,
}: GridPreviewProps) {
	const containerId = useId().replace(/:/g, "-");
	const containerClassName = `grid-preview-container-${containerId}`;
	const childrenClassNames = childrenCss.map(
		(_, index) => `grid-preview-child-${containerId}-${index}`,
	);

	const styleContent = `
		.${containerClassName} {
			${containerCss}
			min-height: 200px;
			border: 2px dashed #667eea;
			padding: 10px;
		}
		${childrenCss
			.map(
				(childCss, index) => `
			.${childrenClassNames[index]} {
				${childCss}
				border: 1px solid #764ba2;
				padding: 10px;
				background: rgba(102, 126, 234, 0.1);
				display: flex;
				align-items: center;
				justify-content: center;
				min-height: 50px;
			}
		`,
			)
			.join("\n")}
	`;

	return (
		<div className={className}>
			<style>{styleContent}</style>
			<div className={containerClassName}>
				{childrenCss.map((childCss, index) => (
					<div
						key={`${containerId}-child-${index}-${childCss.slice(0, 20)}`}
						className={childrenClassNames[index]}
					>
						<span>Child {index + 1}</span>
					</div>
				))}
			</div>
		</div>
	);
}
