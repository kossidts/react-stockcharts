/**
 * Section component for representing sections with columns in a grid layout.
 *
 * @param {object} props - Component properties.
 * @param {number} props.colSpan - Number of columns the section should span. (Required)
 * @param {string} [props.title] - Title of the section. (Optional)
 * @param {string} [props.className] - Additional CSS class names for the section. (Optional)
 * @param {JSX.Element} props.children - Content to be displayed within the section.
 * @returns {JSX.Element}
 */
function Section({ colSpan = 1, title, className, children }) {
	className = `col-md-${6 * colSpan} ${className || ""}`.trim();

	return (
		<div className={className}>
			{title && <h4>{title}</h4>}
			{children}
		</div>
	);
}

export default Section;
