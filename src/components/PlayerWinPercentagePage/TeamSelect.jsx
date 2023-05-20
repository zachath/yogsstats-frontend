import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const TeamSelect = (props) => {
    return (
        <FormControl fullWidth>
            <InputLabel id='team-select'>Team</InputLabel>
            <Select labelId="team-select" value={props.value} label='Team' onChange={props.handleChangeTeam} defaultValue={'innocents'}>
                {props.teams.map((team) => (
                    <MenuItem value={team} key={team}>{team}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default TeamSelect