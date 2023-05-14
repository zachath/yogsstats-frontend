import React from 'react';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
}));

const DateSelector = (props) => {
    return (
        <DatePicker 
            onChange={props.onChange}
            slotProps={{ textField: { size: 'small'} }} 
            label={props.label} defaultValue={dayjs(props.value)} 
            minDate={dayjs(props.minDate)} 
            maxDate={dayjs(props.maxDate)}
        />
    )
}

const SetDateComponent = (props) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={4} alignItems={'center'} justifyContent={'center'}>
                <Item>
                    <Typography backgroundColor={'#121212'} variant={'h5'}>Select the dates to query between</Typography>
                </Item>
                <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Item>
                        <DateSelector onChange={props.handleChangeFrom} label={'From date'} value={'2022-10-23'} minDate={'2022-10-23'}/>
                    </Item>
                    <Item>
                        <DateSelector onChange={props.handleChangeTo} label={'To date'} value={new Date()} minDate={'2022-10-23'} maxDate={new Date()}/>
                    </Item>
                </Stack>
                <Stack spacing={2} direction={'row'} alignItems={'center'} justifyContent={'center'}>
                    <Item>
                        <Button onClick={() => {props.refresh()}} variant='contained'>Refresh</Button>
                    </Item>
                    <Item>
                        {props.children}
                    </Item>
                </Stack>
            </Stack>
        </LocalizationProvider>
    )
}

export default SetDateComponent