import { Component } from "react";
import PropTypes from "prop-types";
import { groups } from "d3-array";

import GenericChartComponent from "../GenericChartComponent";
import { getAxisCanvas } from "../GenericComponent";

import { hexToRGBA, functor } from "../utils";

class ScatterSeries extends Component {
    constructor(props) {
        super(props);
        this.renderSVG = this.renderSVG.bind(this);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
    }
    drawOnCanvas(ctx, moreProps) {
        const { xAccessor } = moreProps;

        const points = helper(this.props, moreProps, xAccessor);

        drawOnCanvas(ctx, this.props, points);
    }
    renderSVG(moreProps) {
        const { className, markerProps } = this.props;
        const { xAccessor } = moreProps;

        const points = helper(this.props, moreProps, xAccessor);

        return (
            <g className={className}>
                {points.map((point, idx) => {
                    const { marker: Marker } = point;
                    return <Marker key={idx} {...markerProps} point={point} />;
                })}
            </g>
        );
    }
    render() {
        return (
            <GenericChartComponent
                svgDraw={this.renderSVG}
                canvasDraw={this.drawOnCanvas}
                canvasToDraw={getAxisCanvas}
                drawOn={["pan"]}
            />
        );
    }
}

ScatterSeries.propTypes = {
    className: PropTypes.string,
    yAccessor: PropTypes.func.isRequired,
    marker: PropTypes.func,
    markerProvider: PropTypes.func,
    markerProps: PropTypes.object,
};

ScatterSeries.defaultProps = {
    className: "react-stockcharts-scatter",
};

function helper(props, moreProps, xAccessor) {
    const { yAccessor, markerProvider, markerProps } = props;
    let { marker: Marker } = props;
    const {
        xScale,
        chartConfig: { yScale },
        plotData,
    } = moreProps;

    if (!(markerProvider || Marker)) throw new Error("required prop, either marker or markerProvider missing");

    return plotData.map(d => {
        if (markerProvider) Marker = markerProvider(d);

        const mProps = { ...Marker.defaultProps, ...markerProps };

        const fill = functor(mProps.fill);
        const stroke = functor(mProps.stroke);

        return {
            x: xScale(xAccessor(d)),
            y: yScale(yAccessor(d)),
            fill: hexToRGBA(fill(d), mProps.opacity),
            stroke: stroke(d),
            datum: d,
            marker: Marker,
        };
    });
}

function drawOnCanvas(ctx, props, points) {
    const { markerProps } = props;

    const nest = groups(
        points,
        d => d.fill,
        d => d.stroke
    );
    for (const [fillKey, fillValues] of nest) {
        if (fillKey !== "none") {
            ctx.fillStyle = fillKey;
        }

        for (const [, strokeValues] of fillValues) {
            strokeValues.forEach(point => {
                const { marker } = point;
                marker.drawOnCanvas({ ...marker.defaultProps, ...markerProps, fill: fillKey }, point, ctx);
            });
        }
    }
}

export default ScatterSeries;
