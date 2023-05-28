import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

import Layout from "../components/Layout";
import SetDate from '../components/SetDateComponent'
import * as Utils from '../js/util'
import RoleSelect from '../components/RoleWinPercentage/RoleSelect'
import { useQuery } from "react-query";

const options = {
    title: 'Players win percentage as each role (Rounds played in parentheses)',
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
    const [role, setRole] = useState('');
    const handleChangeRole = (event) => {
        setRole(event.target.value);
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
            for (let k in data[key].roles) {
                if (data[key].roles[k].role === role) {
                    val = data[key].roles[k].winPercentage
                }
            }

            weights += data[key].roundsPlayed
            dividend += data[key].roundsPlayed * val
        }

        let average = dividend / weights

        for (let key in data) {
            let val = 0
            for (let k in data[key].roles) {
                if (data[key].roles[k].role === role) {
                    val = data[key].roles[k].winPercentage
                }
            }
            results.push([data[key].player+` (${data[key].roundsPlayed})`, val, average])
        }
    
        return results
    }

    const [data, setData] = useState([])
    const fetchData = () => {
        fetch(`http://localhost:8080/stats/ttt/roleWinPercentage?round=true&from=${from}&to=${to}&role=${role}`)
            .then((response) => response.json())
            .then((data) => {
                setData(jsonToTable(data.players))
            })
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

        if (!roleData.isFetching && !roleData.isLoading && role === '') {
            let roles = roleData.data.roles
            setRoles(roles)
            setRole(roles[0])
        }

        if (from !== null && to !== null && role !== '') {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, from, to, role])

    if (metaData.isFetching || metaData.isLoading) return

    if (from === null || to === null || role === '') return

    if (data === null) return <h1>No data</h1>

    return (
        <Layout>
            <h1>Role win percentage</h1>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <RoleSelect value={role} roles={roles} handleChangeRole={handleChangeRole}/>
            </SetDate>
            <Chart chartType='ComboChart' width={'100%'} height={'600px'} data={data} options={options}/>
        </Layout>
    )
}

export default PlayerWinPercentage