export default function Nav() {
	return (
		<nav className="navbar navbar-fixed-top">
			<div className="container-fluid">
				<div className="navbar-header">
					<a className="navbar-brand" href="index.html">
						React Stockcharts
					</a>
					<div id="debug_here"></div>
				</div>
				<div class="pull-right">
					<a href="https://github.com/kossidts/react-stockcharts" class="btn">
						<small>View project on</small>
						<br /> <span>GitHub</span>
					</a>
				</div>
			</div>
		</nav>
	);
}
