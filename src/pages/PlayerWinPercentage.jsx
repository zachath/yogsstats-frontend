import React, { useState, useEffect } from "react";

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import TeamSelect from '../components/PlayerWinPercentagePage/TeamSelect'
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

const PlayerWinPercentage = () => {
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
    const [team, setTeam] = useState(null);
    const [teams, setTeams] = useState([])
    const handleChangeTeam = (event) => {
        setTeam(event.target.value);
    };

    function sort(json) {
        json.players.sort((a, b) => {
            if (a.teams[0].winPercentage === b.teams[0].winPercentage) {
                return a.roundsPlayed - b.roundsPlayed
            } else {
                return a.teams[0].winPercentage - b.teams[0].winPercentage
            }
        })
        return json
    }
    
    function addAverage(json) {
        let weights = 0
        let dividend = 0
    
        for (let key in json.players) {
            weights += json.players[key].roundsPlayed
            dividend += json.players[key].roundsPlayed * json.players[key].teams[0].winPercentage
        }
    
        let average = dividend / weights
    
        json.players.push({player: 'Average', teams: [{winPercentage: average}]})
        return json
    }

    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const fetchApiData = () => {
            fetch(`https://api.yogsstats.com/stats/ttt/playerWinPercentage?round=true&from=${from}&to=${to}&team=${team}`)
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

        if (!teamData.isFetching && !teamData.isLoading && team === null) {
            let teams = []
            for (let key in teamData.data.teams) {
                let team = teamData.data.teams[key].team 
                if (team !== 'none') {
                    teams.push(team)
                }
            }
            setTeams(teams)
            setTeam(teams[0])
        }

        if (from && to && team) {
            fetchApiData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, teamData.isFetching, teamData.isLoading, from, to, team])

    if (apiData.players === undefined) return

    const data = {
        labels: apiData.players.map(x => x.player === 'Average' ? x.player : `${x.player} (${x.roundsPlayed})`),
        datasets: [
          {
            label: 'Player win percentage',
            data: apiData.players.map(x => x.teams[0].winPercentage*100),
            backgroundColor: apiData.players.map(x => x.player === 'Average' ? 'green' : 'rgba(255, 99, 132, 0.5)'),
          },
        ],
        borderWidth: 1
    }

    return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <TeamSelect value={team} teams={teams} handleChangeTeam={handleChangeTeam}/>
            </SetDate>
            <Bar options={Utils.barOptions} data={data} height={"75%"} />
        </>
    )
}

export default PlayerWinPercentage