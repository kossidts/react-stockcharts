import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom/vitest";
// import { SingleValueTooltip } from "react-stockcharts/lib/tooltip/SingleValueTooltip.js";
// import SingleValueTooltip from "@/lib/tooltip/SingleValueTooltip.js";
import SingleValueTooltip from "./SingleVualeTooltipTest.jsx";

describe("SomeTest", () => {
	it("should render something when attr is provided", () => {
		expect(1).toBeTruthy();
		render(<SingleValueTooltip attr="AAA" />);
		// const $element = screen.getByText(/AAA/);
		// expect(element).toBeInTheDocument();
		screen.debug();
	});
	it("should render a login button if attr is not provided", () => {
		// render(<SomeComponent />);
		// const $element = screen.getByRole("button", { name: /Login/i });
		// expect(element).toBeInTheDocument();
	});
});
