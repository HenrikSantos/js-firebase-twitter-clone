import React from "react";
import { render } from "@testing-library/react";
import CommentForm from "./CommentForm";

test("checks if the div with text CommentForm is present", () => {
  const { getByText } = render(<CommentForm />);
  const divElement = getByText(/CommentForm/i);
  expect(divElement).toBeInTheDocument();
});