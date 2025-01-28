import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/layout/Navbar';
import { Post } from '../models/Post';
import { PostFactory } from '../factories/PostFactory';
import { Card, CardContent, Typography } from '@mui/material';

const Feedpage: React.FC = () => {
    const [take, setTake] = useState<number>(20); // Start with 20 items
    // Work on where I need to add flag to change from 20 to 15 items per request without
    // disrespecting the state and effect hooks logic
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

    // What will happen 
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        const firstEntry = entries[0];
        if(firstEntry.isIntersecting && hasMore) {
            getPosts(take, skip);
        } else {
            console.log(`Taking ${take} items and skipping the previous ${skip - take} items`);
        }
    };


    // When will happen
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