import { getCurrentItem } from "./ChartDataUtil";

import { last } from "./index";

export function mouseBasedZoomAnchor({ xScale, xAccessor, mouseXY, plotData }) {
    const currentItem = getCurrentItem(xScale, xAccessor, mouseXY, plotData);
    return xAccessor(currentItem);
}

export function lastVisibleItemBasedZoomAnchor({ xAccessor, plotData }) {
    const lastItem = last(plotData);
    return xAccessor(lastItem);
}

export function rightDomainBasedZoomAnchor({ xScale }) {
    const [, end] = xScale.domain();
    return end;
}
