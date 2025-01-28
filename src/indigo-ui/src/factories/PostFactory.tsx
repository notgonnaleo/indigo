import axios from "axios";
import { dummyApiResponse } from "../models/Post";

const endpoint = "posts";

export const PostFactory = {
    getPosts: async (take: number, skip: number) => {
        const response = await axios.get<dummyApiResponse>(`https://dummyjson.com/${endpoint}?limit=${take}&skip=${skip}`);	
        return response.data;
    }
};
