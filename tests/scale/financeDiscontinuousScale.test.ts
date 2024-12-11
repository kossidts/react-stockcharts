import { describe, it, expect } from "vitest";

import { financeDiscontinuousScale } from "@/lib/scale";

describe("financeDiscontinuousScale", () => {
	// Sample index mock for testing
	const mockIndex = [
		{ index: 0, level: 0, format: d => d.toISOString(), date: new Date("2023-01-01") },
		{ index: 1, level: 1, format: d => d.toISOString(), date: new Date("2023-02-01") },
		{ index: 2, level: 2, format: d => d.toISOString(), date: new Date("2023-03-01") },
	];

	it("should throw an error if index is not defined", () => {
		expect(() => financeDiscontinuousScale()).toThrow(
			"Use the discontinuousTimeScaleProvider to create financeDiscontinuousScale"
		);
	});

	it("should create a scale function with required methods", () => {
		const scale = financeDiscontinuousScale(mockIndex);

		expect(scale).toBeDefined();
		expect(typeof scale).toBe("function");
		expect(scale.domain).toBeInstanceOf(Function);
		expect(scale.range).toBeInstanceOf(Function);
		expect(scale.invert).toBeInstanceOf(Function);
		expect(scale.ticks).toBeInstanceOf(Function);
		expect(scale.tickFormat).toBeInstanceOf(Function);
		expect(scale.copy).toBeInstanceOf(Function);
	});

	it("should handle domain and range operations", () => {
		const scale = financeDiscontinuousScale(mockIndex);

		// Domain
		scale.domain([0, 2]);
		expect(scale.domain()).toEqual([0, 2]);

		// Range
		scale.range([0, 100]);
		expect(scale.range()).toEqual([0, 100]);
	});

	it("should invert values with rounding", () => {
		const scale = financeDiscontinuousScale(mockIndex);

		scale.domain([0, 2]).range([0, 100]);

		// expect(scale.invert(50)).toBeCloseTo(1, 4);
		// expect(scale.invert(25)).toBeCloseTo(0.5, 4);
		expect(scale.invert(50)).toEqual(1);
		expect(scale.invert(25)).toEqual(0.5);
	});

	it("should return correct value for a given index", () => {
		const scale = financeDiscontinuousScale(mockIndex);

		const value = scale.value(1);
		expect(value).toEqual(new Date("2023-02-01"));

		// const testIndex = 1;
		// const value = scale.value(testIndex);
		// expect(value).toEqual(mockIndex[testIndex].date);
	});

	it("should format ticks correctly", () => {
		const scale = financeDiscontinuousScale(mockIndex);

		const formatter = scale.tickFormat();
		expect(formatter(1)).toBe("2023-02-01T00:00:00.000Z");
	});

	it("should create a copy of the scale", () => {
		const scale = financeDiscontinuousScale(mockIndex);
		const copiedScale = scale.copy();

		expect(copiedScale).not.toBe(scale);
		expect(copiedScale.index()).toEqual(mockIndex);
	});

	it("should handle ticks generation", () => {
		const scale = financeDiscontinuousScale(mockIndex);
		scale.domain([0, 2]);

		const ticks = scale.ticks();
		expect(ticks).toBeInstanceOf(Array);
		expect(ticks.length).toBeGreaterThan(0);
	});
});
