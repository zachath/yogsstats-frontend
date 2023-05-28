import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const PlayerSelect = (props) => {
    return (
        <FormControl fullWidth>
            <InputLabel id='player-select'>Player</InputLabel>
            <Select labelId="player-select" value={props.value} label='Player' onChange={props.handleChangePlayer} defaultValue={'Ben'}>
                {props.players.map((player) => (
                    <MenuItem value={player} key={player}>{player}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default PlayerSelect