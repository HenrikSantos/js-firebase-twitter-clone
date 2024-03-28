import React from "react";
import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import PostForm from "./PostForm";
import "@testing-library/jest-dom";
import addPost from "@/api/addPost";
import { act } from "react-dom/test-utils";

const mockUser = {
    uid: "123456789",
    displayName: "João da Silva",
    email: "joao@exemplo.com",
    photoURL: "https://exemplo.com/foto.jpg",
};

jest.mock("@/api/addPost");

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

describe("PostForm", () => {
    beforeEach(() => {
        cleanup();
    });

    test("Should render PostForm correctly", () => {
        render(<PostForm />);

        const formTextArea = screen.getByTestId("formTextArea");
        expect(formTextArea).toBeDefined();

        const letterCounter = screen.getByTestId("textLegthCounter");
        expect(letterCounter).toBeDefined();
        expect(letterCounter).toHaveTextContent("0/280");
        fireEvent.change(formTextArea, { target: { value: "Hello World!" } });
        expect(letterCounter).toHaveTextContent("12/280");

        const fullValue = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

        fireEvent.change(formTextArea,
            {
                target: {
                    value: fullValue,
                }
            }
        );

        expect(screen.getByTestId("textLegthCounter")).toHaveTextContent("280/280");

        fireEvent.change(formTextArea,
            {
                target: {
                    value: `${fullValue}a`,
                }
            }
        );

        expect(screen.getByTestId("textLegthCounter")).toHaveTextContent("280/280");
        expect(formTextArea).toHaveValue(fullValue);

        const postBtn = screen.getByTestId("postBtn");

        act(() => {
            postBtn.click();
        });

        expect(addPost).toHaveBeenCalledWith(fullValue, mockUser);
    });
});
