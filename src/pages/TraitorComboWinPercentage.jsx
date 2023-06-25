import React, { useState, useEffect } from "react";

import SetDate from '../components/SetDateComponent'
import PlayerSelect from "../components/TraitorComboWinPage/PlayerSelect";
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

const TraitorComboWinPercentage = () => {
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

    function sort(json) {
        json.combos[0].entries.sort((a, b) => {
            if (a.winPercentage === b.winPercentage) {
                return a.roundsPlayed - b.roundsPlayed
            } else {
                return a.winPercentage - b.winPercentage
            }
        })
        return json
    }

    const playersData = useQuery('playerQuery', Utils.getPlayers)
    const [player, setPlayer] = useState('');
    const [players, setPlayers] = useState([])
    const handleChangePlayer = (event) => {
        setPlayer(event.target.value);
    };

    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const fetchApiData = () => {
            fetch(`https://api.yogsstats.com/stats/ttt/traitorCombos?round=true&from=${from}&to=${to}&player=${player}`)
                .then((response) => response.json())
                .then((json) => setApiData(sort(json)))
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

        if (!playersData.isFetching && !playersData.isLoading && player === '') {
            let players = playersData.data.players
            setPlayers(players)
            setPlayer(players[0])
        }

        if (from && to && player) {
            fetchApiData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, playersData.isFetching, playersData.isLoading, from, to, player])

    if (apiData.combos === undefined) return

    const data = {
        labels: apiData.combos[0].entries.map(x => `${x.player} (${x.roundsTogether})`),
        datasets: [
          {
            label: 'Traitor win percentage',
            data: apiData.combos[0].entries.map(x => x.winPercentage*100),
            backgroundColor: apiData.combos[0].entries.map(x => 'rgba(255, 99, 132, 0.5)'),
          },
        ],
        borderWidth: 1
    }

    return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <PlayerSelect value={player} players={players} handleChangePlayer={handleChangePlayer}/>
            </SetDate>
            <Bar options={Utils.barOptions} data={data} height={"75%"} />
        </>
    )
}

export default TraitorComboWinPercentage