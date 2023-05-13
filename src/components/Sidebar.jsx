import React from 'react';
import { Drawer } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Logo from './images/Y.png'

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
            variant='permanent'
            anchor='left'
        >
            <Toolbar>
                <img alt={'A green Y'} src={Logo} style={{width: '50px', height: '50px'}}/>
            </Toolbar>
            <Divider />
            <Nav />
        </Drawer>
    )
}

export default SideBar