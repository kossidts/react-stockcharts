import { afterEach, assert, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
// import * as matchers from '@testing-library/jest-dom/matchers';

import { scaleTime } from "d3-scale";

import ChartCanvas from "@/react-stockcharts/lib/ChartCanvas.js";
import Chart from "@/react-stockcharts/lib/Chart.js";
// import SingleValueTooltip from "@/react-stockcharts/lib/tooltip/SingleValueTooltip.js";

// expect.extend(matchers);

// afterEach(() => {
// 	cleanup();
// });
const emptyData = [];
const oneDataPoint = [{ date: new Date("2024-06-02T15:30:21.817Z"), close: 100 }];
const twoDataPoints = [
	{ date: new Date("2024-06-02T15:30:21.817Z"), close: 100 },
	{ date: new Date("2024-06-02T15:45:21.817Z"), close: 100.55 },
];

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
		expect(() => render(<ChartCanvas data={emptyData} xScale={scaleTime()}></ChartCanvas>)).toThrow(
			"Showing 0 datapoints, review the 'xExtents' prop of ChartCanvas"
		);
		expect(() => render(<ChartCanvas data={oneDataPoint} xScale={scaleTime()}></ChartCanvas>)).toThrow(
			"Showing 1 datapoints, review the 'xExtents' prop of ChartCanvas"
		);
	});
	it("throws an error when it has no child component ", () => {
		expect(() => render(<ChartCanvas data={twoDataPoints} xScale={scaleTime()}></ChartCanvas>)).toThrow(
			"Cannot read properties of undefined (reading 'filter')" // missing children
		);
	});
	it("throws an error when a child Chart component has no 'yExtents' attribute, or when the yExtents attribute is not a array or a function that returns an array ", () => {
		expect(() =>
			render(
				<ChartCanvas data={twoDataPoints} xScale={scaleTime()}>
					<Chart></Chart>
				</ChartCanvas>
			)
		).toThrow(
			"Cannot read properties of undefined (reading 'map')" // missing extents
		);
		// expect(() =>
		// 	render(
		// 		<ChartCanvas data={twoDataPoints} xScale={scaleTime()}>
		// 			<Chart yExtents={5}></Chart>
		// 		</ChartCanvas>
		// 	)
		// ).toThrow(
		// 	"Cannot read properties of undefined (reading 'map')" // missing extents
		// );

		// render(
		// 	<ChartCanvas data={twoDataPoints} xScale={scaleTime()}>
		// 		<Chart yExtents={5}></Chart>
		// 		{/* <Chart yExtents={d => [d.high, d.low]}></Chart> */}
		// 	</ChartCanvas>
		// );

		screen.debug();
	});
});
