import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Post } from '../models/Post';
import { PostFactory } from '../factories/PostFactory';
import { Card, CardContent, Typography } from '@mui/material';

const Feedpage: React.FC = () => {
    const [take, setTake] = useState<number>(20);
    const [skip, setSkip] = useState<number>(0);

    const [feed, setFeed] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const elementRef = useRef<HTMLDivElement>(null);

    const getPosts = async (take: number, skip: number) => {
        const response = await PostFactory.getPosts(take, skip);
        if(response.posts.length === 0) {
            setHasMore(false);
        } else {
            setFeed(prev => [...prev, ...response.posts]);
            setTake(prev => prev + 20);
        }
    }

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        const firstEntry = entries[0];
        if(firstEntry.isIntersecting && hasMore) {
            getPosts(take, skip);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((onIntersection) => {
            if(observer && elementRef.current) {
                observer.observe(elementRef.current);
            }
        });

        return () => {
            if(observer) {
                observer.disconnect();
            };
        };
    }, [feed]);



    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
            <h1>Feed</h1>
            {feed.length > 0 ? (
                feed.map((post, index) => (
                    <Card key={index} style={{ marginBottom: '20px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {post.body}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : <></>}
            </div>
        </>
    );
};

export default Feedpage;