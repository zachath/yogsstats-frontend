import React from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'

import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import TopBarHeader from "./TopBarHeader"

const sideBarWidth = 240;

const Main = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3)
}))

const Layout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <TopBar sideBarWidth={sideBarWidth}/>
            <SideBar sideBarWidth={sideBarWidth}/>
            <Main>
                <TopBarHeader />
                <Outlet />
            </Main>
        </Box>
    )
}

export default Layout