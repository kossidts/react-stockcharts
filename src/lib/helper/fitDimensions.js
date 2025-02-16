import { Component, createRef } from "react";

import { isDefined } from "../utils";

function getDisplayName(Series) {
    const name = Series.displayName || Series.name || "Series";
    return name;
}

export default function fitDimensions(WrappedComponent, props = {}) {
    const { minWidth = 100, minHeight = 100, ratio, width, height } = props;

    function getDimensions(el) {
        const w = el.parentNode.clientWidth;
        const h = el.parentNode.clientHeight;

        return {
            width: isDefined(width) ? width : Math.max(w, minWidth),
            height: isDefined(height) ? height : Math.max(h, minHeight),
        };
    }
    class ResponsiveComponent extends Component {
        constructor(props) {
            super(props);
            this.handleWindowResize = this.handleWindowResize.bind(this);
            this.getWrappedInstance = this.getWrappedInstance.bind(this);
            this.setTestCanvas = this.setTestCanvas.bind(this);
            this.state = {};
            this.node = createRef();
        }

        setTestCanvas(node) {
            this.testCanvas = node;
        }
        getRatio() {
            if (isDefined(this.testCanvas)) {
                const context = this.testCanvas.getContext("2d");

                const devicePixelRatio = window.devicePixelRatio || 1;
                const backingStoreRatio =
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio ||
                    1;

                const ratio = devicePixelRatio / backingStoreRatio;
                // console.log("ratio = ", ratio);
                return ratio;
            }
            return 1;
        }
        componentDidMount() {
            window.addEventListener("resize", this.handleWindowResize);
            const dimensions = getDimensions(this.node);

            this.setState({
                ...dimensions,
                ratio: isDefined(ratio) ? ratio : this.getRatio(),
            });
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.handleWindowResize);
        }
        handleWindowResize() {
            this.setState(getDimensions(this.node.current));
        }
        getWrappedInstance() {
            return this.node;
        }
        render() {
            if (this.state.width) {
                return (
                    <WrappedComponent
                        height={this.state.height}
                        width={this.state.width}
                        ratio={this.state.ratio}
                        {...this.props}
                        ref={this.node}
                    />
                );
            } else {
                return (
                    <div ref={this.node}>
                        <canvas ref={this.setTestCanvas} />
                    </div>
                );
            }
        }
    }

    ResponsiveComponent.displayName = `fitDimensions(${getDisplayName(WrappedComponent)})`;

    return ResponsiveComponent;
}
