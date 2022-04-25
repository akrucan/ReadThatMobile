import { User } from "./User";

export interface NewPost {
    readonly title: string;
    readonly body: string;
}

export interface Post extends NewPost {
    readonly author: User;
    readonly date: Date;
}
