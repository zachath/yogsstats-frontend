import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const TopBar = ({ sideBarWidth }) => {
    return (
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${sideBarWidth}px)`, ml: `${sideBarWidth}px` }}
        >
            <Toolbar>
            <Typography variant="h4" noWrap component="div">
                YogsStats
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar