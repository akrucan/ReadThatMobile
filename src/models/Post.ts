import { DocumentData } from "firebase/firestore";

export class Post {
    body: string;
    user: string;
    date: Date;

    constructor(postData: DocumentData) {
        this.body = postData.data;
        this.user = postData.user;
        this.date = new Date(postData.timestamp.seconds * 1000);
    }
}
