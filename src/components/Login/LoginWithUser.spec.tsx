import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";

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

describe("Login with user", () => {
    test("Should do login", async () => {
        render(<Login />);

        expect(screen.getByTestId("userImage")).toBeInTheDocument();
        expect(screen.getByTestId("userName")).toBeInTheDocument();
        expect(screen.getByTestId("logout")).toBeInTheDocument();
    });
});
