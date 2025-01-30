import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Skeleton } from '@mui/material';
import { Post } from '../models/Post';
import { PostFactory } from '../factories/PostFactory';

const Feedpage: React.FC = () => {
    const [take, setTake] = useState<number>(20);
    const [skip, setSkip] = useState<number>(0);

    const [feed, setFeed] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const elementRef = useRef<HTMLDivElement>(null);

    const getPosts = async (take: number, skip: number) => {
        const response = await PostFactory.getPosts(take, skip);
        if(response.posts.length === 0) {
            setHasMore(false);
        } else {
            setFeed(prev => [...prev, ...response.posts]);
            setSkip(prev => prev + take);
            setLoading(false);
        }
    }

    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        const firstEntry = entries[0];
        if(firstEntry.isIntersecting && hasMore) {
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
            <div style={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    {loading ? (
                        Array.from(new Array(20)).map((_, index) => (
                            <Grid size={{ xs:12, sm:6, md:4, lg:3, xl:2 }} key={index}>
                                <Card style={{ height: '250px' }}>
                                    <CardContent>
                                        <Skeleton variant="text" width="80%" />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="rectangular" height={118} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        feed.map(post => (
                            <Grid size={{ xs:12, sm:6, md:4, lg:3, xl:2 }} key={post.id}>
                                <Card id={`card-${post.id}`} style={{ height: '250px' }}>
                                    <CardContent>
                                        <Typography variant="h5">{post.title}</Typography>
                                        <Typography variant="body2">{post.body}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
                <div id='load-more' ref={elementRef} style={{ height: '20px' }} />
            </div>
        </div>
    );
};

export default Feedpage;