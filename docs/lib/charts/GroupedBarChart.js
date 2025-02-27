import React from "react";
import PropTypes from "prop-types";
import { scaleOrdinal, scalePoint } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

import { ChartCanvas, Chart } from "react-stockcharts";
import { GroupedBarSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";

class GroupedBarChart extends React.Component {
    render() {
        const { data, type, width, ratio } = this.props;

        const f = scaleOrdinal(schemeCategory10).domain(new Set(data.map(d => d.region)));

        const fill = (d, i) => f(i);
        // const fill = (d, i) => {console.log(d, i, f(i)); return f(i)};

        return (
            <ChartCanvas
                ratio={ratio}
                width={width}
                height={400}
                margin={{ left: 40, right: 10, top: 20, bottom: 30 }}
                type={type}
                seriesName="Fruits"
                xExtents={list => list.map(d => d.x)}
                data={data}
                xAccessor={d => d.x}
                xScale={scalePoint()}
                padding={1}
            >
                <Chart id={1} yExtents={[0, d => [d.y1, d.y2, d.y3, d.y4]]}>
                    <XAxis axisAt="bottom" orient="bottom" />
                    <YAxis axisAt="left" orient="left" />
                    <GroupedBarSeries
                        yAccessor={[d => d.y1, d => d.y2, d => d.y3, d => d.y4]}
                        fill={fill}
                        spaceBetweenBar={3}
                    />
                </Chart>
            </ChartCanvas>
        );
    }
}

GroupedBarChart.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    ratio: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

GroupedBarChart.defaultProps = {
    type: "svg",
};
GroupedBarChart = fitWidth(GroupedBarChart);

export default GroupedBarChart;
