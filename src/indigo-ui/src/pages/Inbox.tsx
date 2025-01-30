import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, Typography, Skeleton, Button, Box, Breadcrumbs, Link, TextField } from '@mui/material';
import { InvoiceFactory } from '../factories/InvoiceFactory';
import { Invoice, InvoiceStatus } from '../models/Invoice';
import MainLayout from '../components/layout/MainLayout';

const Inbox: React.FC = () => {
    const [take, setTake] = useState<number>(20);
    const [skip, setSkip] = useState<number>(0);

    const [feed, setFeed] = useState<Invoice[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [loading, setLoading] = useState(true);
    const elementRef = useRef<HTMLDivElement>(null);

    const getInvoices = async (take: number, skip: number) => {
        const response = await InvoiceFactory.getInvoicesByStatus(InvoiceStatus.Pending, take, skip);
        if(response.length === 0) {
            setHasMore(false);
        } else {
            setFeed(prev => [...prev, ...response]);
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
            getInvoices(take, skip);
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
        <MainLayout>
        <Box>
            <Box sx={{ padding: '16px' }}>

                <Breadcrumbs aria-label="breadcrumb" sx={{ margin: '16px' }}>
                    <Link color="inherit" href="/">Home</Link>
                    <Typography color="textPrimary">Inbox</Typography>
                </Breadcrumbs>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    {Object.keys(InvoiceStatus).filter(key => isNaN(Number(key))).map((status, index) => (
                        <Card
                            variant='outlined'
                            key={index}
                            sx={{
                                flex: 1,
                                marginLeft: '16px',
                                marginRight: '1px',
                                padding: '16px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: 'background.paper',
                                color: 'text.primary'
                            }}
                            onClick={() => {console.log("Hello")}}
                        >
                            <Typography variant="h6">{status}</Typography>
                        </Card>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', margin: '16px', alignItems: 'center' }}>
                    <TextField
                        label="Vendor Name"
                        variant="outlined"
                        sx={{ marginRight: '16px' }}
                    />
                    <TextField
                        label="Bank Name"
                        variant="outlined"
                        sx={{ marginRight: '16px' }}
                    />
                    <TextField
                        label="Bank Account Number"
                        variant="outlined"
                        sx={{ marginRight: '16px' }}
                    />
                    <TextField
                        label="Amount"
                        variant="outlined"
                        sx={{ marginRight: '16px' }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" color="primary">
                        Search
                    </Button>
                </Box>

                <Grid container spacing={2} sx={{ margin: '16px' }}>
                    {loading ? (
                        Array.from(new Array(20)).map((_, index) => (
                            <Grid size={{ xs:12, sm:6, md:4, lg:3, xl:2 }} key={index}>
                                <Card 
                                    variant='outlined'
                                    sx={{ height: '200px' }}>
                                    <CardContent>
                                        <Skeleton variant="text" width="80%" />
                                        <Skeleton variant="text" width="60%" />
                                        <Skeleton variant="rectangular" height={118} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        feed.map(invoice => (
                            <Grid size={{ xs:12, sm:6, md:4, lg:3, xl:2 }} key={invoice.InvoiceId}>
                                <Card 
                                    variant='outlined'
                                    id={`card-${invoice.InvoiceId}`} 
                                    sx={{ 
                                        height: '200px', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        justifyContent: 'space-between', 
                                        transition: 'transform 0.2s', 
                                        cursor: "pointer",
                                    }} 
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <CardContent>
                                        <Typography variant="h5">Invoice #{invoice.InvoiceNumber}</Typography>
                                        <Typography variant="body2">{invoice.Description}</Typography>
                                        <Typography variant="body2">{invoice.Bank.BankName} - {invoice.BankAccount.AccountNumber}</Typography>
                                        <Typography variant="body2">Vendor: {invoice.Vendor.VendorName}</Typography>
                                        <Typography variant="body2">Total Amount: {invoice.Amount}</Typography>
                                    </CardContent>
                                    <Box style={{ display: 'flex', justifyContent: 'space-around', padding: '8px' }}>
                                        <Button>Pay</Button>
                                        <Button>Void</Button>
                                        <Button>View</Button>
                                    </Box>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
                <div id='load-more' ref={elementRef} style={{ height: '20px' }} />
            </Box>
        </Box>
        </MainLayout>
    );
};

export default Inbox;