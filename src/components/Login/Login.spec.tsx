import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

describe("Login", () => {
    test("Should render Login without user", () => {
        render(<Login />);
        expect(screen.getByTestId("loginBtn")).toBeDefined();
    });
});
