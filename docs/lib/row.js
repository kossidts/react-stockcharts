import React from "react";
import PropTypes from "prop-types";

function Row({ title, anchor, children }) {
	const anchor = anchor || title;

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

Row.propTypes = {
	title: PropTypes.string,
	anchor: PropTypes.string,
};

export default Row;
