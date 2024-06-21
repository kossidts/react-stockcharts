import { afterEach, assert, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
// import * as matchers from '@testing-library/jest-dom/matchers';

import { scaleTime } from "d3-scale";

import ChartCanvas from "@/lib/ChartCanvas.js";
import Chart from "@/lib/Chart.js";
// import SingleValueTooltip from "@/lib/tooltip/SingleValueTooltip.js";

import { getChartData } from "./data";

// expect.extend(matchers);
// afterEach(() => {
// 	cleanup();
// });

describe("ChartCanvas", () => {
	it("throws an error when 'xScale' attribute is not provided ", () => {
		expect(() => render(<ChartCanvas></ChartCanvas>)).toThrow(
			"Cannot read properties of undefined (reading 'invert')"
		);
	});
	it("throws an error when 'data' attribute is not an array of length 2 or greater ", () => {
		expect(() => render(<ChartCanvas xScale={scaleTime()}></ChartCanvas>)).toThrow(
			"Cannot read properties of undefined (reading 'length')"
		);
		expect(() => {
			let chartData = getChartData("empty");
			return render(<ChartCanvas data={chartData} xScale={scaleTime()}></ChartCanvas>);
		}).toThrow("Showing 0 datapoints, review the 'xExtents' prop of ChartCanvas");

		expect(() => {
			let chartData = getChartData("singlePoint");
			return render(<ChartCanvas data={chartData} xScale={scaleTime()}></ChartCanvas>);
		}).toThrow("Showing 1 datapoints, review the 'xExtents' prop of ChartCanvas");
	});
	it("throws an error when it has no child component ", () => {
		expect(() => {
			let chartData = getChartData("duoPoints");
			return render(<ChartCanvas data={chartData} xScale={scaleTime()}></ChartCanvas>);
		}).toThrow(
			"Cannot read properties of undefined (reading 'filter')" // missing children
		);
	});
	it("throws an error when a child Chart component has no 'yExtents' attribute, or when the yExtents attribute is not a array or a function that returns an array ", () => {
		expect(() => {
			let chartData = getChartData("duoPoints");
			return render(
				<ChartCanvas data={chartData} xScale={scaleTime()}>
					<Chart></Chart>
				</ChartCanvas>
			);
		}).toThrow(
			"Cannot read properties of undefined (reading 'map')" // missing extents
		);

		let chartData = getChartData("duoPoints");
		render(
			<ChartCanvas data={chartData} xScale={scaleTime()}>
				<Chart yExtents={5}></Chart>
			</ChartCanvas>
		);
		screen.debug();
	});
	// it("throws an error when a child Chart component has no 'yExtents' attribute, or when the yExtents attribute is not a array or a function that returns an array ", () => {
	// 	expect(() => {
	// 		let chartData = getChartData("twoPoints");
	// 		return render(
	// 			<ChartCanvas data={chartData} xScale={scaleTime()}>
	// 				<Chart yExtents={5}></Chart>
	// 			</ChartCanvas>
	// 		);
	// 	}).toThrow(
	// 		"Cannot read properties of undefined (reading 'map')" // missing extents
	// 	);
	// 	// expect(() =>
	// 	// 	render(
	// 	// 		<ChartCanvas data={twoDataPoints} xScale={scaleTime()}>
	// 	// 			<Chart yExtents={5}></Chart>
	// 	// 		</ChartCanvas>
	// 	// 	)
	// 	// ).toThrow(
	// 	// 	"Cannot read properties of undefined (reading 'map')" // missing extents
	// 	// );

	// 	// render(
	// 	// 	<ChartCanvas data={twoDataPoints} xScale={scaleTime()}>
	// 	// 		<Chart yExtents={5}></Chart>
	// 	// 		{/* <Chart yExtents={d => [d.high, d.low]}></Chart> */}
	// 	// 	</ChartCanvas>
	// 	// );

	// render(<SingleValueTooltip attr="AAA" yLabel="TestLabel" />);
	// const $element = screen.getByText(/AAA/);
	// const $element = screen.getByRole("button", { name: /Login/i });
	// expect($element).toBeInTheDocument();

	// 	screen.debug();
	// });
});
