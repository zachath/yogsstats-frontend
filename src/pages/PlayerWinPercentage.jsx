import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

import Layout from "../components/Layout";
import SetDate from '../components/SetDateComponent'
import * as Utils from './js/util'
import TeamSelect from '../components/PlayerWinPercentagePage/TeamSelect'

const options = {
    title: 'Players win percentage as each team (Rounds played in parentheses)',
    vAxis: { title: 'Player win percentage', textStyle: { color: 'white' }, titleTextStyle: {color: 'white'}, viewWindow: { min: 0, max: 1}},
    hAxis: { title: 'Player', textStyle: { color: 'white' }, titleTextStyle: {color: 'white'}},
    seriesType: 'bars',
    series: {1: { type: 'line' }},
    titleTextStyle: {color: 'white'},
    legend: { textStyle: { color: 'white' } },
    backgroundColor: '#121212',
    annotations: {
        stem: {
            color: 'transparent',
            length: 120
        },
        textStyle: {
            color: '#9E9E9E',
            fontSize: 18
        }
    },
}

const PlayerWinPercentage = () => {
    const [data, setData] = useState([])
    const [teams, setTeams] = useState([])

    const [from, setFrom] = useState('2022-10-23')
    const handleChangeFrom = (e) => {
        setFrom(Utils.buildDate(e.$d))
    }
    const [to, setTo] = useState(Utils.buildDate(new Date()))
    const handleChangeTo = (e) => {
        setTo(Utils.buildDate(e.$d))
    }

    const [team, setTeam] = useState('innocents');
    const handleChangeTeam = (event) => {
        setTeam(event.target.value);
    };

    function jsonToTable(data) {
        let results = [['Player', 'Win percentage', 'Average (weighted)']]
        if (data.length === 0) {
            results[0].push({role: 'annotation', type: 'string'})
            results.push(['', 0, 0, 'No data'])
        }
    
        let weights = 0
        let dividend = 0

        for (let key in data) {
            let val = 0
            for (let k in data[key].teams) {
                if (data[key].teams[k].team === team) {
                    val = data[key].teams[k].winPercentage
                }
            }

            weights += data[key].roundsPlayed
            dividend += data[key].roundsPlayed * val
        }

        let average = dividend / weights

        for (let key in data) {
            let val = 0
            for (let k in data[key].teams) {
                if (data[key].teams[k].team === team) {
                    val = data[key].teams[k].winPercentage
                }
            }
            results.push([data[key].player+` (${data[key].roundsPlayed})`, val, average])
        }
    
        return results
    }

    const fetchTeams = () => {
        fetch('http://localhost:8080/stats/ttt/teams')
            .then((response) => response.json())
            .then((data) => {
                let teams = []
                for (let key in data.teams) {
                    let team = data.teams[key].team 
                    if (team !== 'none' && team !== 'bees') {
                        teams.push(team)
                    }
                }
                setTeams(teams)
                setTeam(teams[0])
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleFetch = () => {
        fetch('http://localhost:8080/stats/ttt/playerWinPercentage?round=true&from='+from+'&to='+to+'&team='+team)
            .then((response) => response.json())
            .then((data) => {
                setData(jsonToTable(data.players))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    useEffect(() => {
        handleFetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to, team])

    if (teams.length === 0) {
        fetchTeams()
        handleFetch()
        return
    }

    return (
        <Layout>
            <h1>Player win percentage</h1>
            <SetDate refresh={handleFetch} handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo}>
                <TeamSelect value={team} teams={teams} handleChangeTeam={handleChangeTeam}/>
            </SetDate>
            <Chart chartType='ComboChart' width={'100%'} height={'600px'} data={data} options={options}/>
        </Layout>
    )
}

export default PlayerWinPercentage