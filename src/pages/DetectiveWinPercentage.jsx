import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import { useQuery } from "react-query";

function jsonToTable(data) {
    let results = [['Player', 'Win percentage', 'Average (weighted)']]

    if (data.length === 0) {
        results[0].push({role: 'annotation', type: 'string'})
        results.push(['', 0, 0, 'No data'])
    }

    let weights = 0
    let dividend = 0

    for (let key in data) {
        weights += data[key].roundsPlayed
        dividend += data[key].roundsPlayed * data[key].winPercentage
    }

    let average = dividend / weights

    for (let key in data) {
        results.push([data[key].player+` (${data[key].roundsPlayed})`, data[key].winPercentage, average])
    }
    return results
}

const options = {
    title: 'Detective win percentage divided by player (Rounds played in parentheses)',
    vAxis: { title: 'Detective win percentage', textStyle: { color: 'white' }, titleTextStyle: {color: 'white'}, viewWindow: { min: 0, max: 1}},
    hAxis: { title: 'Player', textStyle: { color: 'white' }, titleTextStyle: {color: 'white'}},
    seriesType: 'bars',
    series: {1: { type: 'line' }},
    titleTextStyle: {color: 'white'},
    legend: { textStyle: { color: 'white' } },
    backgroundColor: '#121212',
    annotations: {
        stem: {
            color: 'transparent',
            length: 120
        },
        textStyle: {
            color: '#9E9E9E',
            fontSize: 18
        }
    },
}

const DetectiveWinPercentage = () => {
    
    const metaData = useQuery('meta', Utils.getMetaData);

    const [from, setFrom] = useState(null)
    const handleChangeFrom = (e) => {
        setFrom(Utils.buildDate(e.$d))
    }
    const [minDate, setMinDate] = useState(null)

    const [to, setTo] = useState(null)
    const handleChangeTo = (e) => {
        setTo(Utils.buildDate(e.$d))
    }
    const [maxDate, setMaxDate] = useState(null)

    const [canon, setCanon] = useState(false)
    const handleChangeCanon = (e) => {
        setCanon(!canon)
    }

    const [data, setData] = useState(null)
    const fetchData = () => {
        fetch(`https://api.yogsstats.com/stats/ttt/detectiveWinPercentage?round=true&canon=${canon}&from=${from}&to=${to}`)
            .then((response) => response.json())
            .then((data) => setData(data.players))
    }

    useEffect(() => {
        if (!metaData.isFetching && !metaData.isLoading && from === null && to === null) {
            setFrom(metaData.data.oldestRound.date)
            setMinDate(metaData.data.oldestRound.date)
            setTo(metaData.data.newestRound.date)
            setMaxDate(metaData.data.newestRound.date)
        }

        if (from !== null && to !== null) {
            fetchData()
        }
        // eslint-disable-next-line
    }, [metaData.isFetching, metaData.isLoading, from, to, canon])

    if (metaData.isFetching || metaData.isLoading) return

    if (from === null || to === null) return

    if (data === null) return <h1>No data</h1>

    return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <FormControlLabel control={<Checkbox onChange={handleChangeCanon}/>} label='Only include canon rounds'/>
            </SetDate>
            <Chart chartType='ComboChart' width={'100%'} height={'600px'} data={jsonToTable(data)} options={options}/>
        </>
    )
}

export default DetectiveWinPercentage