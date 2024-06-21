const emptyData = [];
const oneDataPoint = [{ date: new Date("2024-06-02T15:30:21.817Z"), close: 100 }];
const twoDataPoints = [
	{ date: new Date("2024-06-02T15:30:21.817Z"), close: 100 },
	{ date: new Date("2024-06-02T15:45:21.817Z"), close: 100.55 },
	{ date: new Date("2024-06-02T15:45:21.817Z"), close: 100.55 },
];
const chartDataPoints = [
	{ date: new Date("2024-06-02T15:30:21.817Z"), close: 100 },
	{ date: new Date("2024-06-02T15:45:21.817Z"), close: 100.55 },
	{ date: new Date("2024-06-02T16:00:12.817Z"), close: 100.59 },
	{ date: new Date("2024-06-02T16:15:30.817Z"), close: 100.61 },
];

type ChartData = {
	date: Date;
	close: number;
};
type TypOfData = "empty" | "singlePoint" | "duoPoints" | "trioPoints" | "regural";

export const getChartData = (type: TypOfData) => {
	switch (type) {
		case "empty":
			return [];
		case "singlePoint":
			return chartDataPoints.slice(0, 1);
		case "duoPoints":
			return chartDataPoints.slice(0, 2);
		case "trioPoints":
			return chartDataPoints.slice(0, 3);
		default:
			return chartDataPoints.slice();
	}
};
