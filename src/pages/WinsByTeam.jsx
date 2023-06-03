import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Chart } from "react-google-charts";

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import { useQuery } from "react-query";

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

    const teamData = useQuery('teamQuery', Utils.getTeams)

    const [data, setData] = useState([])
    const fetchData = () => {
        fetch(`https://api.yogsstats.com/stats/ttt/teamWins?from=${from}&to=${to}`)
            .then((response) => response.json())
            .then((data) => setData(jsonToTable(data.teams)))
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        if (!metaData.isFetching && !metaData.isLoading && from === null && to === null) {
            setFrom(metaData.data.oldestRound.date)
            setMinDate(metaData.data.oldestRound.date)
            setTo(metaData.data.newestRound.date)
            setMaxDate(metaData.data.newestRound.date)
        }

        if (!teamData.isFetching && !teamData.isLoading) {
            let teams = teamData.data.teams
            for (let key in teams) {
                if (teams[key].team !== 'none') {
                    options.colors.push(teams[key].colour)
                }
            }
        }

        if (from !== null && to !== null) {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, from, to])

    if (metaData.isFetching || metaData.isLoading) return

    if (from === null || to === null) return

    if (data === null) return <h1>No data</h1>

    return (
        <Layout>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}/>
            <Chart chartType="PieChart" data={data} options={options} width={'100%'} height={'600px'}/>
        </Layout>
    )
}

export default WinsByTeam