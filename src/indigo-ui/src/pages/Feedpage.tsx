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
            setSkip(prev => prev + take);
        }
    }

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        const firstEntry = entries[0];
        if(firstEntry.isIntersecting && hasMore) {
            // After the first load, we want to load 15 items at a time.
            if(skip > 0) {
                setTake(15);
            }
            getPosts(take, skip);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
        if(observer) {
            if (elementRef.current) {
                observer.observe(elementRef.current);
            }

            return () => {
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            };
        }

    }, [feed]);

    return (
        <div>
            <Navbar />
            {feed.map(post => (
                <Card id={`card-${post.id}`} key={post.id}>
                    <CardContent>
                        <Typography variant="h5">{post.title}</Typography>
                        <Typography variant="body2">{post.body}</Typography>
                    </CardContent>
                </Card>
            ))}
            <div id='load-more' ref={elementRef} style={{ height: '20px' }} />
        </div>
    );
};

export default Feedpage;