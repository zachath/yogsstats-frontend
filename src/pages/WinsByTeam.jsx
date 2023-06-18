import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import { useQuery } from "react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

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

    const [apiData, setApiData] = useState([])

    useEffect(() => {
        const fetchApiData = async () => {
            await fetch(`https://api.yogsstats.com/stats/ttt/teamWins?from=${from}&to=${to}`)
                .then((response) => response.json())
                .then((json) => setApiData(json))
                .catch(error => console.log(error))
        }

        if (!metaData.isFetching && !metaData.isLoading && from === null && to === null) {
            setFrom(metaData.data.oldestRound.date)
            setMinDate(metaData.data.oldestRound.date)
            setTo(metaData.data.newestRound.date)
            setMaxDate(metaData.data.newestRound.date)
        }

        if (from && to) {
            fetchApiData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, from, to])

    if (apiData.teams === null) return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}></SetDate>
            <h1>No data in selected time span</h1>
        </>
    )

    if (apiData.teams === undefined) return

    const data = {
        labels: apiData.teams.map(x => x.team+" "+(x.wins*100 / apiData.total).toFixed(2)+"%"),
        datasets: [
            {
                label: 'Wins by team',
                data: apiData.teams.map(x => x.wins),
                backgroundColor: teamData.data.teams.map(x => x.colour),
                borderColor: 'black',
                borderWidth: 1
            }
        ]
    }
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
                position: 'right',
                rtl : true,
                labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
            }
        }
         },
    }

    return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}></SetDate>
            <div style={{height:'450px',width:'900px'}}>
                <Doughnut data={data} options={options} />
            </div>
        </>
    )
}

export default WinsByTeam