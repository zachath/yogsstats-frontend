import React, { useState, useEffect } from "react";

import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import RoleSelect from '../components/RoleWinPercentage/RoleSelect'
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

    const roleData = useQuery('roleQuery', Utils.getRoles)
    const [roles, setRoles] = useState([])
    const [role, setRole] = useState(null);
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    function sort(json) {
        json.players.sort((a, b) => {
            if (a.roles[0].winPercentage === b.roles[0].winPercentage) {
                return a.roundsPlayed - b.roundsPlayed
            } else {
                return a.roles[0].winPercentage - b.roles[0].winPercentage
            }
        })
        return json
    }
    
    function addAverage(json) {
        let weights = 0
        let dividend = 0
    
        for (let key in json.players) {
            weights += json.players[key].roundsPlayed
            dividend += json.players[key].roundsPlayed * json.players[key].roles[0].winPercentage
        }
    
        let average = dividend / weights
    
        json.players.push({player: 'Average', roles: [{winPercentage: average}]})
        return json
    }

    const [apiData, setApiData] = useState([])
    useEffect(() => {
        const fetchApiData = () => {
            fetch(`https://api.yogsstats.com/stats/ttt/roleWinPercentage?round=true&from=${from}&to=${to}&role=${role}`)
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

        if (!roleData.isFetching && !roleData.isLoading && role === null) {
            let roles = roleData.data.roles
            setRoles(roles)
            setRole(roles[0])
        }

        if (from && to && role) {
            fetchApiData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, roleData.isFetching, roleData.isLoading, from, to, role])

    if (apiData.players === undefined) return

    const data = {
        labels: apiData.players.map(x => x.player === 'Average' ? x.player : `${x.player} (${x.roundsPlayed})`),
        datasets: [
          {
            label: 'Role win percentage',
            data: apiData.players.map(x => x.roles[0].winPercentage*100),
            backgroundColor: apiData.players.map(x => x.player === 'Average' ? 'green' : 'rgba(255, 99, 132, 0.5)'),
          },
        ],
        borderWidth: 1
    }

    return (
        <>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <RoleSelect value={role} roles={roles} handleChangeRole={handleChangeRole}/>
            </SetDate>
            <Bar options={Utils.barOptions} data={data} height={"75%"} />
        </>
    )
}

export default PlayerWinPercentage