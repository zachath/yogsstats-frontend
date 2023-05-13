import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Chart } from "react-google-charts";

import SetDate from '../components/SetDateComponent'

const options = {
    titleTextStyle: {
        color: 'white'
    },
    backgroundColor: '#121212',
    legend: 'none',
    pieSliceText: 'label',
    colors: ['pink', '#8b0000', 'brown', 'green', 'purple', '#FF69B4', 'red', 'black'] //TODO: Maybe declare team colors in API?
}

function jsonToTable(data) {
    let results = [["Team", "Wins"]]
    for (let key in data) {
        results.push([key, data[key]])
    }
    return results
}

function buildDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

const WinsByTeam = () => {
    const [wins, setWins] = useState([])

    const handleFetch = () => {
        fetch('https://yogsstats.com/stats/ttt/teamWins?from='+from+'&to='+to)
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
    }, [])

    const [from, setFrom] = useState('2022-10-23')
    const handleChangeFrom = (e) => {
        setFrom(buildDate(e.$d))
    }
    const [to, setTo] = useState(buildDate(new Date()))
    const handleChangeTo = (e) => {
        setTo(buildDate(e.$d))
    }

    return (
        <Layout>
            <h1>Wins divided by teams</h1>
            <SetDate refresh={handleFetch} handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo}/>
            <Chart chartType="PieChart" data={jsonToTable(wins)} options={options} width={'100%'} height={'600px'}/>
        </Layout>
    )
}

export default WinsByTeam