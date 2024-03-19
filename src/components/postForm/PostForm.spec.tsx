import React from "react";
import { render } from "@testing-library/react";
import PostForm from "./PostForm";

test("checks if the div with text PostForm is present", () => {
  const { getByText } = render(<PostForm />);
  const divElement = getByText(/PostForm/i);
  expect(divElement).toBeInTheDocument();
});