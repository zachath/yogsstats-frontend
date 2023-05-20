import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import Layout from "../components/Layout";
import SetDate from '../components/SetDateComponent'
import * as Utils from './js/util'

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
    const [players, setPlayers] = useState([])

    const [from, setFrom] = useState('2022-10-23')
    const handleChangeFrom = (e) => {
        setFrom(Utils.buildDate(e.$d))
    }
    const [to, setTo] = useState(Utils.buildDate(new Date()))
    const handleChangeTo = (e) => {
        setTo(Utils.buildDate(e.$d))
    }
    const [canon, setCanon] = useState(false)
    const handleChangeCanon = (e) => {
        setCanon(!canon)
    }

    const handleFetch = () => {
        fetch('http://localhost:8080/stats/ttt/detectiveWinPercentage?round=true&canon='+canon+'&from='+from+'&to='+to)
            .then((response) => response.json())
            .then((data) => {
                setPlayers(data.players)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        handleFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, canon])

    return (
        <Layout spacing={1}>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo}>
                <FormControlLabel control={<Checkbox onChange={handleChangeCanon}/>} label='Only include canon rounds'/>
            </SetDate>
            <Chart chartType='ComboChart' width={'100%'} height={'600px'} data={jsonToTable(players)} options={options}/>
        </Layout>
    )
}

export default DetectiveWinPercentage