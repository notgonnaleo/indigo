import MainLayout from '../MainLayout';
import React, { useState } from 'react';
import { Collapse, List, ListItemText, Card, CardContent, Grid2, Button, ListItem, ListItemButton, ListItemIcon, ListSubheader } from '@mui/material';

const Menu: React.FC = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
    <MainLayout>
        <div style={{ padding: '20px' }}>
            <h1>Menu options</h1>
        </div>
        <Grid2 container spacing={2}>
            {['Card 1', 'Card 2', 'Card 3', 'Card 4'].map((card, index) => (
                <Grid2 size={{ xs:12, sm:6, md:4, lg:3, xl:2 }} key={`grid-${index}`}>
                    <Card id={`card-${index}`} variant='outlined'>
                        <CardContent>{card}</CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Nested List Items
            </ListSubheader>
            }
        >
        <ListItemButton>
            <ListItemIcon>{"#"}</ListItemIcon>
            <ListItemText primary="Sent mail" />
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>{"#"}</ListItemIcon>
            <ListItemText primary="Drafts" />
        </ListItemButton>

        <ListItemButton onClick={handleClick}>
            <ListItemIcon>{"#"}</ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? "Show less" : "Show more"}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>{"#"}</ListItemIcon>
                <ListItemText primary="Starred" />
            </ListItemButton>
            </List>
        </Collapse>
        </List>
    </MainLayout>
    );
};

export default Menu;