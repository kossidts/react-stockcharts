import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickStockScaleChartWithVolumeBarV1 extends React.Component {
    render() {
        const { type, data: initialData, width, ratio } = this.props;

        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date);
        const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData);

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 100)]);
        const xExtents = [start, end];

        return (
            <ChartCanvas
                height={400}
                ratio={ratio}
                width={width}
                margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                type={type}
                seriesName="MSFT"
                data={data}
                xScale={xScale}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
                xExtents={xExtents}
            >
                <Chart id={1} yExtents={d => [d.high, d.low]}>
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="right" orient="right" ticks={5} />
                    <CandlestickSeries />
                </Chart>
                <Chart id={2} yExtents={d => d.volume}>
                    <YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")} />
                    <BarSeries yAccessor={d => d.volume} />
                </Chart>
            </ChartCanvas>
        );
    }
}

CandleStickStockScaleChartWithVolumeBarV1.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChartWithVolumeBarV1.defaultProps = {
    type: "svg",
};
CandleStickStockScaleChartWithVolumeBarV1 = fitWidth(CandleStickStockScaleChartWithVolumeBarV1);

export default CandleStickStockScaleChartWithVolumeBarV1;
