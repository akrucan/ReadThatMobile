import { User } from "./User";

export interface NewPost {
    readonly title: string;
    readonly body: string;
}

export interface Post extends NewPost {
    readonly id: string;
    readonly author: User;
    readonly date: Date;
    likeAmount: number;
    didUserLike: boolean;
}
