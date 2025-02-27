import React from "react";
import ReactDOM from "react-dom";

import { csvParse, tsvParse } from "d3-dsv";
import { merge } from "d3-array";
import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y-%m-%d");
const parseDateTime = timeParse("%Y-%m-%d %H:%M:%S");

import { TypeChooser } from "react-stockcharts/lib/helper";
import "./stylesheets/re-stock.scss";

import Navbar from "./lib/Navbar.js";
import MenuItem from "./lib/MenuItem.js";

const DOCUMENTATION = {
    head: "Documentation",
    pages: [
        require("./lib/page/DemoPage.js").default,
        // require("./lib/page/GettingStartedPage").default,
        // require("./lib/page/QuickStartExamplesPage").default,
        require("./lib/page/OverviewPage.js").default,
        require("./lib/page/SvgVsCanvasPage.js").default,
        require("./lib/page/LotsOfDataPage.js").default,
        require("./lib/page/ChangeLogPage.js").default,
        require("./lib/page/ComingSoonPage.js").default,
    ],
};

const CHART_FEATURES = {
    head: "Chart features",
    pages: [
        // require("./lib/page/AxisPage").default,
        require("./lib/page/MousePointerPage.js").default,
        require("./lib/page/ZoomAndPanPage.js").default,
        require("./lib/page/IntraDayContinuousDataPage.js").default,
        require("./lib/page/EquityIntraDayDataPage.js").default,
        require("./lib/page/EdgeCoordinatesPage.js").default,
        require("./lib/page/PriceMarkerPage.js").default,
        require("./lib/page/AnnotationsPage.js").default,
        require("./lib/page/MouseFollowingTooltipPage.js").default,
        require("./lib/page/UpdatingDataPageForCandleStick.js").default,
        require("./lib/page/LoadMoreDataPage.js").default,
        require("./lib/page/DarkThemePage.js").default,
        require("./lib/page/GridPage.js").default,
    ],
};

const CHART_TYPES = {
    head: "Chart types",
    pages: [
        require("./lib/page/AreaChartPage.js").default,
        require("./lib/page/LineAndScatterChartPage.js").default,
        require("./lib/page/BubbleChartPage.js").default,
        require("./lib/page/BarChartPage.js").default,
        require("./lib/page/GroupedBarChartPage.js").default,
        require("./lib/page/StackedBarChartPage.js").default,
        require("./lib/page/HorizontalBarChartPage.js").default,
        require("./lib/page/HorizontalStackedBarChartPage.js").default,
        require("./lib/page/CandleStickChartPage.js").default,
        require("./lib/page/VolumeBarPage.js").default,
        // TODO add OHLC chart
        require("./lib/page/HeikinAshiPage.js").default,
        require("./lib/page/KagiPage.js").default,
        require("./lib/page/PointAndFigurePage.js").default,
        require("./lib/page/RenkoPage.js").default,
        require("./lib/page/MiscChartsPage.js").default,
    ],
};

const INDICATORS = {
    head: "Indicators",
    pages: [
        require("./lib/page/MAOverlayPage.js").default,
        require("./lib/page/BollingerBandOverlayPage.js").default,
        require("./lib/page/CompareWithPage.js").default,
        require("./lib/page/MACDIndicatorPage.js").default,
        require("./lib/page/RSIIndicatorPage.js").default,
        require("./lib/page/StochasticIndicatorPage.js").default,
        require("./lib/page/ForceIndexIndicatorPage.js").default,
        require("./lib/page/ElderRayIndicatorPage.js").default,
        require("./lib/page/ElderImpulseIndicatorPage.js").default,
        require("./lib/page/SARIndicatorPage.js").default,
        require("./lib/page/VolumeProfilePage.js").default,
        require("./lib/page/VolumeProfileBySessionPage.js").default,
    ],
};
const ALGORITHMIC_INDICATORS = {
    head: "Algorithmic Indicators",
    pages: [
        require("./lib/page/MovingAverageCrossoverAlgorithmPage.js").default,
        require("./lib/page/MovingAverageCrossoverAlgorithmPage2.js").default,
    ],
};

const INTERACTIVE = {
    head: "Interactive",
    pages: [
        require("./lib/page/TrendLineInteractiveIndicatorPage.js").default,
        require("./lib/page/FibonacciInteractiveIndicatorPage.js").default,
        require("./lib/page/EquidistantChannelPage.js").default,
        require("./lib/page/StandardDeviationChannelPage.js").default,
        require("./lib/page/GannFanPage.js").default,
        require("./lib/page/TextPage.js").default,
        require("./lib/page/InteractiveYCoordinatePage.js").default,
        require("./lib/page/ClickHandlerCallbackPage.js").default,
        require("./lib/page/BrushSupportPage.js").default,
    ],
};

const ALL_PAGES = [
    DOCUMENTATION,
    CHART_FEATURES,
    CHART_TYPES,
    INDICATORS,
    ALGORITHMIC_INDICATORS,
    INTERACTIVE,
    // CUSTOMIZATION, TODO
];

const pages = merge(ALL_PAGES.map(_ => _.pages));

function compressString(string) {
    string = string.replace(/\s+/g, "_");
    string = string.replace(/[-&]/g, "_");
    string = string.replace(/_+/g, "_");
    string = string.replace(/[.]/g, "");
    string = string.toLowerCase();
    // console.log(string);
    return string;
}

function parseData(parse) {
    return function (d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

loadPage();

function loadPage() {
    const promiseMSFT = fetch("data/MSFT.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)));

    const promiseMSFTfull = fetch("data/MSFT_full.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)));

    const promiseIntraDayContinuous = fetch("data/bitfinex_xbtusd_1m.csv")
        .then(response => response.text())
        .then(data => csvParse(data, parseData(parseDateTime)))
        .then(data => {
            data.sort((a, b) => {
                return a.date.valueOf() - b.date.valueOf();
            });
            return data;
        });
    const promiseIntraDayDiscontinuous = fetch("data/MSFT_INTRA_DAY.tsv")
        .then(response => response.text())
        .then(data =>
            tsvParse(
                data,
                parseData(d => new Date(+d))
            )
        );
    const promiseCompare = fetch("data/comparison.tsv")
        .then(response => response.text())
        .then(data =>
            tsvParse(data, d => {
                d = parseData(parseDate)(d);
                d.SP500Close = +d.SP500Close;
                d.AAPLClose = +d.AAPLClose;
                d.GEClose = +d.GEClose;
                return d;
            })
        );
    const promiseBubbleData = fetch("data/bubble.json").then(response => response.json());
    const promiseBarData = fetch("data/barData.json").then(response => response.json());
    const promisegroupedBarData = fetch("data/groupedBarData.json").then(response => response.json());

    Promise.all([
        promiseMSFT,
        promiseMSFTfull,
        promiseIntraDayContinuous,
        promiseIntraDayDiscontinuous,
        promiseCompare,
        promiseBubbleData,
        promiseBarData,
        promisegroupedBarData,
    ]).then(function (values) {
        const [
            MSFT,
            MSFTfull,
            intraDayContinuous,
            intraDayDiscontinuous,
            compareData,
            bubbleData,
            barData,
            groupedBarData,
        ] = values;
        const horizontalBarData = barData.map(({ x, y }) => ({ x: y, y: x }));
        const horizontalGroupedBarData = groupedBarData.map(d => {
            return {
                y: d.x,
                x1: d.y1,
                x2: d.y2,
                x3: d.y3,
                x4: d.y4,
            };
        });

        renderPage(
            MSFT,
            MSFTfull,
            intraDayContinuous,
            intraDayDiscontinuous,
            compareData,
            bubbleData,
            barData,
            groupedBarData,
            horizontalBarData,
            horizontalGroupedBarData
        );
        // renderPartialPage(MSFT, MSFTfull, intraDayContinuous, intraDayDiscontinuous, compareData, bubbleData, barData, groupedBarData, horizontalBarData, horizontalGroupedBarData);
    });
}

function renderPage(
    data,
    dataFull,
    intraDayContinuous,
    intraDayDiscontinuous,
    compareData,
    bubbleData,
    barData,
    groupedBarData,
    horizontalBarData,
    horizontalGroupedBarData
) {
    const selected = location.hash.replace("#/", "");
    const selectedPage = pages.filter(page => compressString(page.title) === compressString(selected));

    const firstPage = selectedPage.length === 0 ? pages[0] : selectedPage[0];

    // console.log(selected, selectedPage, firstPage);
    class ExamplesPage extends React.Component {
        constructor(props) {
            super(props);
            this.handleRouteChange = this.handleRouteChange.bind(this);
            this.state = {
                selectedPage: firstPage,
            };
        }
        handleRouteChange() {
            const selected = location.hash.replace("#/", "");
            const selectedPage = pages.filter(page => compressString(page.title) === compressString(selected));
            if (selectedPage.length > 0) {
                this.setState(
                    {
                        selectedPage: selectedPage[0],
                    },
                    _ => window.scrollTo(0, 0)
                );
            }
        }
        componentDidMount() {
            const $mainNav = document.querySelector("#main-nav");
            if ($mainNav) {
                document.body.style = `--padding-top:${$mainNav.getBoundingClientRect().height}px`;
            }
            window.addEventListener("hashchange", this.handleRouteChange, false);
        }
        render() {
            const Page = this.state.selectedPage;
            return (
                <div>
                    <Navbar />
                    <div className="container-fluid">
                        <div className="col-sm-3 col-md-2 sidebar">
                            {ALL_PAGES.map((eachGroup, i) => (
                                <div key={i}>
                                    <h4>{eachGroup.head}</h4>
                                    <ul className="nav nav-sidebar flex-column">
                                        {eachGroup.pages.map((eachPage, idx) => (
                                            <MenuItem
                                                key={idx}
                                                current={eachPage === this.state.selectedPage}
                                                title={eachPage.title}
                                                anchor={compressString(eachPage.title)}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <Page
                            someData={data}
                            intraDayContinuousData={intraDayContinuous}
                            intraDayDiscontinuousData={intraDayDiscontinuous}
                            lotsOfData={dataFull}
                            compareData={compareData}
                            bubbleData={bubbleData}
                            barData={barData}
                            groupedBarData={groupedBarData}
                            horizontalBarData={horizontalBarData}
                            horizontalGroupedBarData={horizontalGroupedBarData}
                        />
                    </div>
                </div>
            );
        }
    }

    ReactDOM.render(<ExamplesPage />, document.getElementById("chart-goes-here"));
}

function renderPartialPage(
    data,
    dataFull,
    intraDayContinuous,
    intraDayDiscontinuous,
    compareData,
    bubbleData,
    barData,
    groupedBarData,
    horizontalBarData,
    horizontalGroupedBarData
) {
    // var Renko = require("./lib/charts/Renko").init(dataFull);
    // AreaChart
    // AreaChartWithYPercent
    // CandleStickChart
    // CandleStickStockScaleChart
    // CandleStickStockScaleChartWithVolumeBarV1
    // CandleStickStockScaleChartWithVolumeBarV2
    // CandleStickStockScaleChartWithVolumeBarV3
    // CandleStickChartWithCHMousePointer
    // CandleStickChartWithZoomPan
    // CandleStickChartWithMA
    // CandleStickChartWithBollingerBandOverlay
    // CandleStickChartWithEdge
    // CandleStickChartWithCompare
    // CandleStickChartWithEdge  - Lots of data -> data={dataFull}/>
    // CandleStickChartForDiscontinuousIntraDay - intraDayDiscontinuous
    // CandleStickChartWithAnnotation
    // CandleStickChartWithUpdatingData
    // KagiWithUpdatingData
    // RenkoWithUpdatingData
    // PointAndFigureWithUpdatingData
    // CandleStickChartWithMACDIndicator
    // CandleStickChartWithRSIIndicator
    // CandleStickChartWithFullStochasticsIndicator
    // CandleStickChartWithForceIndexIndicator
    // OHLCChartWithElderRayIndicator
    // OHLCChartWithElderImpulseIndicator
    // CandleStickChartWithInteractiveIndicator
    // CandleStickChartWithFibonacciInteractiveIndicator
    // CandleStickChartWithBrush
    // CandleStickChartWithClickHandlerCallback
    // CandleStickChartWithDarkTheme
    // AreaChartWithZoomPan
    // AreaChartWithPointsAndEdge
    // HeikinAshi
    // Kagi
    // PointAndFigure
    // Renko
    const Chart = require("./lib/charts/CandleStickChartWithZoomPan.js").default;
    // data, dataFull, compareData
    class ExamplesPage extends React.Component {
        render() {
            return (
                <div>
                    <TypeChooser
                        type="hybrid"
                        style={{
                            position: "absolute",
                            top: 40,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                    >
                        {type => <Chart data={dataFull} type={type} />}
                    </TypeChooser>
                </div>
            );
        }
    }

    /*
					<TypeChooser type="svg">
						{(type) => <Chart data={data} type={type} />}
					</TypeChooser>
	*/
    ReactDOM.render(<ExamplesPage />, document.getElementById("chart-goes-here"));
}
