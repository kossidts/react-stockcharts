/**
 * The main navbar for the documentation page
 *
 * @returns {JSX.Element}
 */
function Nav() {
	return (
		<nav className="navbar fixed-top" id="main-nav">
			<div className="container-fluid">
				<a className="navbar-brand" href="index.html">
					React Stockcharts
				</a>
				<a href="https://github.com/kossidts/react-stockcharts" className="btn d-flex flex-column">
					<small>View project on</small>
					<span>GitHub</span>
				</a>
			</div>
		</nav>
	);
}

export default Nav;
