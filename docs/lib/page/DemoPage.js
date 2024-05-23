import React, { useEffect, useState } from "react";
import { tsvParse } from "d3-dsv";
import { timeParse } from "d3-time-format";

const ReadME = require("md/MAIN.md").default;
import Chart from "../charts/CandleStickChartWithDarkTheme";
// import Chart from "./lib/charts/OHLCChartWithElderRayIndicator";

import ContentSection from "lib/content-section";
import Row from "lib/row";
// import Section from "lib/section";
const parseDate = timeParse("%Y-%m-%d");

function DemoPage() {
	const [chartData, setChartData] = useState(null);
	useEffect(() => {
		document.body.classList.add("dark");
		fetch("data/MSFT.tsv")
			.then(response => response.text())
			.then(data =>
				tsvParse(data, d => {
					d.date = new Date(parseDate(d.date).getTime());
					d.open = +d.open;
					d.high = +d.high;
					d.low = +d.low;
					d.close = +d.close;
					d.volume = +d.volume;

					return d;
				})
			)
			.then(data => {
				setChartData(data);
				// ReactDOM.render(<Chart data={data} type="hybrid" />, document.getElementById("chart"));
			});

		return () => document.body.classList.remove("dark");
	}, []);
	return (
		<ContentSection title="">
			<Row>
				<div className="jumbotron" style={{ background: "transparent" }}>
					<div className="container" id="README.md">
						<div className="row">
							<div
								className="col-md-8"
								id="content"
								dangerouslySetInnerHTML={{ __html: ReadME }}
							></div>
							<div className="col-md-4"></div>
						</div>
					</div>
				</div>

				<div className="container light">
					<div className="row">
						<div className="col-md-12">
							{/* <a className="btn btn-primary" href="documentation.html" role="button">
								Documentation
							</a> */}
							<h3>Click on the chart, zoom with scroll, pan with drag</h3>
							<div id="chart" className="react-stockchart">
								{!chartData && <span>Loading...</span>}
								{chartData && <Chart data={chartData} type="hybrid" />}
							</div>
						</div>
					</div>
					<hr />
					<footer>
						<p>MIT license</p>
					</footer>
				</div>
			</Row>
		</ContentSection>
	);
}

DemoPage.title = "Demo";

export default DemoPage;
