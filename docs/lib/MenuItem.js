import React from "react";
import PropTypes from "prop-types";

class MenuItem extends React.Component {
	render() {
		const className = this.props.current ? "active" : "";
		return (
			<li className={`${className} nav-item`.trim()}>
				<a href={"#/" + this.props.anchor} className="nav-link">
					{this.props.title}
				</a>
			</li>
		);
	}
}

MenuItem.propTypes = {
	current: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	anchor: PropTypes.string.isRequired,
};

MenuItem.defaultProps = {
	active: false,
};

// onClick={this.handleClick}
export default MenuItem;
