import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "../src/MyComponent";

describe("Initial test", () => {
	it("should work", () => {
		render(<MyComponent />);
		screen.debug();
	});
});
