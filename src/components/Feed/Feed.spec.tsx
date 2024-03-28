import React from "react";
import { render, screen } from "@testing-library/react";
import Feed from "./Feed";

describe("Feed", () => {
    test("Should render Feed component", () => {
        render(<Feed />);
        expect(screen.getByTestId("feed")).toBeDefined();
    });
});
