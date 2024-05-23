import React from "react";
import PropTypes from "prop-types";

class ContentSection extends React.Component {
	render() {
		const { className } = this.props;
		return (
			<div id="ContentSection" className={`col-sm-9 offset-sm-3 col-md-10 offset-md-2 main ${className}`}>
				{this.props.title && <h1 className="page-header">{this.props.title}</h1>}
				{this.props.children}
			</div>
		);
	}
}

ContentSection.propTypes = {
	title: PropTypes.string.isRequired,
};

export default ContentSection;
