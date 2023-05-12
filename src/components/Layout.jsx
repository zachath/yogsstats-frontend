import React from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'

import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import TopBarHeader from "./TopBarHeader"

const sideBarWidth = 240;

const Main = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3)
}))

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <TopBar sideBarWidth={sideBarWidth}/>
            <SideBar sideBarWidth={sideBarWidth}/>
            <Main>
                <TopBarHeader />
                {children}
            </Main>
        </Box>
    )
}

export default Layout