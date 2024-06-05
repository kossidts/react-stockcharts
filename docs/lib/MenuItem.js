/**
 * MenuItem component for navigation menus.
 *
 * @param {object} props - Component properties.
 * @param {boolean} [props.current] - Whether the item is currently active.
 * @param {string} props.anchor - Anchor link for the menu item. (Required)
 * @param {string} props.title - Title of the menu item. (Required)
 * @returns {JSX.Element}
 */
function MenuItem({ current = false, anchor, title }) {
	const className = current ? "active" : "";
	return (
		<li className={`${className} nav-item`.trim()}>
			<a href={"#/" + anchor} className="nav-link">
				{title}
			</a>
		</li>
	);
}

export default MenuItem;
