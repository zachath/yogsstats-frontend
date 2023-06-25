import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import { useQuery } from "react-query";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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

    function sort(json) {
        json.players.sort((a, b) => {
            if (a.winPercentage === b.winPercentage) {
                return a.roundsPlayed - b.roundsPlayed
            } else {
                return a.winPercentage - b.winPercentage
            }
        })
        return json
    }

    function addAverage(json) {
        let weights = 0
        let dividend = 0

        for (let key in json.players) {
            console.log(key)
            weights += json.players[key].roundsPlayed
            dividend += json.players[key].roundsPlayed * json.players[key].winPercentage
        }

        let average = dividend / weights

        json.players.push({player: 'Average', winPercentage: average})
        return json
    }

    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const fetchApiData = () => {
            fetch(`https://api.yogsstats.com/stats/ttt/detectiveWinPercentage?round=true&canon=${canon}&from=${from}&to=${to}`)
                .then((response) => response.json())
                .then((json) => setApiData(sort(addAverage(json))))
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
        // eslint-disable-next-line
    }, [metaData.isFetching, metaData.isLoading, from, to, canon])

    if (apiData.players === undefined) return

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.08)"
                }
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.08)"
                }
              }
        }
    }

    const data = {
        labels: apiData.players.map(x => x.player === 'Average' ? x.player : `${x.player} (${x.roundsPlayed})`),
        datasets: [
          {
            label: 'Detective win percentage',
            data: apiData.players.map(x => x.winPercentage),
            backgroundColor: apiData.players.map(x => x.player === 'Average' ? 'green' : 'rgba(255, 99, 132, 0.5)'),
          },
        ],
        borderWidth: 1
      }

    return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <FormControlLabel control={<Checkbox onChange={handleChangeCanon}/>} label='Only include canon rounds'/>
            </SetDate>
            <Bar options={options} data={data} height={"75%"} />
        </>
    )
}

export default DetectiveWinPercentage