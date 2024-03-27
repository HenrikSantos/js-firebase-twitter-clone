import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import addComment from "@/api/addComment";
import CommentForm from "./CommentForm";
import "@testing-library/jest-dom";

jest.mock("@/api/addComment");

const mockUser = {
    uid: "123456789",
    displayName: "João da Silva",
    email: "joao@exemplo.com",
    photoURL: "https://exemplo.com/foto.jpg",
};

jest.mock("zustand", () => {
    const mockStore = {
        posts: [],
        user: {
            uid: "123456789",
            displayName: "João da Silva",
            email: "joao@exemplo.com",
            photoURL: "https://exemplo.com/foto.jpg",
        },
        fetchUsers: () => { },
    };

    const mockCreate = jest.fn().mockImplementation(() => mockStore);

    return {
        create: mockCreate,
        useStore: () => mockStore,
    };
});

describe("CommentForm", () => {
    beforeEach(() => {
        cleanup();
    });

    test("Should render CommentForm", () => {
        render(<CommentForm id="99999" />);
        const textArea = screen.getByTestId("CommentTextArea");
        expect(textArea).toBeDefined();

        fireEvent.change(textArea, { target: { value: "Hello World!" } });
        expect(textArea).toHaveValue("Hello World!");
        expect(screen.getByTestId("textLegthCounter")).toHaveTextContent("12/280");

        fireEvent.change(textArea,
            {
                target: {
                    value: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
                }
            }
        );

        expect(screen.getByTestId("textLegthCounter")).toHaveTextContent("280/280");
    });

    test("Should call addComment function with id, text and user", () => {
        render(<CommentForm id="99999" />);

        const textArea = screen.getByTestId("CommentTextArea");
        fireEvent.change(textArea, { target: { value: "Hello World!" } });

        const addCommentBtn = screen.getByTestId("addCommentBtn");
        act(() => {
            addCommentBtn.click();
        });

        expect(addComment).toHaveBeenCalledWith("99999", "Hello World!", mockUser);

        expect(textArea).toHaveValue("");
    });
});
