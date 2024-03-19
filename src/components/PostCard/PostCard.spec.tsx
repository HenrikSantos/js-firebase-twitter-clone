import React from "react";
import { render } from "@testing-library/react";
import PostCard from "./PostCard";

test("checks if the div with text PostCard is present", () => {
  const { getByText } = render(<PostCard />);
  const divElement = getByText(/PostCard/i);
  expect(divElement).toBeInTheDocument();
});