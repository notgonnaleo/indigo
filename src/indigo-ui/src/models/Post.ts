export interface Post {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: Reaction[];
    views: number;
    userId: number;
}

export interface dummyApiResponse {
    posts: Post[];
}

interface Reaction {
    likes: number;
    dislikes: number;
}