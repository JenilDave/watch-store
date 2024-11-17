"use client";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const drawerWidth = 240;

export default function SideDrawer() {
    const [open, setOpen] = useState(false);
    const [authKey, setAuthKey] = useState('{}');
    const pathname = usePathname();
    const [drawerItems, setDrawerItems] = useState([
        {
            label: "Home",
            route: "/"
        },
        {
            label: "Watches",
            route: "/watches"
        },
        {
            label: "Add Watches",
            route: "/add-watches",
        },
        {
            label: "Edit Watch",
            route: "/edit-watch/",
        }
    ])
    const [drawerLabel, setDrawerLabel] = useState(drawerItems.filter(e => pathname.includes(e.route))[0].label)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const getPathName = () => pathname;

    useEffect(() => {
        setDrawerLabel(drawerItems.filter(e => getPathName().includes(e.route))[0].label)
        let authKey = ""
        if (typeof window !== 'undefined') {
            authKey = JSON.parse(localStorage.getItem("authKey"));
        }
        if (authKey === "{}") {
            setDrawerItems([...drawerItems.slice(0,4), {
                label: "Fan Login",
                route: "/login",
            }])
        }
        else {
            setDrawerItems([...drawerItems.slice(0,4), {
                label: "Logout",
                route: "/logout",
            }])
        }
    }, [open])

    return (
        <>
            <Toolbar>
                <IconButton
                    color="inherit"
                    onClick={handleDrawerOpen}
                    edge="start"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {drawerLabel}
                </Typography>
            </Toolbar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
                <Divider />
                <List>
                    {drawerItems.map((text, index) => (
                        <ListItem key={text.label} value={text.label} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={<Link href={text.route}>{text.label}</Link>} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
