import React from "react";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom'

const pages = [
    {
        text: 'Home',
        route: '/',
    }, 
    {
        text: 'Wins by team',
        route: '/wins-by-team'
    },
    {
        text: 'Detective win%',
        route: '/detective-win-percentage'
    },
    {
        text: 'Player win%',
        route: '/player-win-percentage'
    },
    {
        text: 'Traitor combo win%',
        route: '/traitor-combo-win-percentage'
    },
    {
        text: 'Role win%',
        route: '/role-win-percentage'
    },
    {
        text: 'Jester kills by player',
        route: '/jester-kills-by-player'
    },
]

const Nav = () => {
    return (
        <>
            <Divider />
            <List>
            {pages.map((page) => (
                <ListItem key={page.text} disablePadding component={Link} to={page.route}>
                    <ListItemButton>
                        <ListItemText primary={page.text} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </>
    )
}

export default Nav