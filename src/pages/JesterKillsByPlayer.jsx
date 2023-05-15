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
    pieSliceText: 'label'
}

function jsonToTable(data) {
    let results = [["Player", "Kills"]]
    for (let key in data) {
        results.push([data[key].player, data[key].kills])
    }
    return results
}

const JesterKillsByPlayer = () => {
    const [kills, setKills] = useState([])

    const handleFetch = () => {
        fetch('http://localhost:8080/stats/ttt/jesterKills?from='+from+'&to='+to)
            .then((response) => response.json())
            .then((data) => {
                setKills(data.players)
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
        <Layout>
            <SetDate refresh={handleFetch} handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo}/>
            <Chart chartType="PieChart" data={jsonToTable(kills)} options={options} width={'100%'} height={'600px'}/>
        </Layout>
    )
}

export default JesterKillsByPlayer