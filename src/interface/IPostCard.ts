import { IComment } from "./IComment";

export interface IPostCard {
    id: string,
    postText: string,
    photoURL: string,
    displayName: string,
    createdAt: number,
    comments: IComment[],
    hearts: number
}
