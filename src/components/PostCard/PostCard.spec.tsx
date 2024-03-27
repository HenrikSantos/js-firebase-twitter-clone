import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import PostCard from "./PostCard";

const mockUser = {
    uid: "123456789",
    displayName: "João da Silva",
    email: "joao@exemplo.com",
    photoURL: "https://exemplo.com/foto.jpg",
};

const postMockWithoutComments = {
    id: "1",
    postText: "Test post",
    photoURL: "https://example.com/photo.jpg",
    displayName: "Test User",
    comments: [],
    hearts: 0,
    createdAt: 9999
};

const postMockWithComments = {
    id: "1",
    postText: "Test post",
    photoURL: "https://example.com/photo.jpg",
    displayName: "Test User",
    hearts: 1,
    createdAt: 9999,
    comments: [
        {
            createdAt: 99999,
            commentText: "meu comentário",
            photoURL: "https://example.com/photo.jpg",
            displayName: "larápio"
        }
    ]
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

import addHeart from "@/api/addHeart";

jest.mock("@/api/addHeart");

describe("PostCard", () => {
    beforeEach(() => {
        cleanup();
    });

    test("Should render a component without comments", () => {
        render(<PostCard post={postMockWithoutComments} />);

        expect(screen.getByTestId("personImage")).toBeDefined;
        expect(screen.getByTestId("hearts")).toBeDefined;
        expect(screen.getByTestId("heartImage")).toBeDefined;
        expect(screen.getByTestId("handleHeartButton")).toBeDefined;
        expect(screen.getByTestId("displayName")).toBeDefined;
        expect(screen.getByTestId("postText")).toBeDefined;
    });

    test("Should render a component with comments", () => {
        render(<PostCard post={postMockWithComments} />);

        expect(screen.getByTestId("hrShowing")).toBeDefined;
        expect(screen.getByTestId("commentphotoURL99999")).toBeDefined;
        expect(screen.getByTestId("commentlarápio")).toBeDefined;
        expect(screen.getByTestId("commentTextPost99999").textContent).toEqual(postMockWithComments.comments[0].commentText);
    });

    test("Should call addHeart with the correct id and user", () => {
        render(<PostCard post={postMockWithoutComments} />);

        const button = screen.getByTestId("handleHeartButton");
        button.click();

        expect(addHeart).toHaveBeenCalledWith(postMockWithoutComments.id, mockUser);
    });

});
