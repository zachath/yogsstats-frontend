import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Layout from "../components/Layout";

import SetDate from '../components/SetDateComponent'
import * as Utils from './js/util'

const cols = [
    { field: 'Player', label: 'Player', flex: 1},
    { field: 'WinRate', label: 'Win rate', flex: 1},
    { field: 'RoundsPlayed', label: 'Rounds played', type: 'number', flex: 1}
]

const DetectiveWinPercentage = () => {
    const [players, setPlayers] = useState([])

    const handleFetch = () => {
        fetch('http://localhost:8080/stats/ttt/detectiveWinPercentage?round=true&canon=false&from='+from+'&to='+to)
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < data.players.length; i++) {
                    data.players[i].WinRate = (data.players[i].WinRate*100).toFixed(1)+'%'
                }
                setPlayers(data.players)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        handleFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [from, setFrom] = useState('2022-10-23')
    const handleChangeFrom = (e) => {
        setFrom(Utils.buildDate(e.$d))
    }
    const [to, setTo] = useState(Utils.buildDate(new Date()))
    const handleChangeTo = (e) => {
        setTo(Utils.buildDate(e.$d))
    }

    return (
        <Layout spacing={1}>
            <h1>Detective Win Percentage</h1>
            <SetDate refresh={handleFetch} handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo}/>
                <DataGrid autoHeight {...players} getRowId={(row) => Utils.generateStringId(row.Player)} columns={cols} rows={players}/>
        </Layout>
    )
}

export default DetectiveWinPercentage