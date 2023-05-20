import React from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const RoleSelect = (props) => {
    return (
        <FormControl fullWidth>
            <InputLabel id='role-select'>Role</InputLabel>
            <Select labelId="role-select" value={props.value} label='Role' onChange={props.handleChangeRole} defaultValue={'innocent'}>
                {props.roles.map((role) => (
                    <MenuItem value={role} key={role}>{role}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default RoleSelect