import React from "react";
import { render } from "@testing-library/react";
import Feed from "./Feed";

test("checks if the div with text Feed is present", () => {
  const { getByText } = render(<Feed />);
  const divElement = getByText(/Feed/i);
  expect(divElement).toBeInTheDocument();
});