import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Chart } from "react-google-charts";

import SetDate from '../components/SetDateComponent'
import * as Utils from './js/util'

const options = {
    titleTextStyle: {
        color: 'white'
    },
    backgroundColor: '#121212',
    legend: 'none',
    pieSliceText: 'label',
    colors: []
}

function jsonToTable(data) {
    let results = [["Team", "Wins"]]
    for (let key in data) {
        results.push([data[key].team, data[key].wins])
    }
    return results
}

const WinsByTeam = () => {
    const [wins, setWins] = useState([])

    const [from, setFrom] = useState('2022-10-23')
    const handleChangeFrom = (e) => {
        setFrom(Utils.buildDate(e.$d))
    }
    const [to, setTo] = useState(Utils.buildDate(new Date()))
    const handleChangeTo = (e) => {
        setTo(Utils.buildDate(e.$d))
    }

    const handleFetch = () => {
        fetch('http://localhost:8080/stats/ttt/teams')
            .then((response) => response.json())
            .then((data) => {
                for (let key in data.teams) {
                    if (data.teams[key].team !== 'none') {
                        options.colors.push(data.teams[key].colour)
                    }
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
        fetch('http://localhost:8080/stats/ttt/teamWins?from='+from+'&to='+to)
            .then((response) => response.json())
            .then((data) => {
                setWins(data.teams)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        handleFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to])

    return (
        <Layout>
            <SetDate refresh={handleFetch} handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo}/>
            <Chart chartType="PieChart" data={jsonToTable(wins)} options={options} width={'100%'} height={'600px'}/>
        </Layout>
    )
}

export default WinsByTeam