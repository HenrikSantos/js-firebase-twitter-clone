import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CommentForm from "./CommentForm";
import "@testing-library/jest-dom";

jest.spyOn(window, "alert");

jest.mock("zustand", () => {
    const mockStore = {
        posts: [],
        user: null,
        fetchUsers: () => { },
    };

    const mockCreate = jest.fn().mockImplementation(() => mockStore);

    return {
        create: mockCreate,
        useStore: () => mockStore,
    };
});

jest.spyOn(window, "alert").mockImplementation(() => { });

describe("CommentForm without user", () => {
    test("Should call window.alert when not logged in", () => {
        render(<CommentForm id="99999" />);

        const textArea = screen.getByTestId("CommentTextArea");
        fireEvent.change(textArea, { target: { value: "Hello World!" } });
        const addCommentBtn = screen.getByTestId("addCommentBtn");

        act(() => {
            addCommentBtn.click();
        });

        expect(window.alert).toHaveBeenCalledWith("You must be logged in to comment");

    });
});
