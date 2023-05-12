import React from "react";
import { Drawer } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Nav from './Nav'

const SideBar = ({ sideBarWidth }) => {
    return (
        <Drawer
            sx={{
            width: sideBarWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: sideBarWidth,
                boxSizing: 'border-box',
            },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar>
                <Typography>
                    [IMAGE]
                </Typography>
            </Toolbar>
            <Divider />
            <Nav />
        </Drawer>
    )
}

export default SideBar