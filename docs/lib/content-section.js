/**
 * ContentSection component
 *
 * @param {object} props - Component properties.
 * @param {string} [props.title] - Title of the section.
 * * @param {JSX.Element} props.children - Content to be displayed within the section.
 * @returns {JSX.Element}
 */
function ContentSection({ className, title, children }) {
    return (
        <div
            id="ContentSection"
            className={`col-sm-9 offset-sm-3 col-md-10 offset-md-2 main ${className || ""}`.trim()}
        >
            {title && <h1 className="page-header">{title}</h1>}
            {children}
        </div>
    );
}

export default ContentSection;
