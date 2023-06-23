import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import { useQuery } from "react-query";

ChartJS.register(ArcElement, Tooltip, Legend);

const JesterKillsByPlayer = () => {
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

    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const fetchApiData = () => {
            fetch(`https://api.yogsstats.com/stats/ttt/jesterKills?from=${from}&to=${to}`)
                .then((response) => response.json())
                .then((json) => setApiData(json))
                .catch((err) => {
                    console.log(err.message)
                })
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

    if (apiData.players === undefined) return

    //stupid
    const colors = {
        "Lewis": "red",
        "Ben": "blue",
        "Duncan": "green",
        "Ravs": "purple",
        "Pedguin": "orange",
        "Boba": "yellow",
        "Breeh": "pink",
        "Daltos": "teal",
        "Rythian": "cyan",
        "RTGame": "magenta",
        "Kirsty": "brown",
        "Shadow": "gray",
        "Lolip": "lime",
        "Zoey": "olive",
        "Zylus": "navy",
        "Osie": "maroon",
        "Nilesy": "gold",
        "Gee": "silver"
      }

    const data = {
        labels: apiData.players.map(x => x.player+" "+(x.kills*100 / apiData.totalJesterWins).toFixed(2)+"%"),
        datasets: [
            {
                label: 'Kills',
                data: apiData.players.map(x => x.kills),
                backgroundColor: apiData.players.map(x =>  colors[x.player]),
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
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}/>
            <h3>{apiData.totalJesterWins} jester wins</h3>
            <div style={{height:'450px',width:'900px'}}>
                <Doughnut data={data} options={options} />
            </div>
        </>
    )
}

export default JesterKillsByPlayer