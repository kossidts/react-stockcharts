/**
 * Row component to display a section with title and content.
 * @param {Object} props
 * @param {string} [props.title] - Title of the row.
 * @param {string} [props.anchor] - Anchor ID for the title (used for linking).
 * @param {JSX.Element} props.children - Content to be displayed within the section.
 * @returns {JSX.Element}
 */
function Row({ title, anchor, children }) {
    anchor = anchor || title;

    return (
        <div className="row">
            {title && (
                <h4>
                    <a id={anchor} href={`#${anchor}`}>
                        {title}
                    </a>
                </h4>
            )}
            {children}
        </div>
    );
}

export default Row;
