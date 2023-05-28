import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

import SetDate from '../components/SetDateComponent'
import PlayerSelect from "../components/TraitorComboWinPage/PlayerSelect";
import * as Utils from '../js/util'
import { CardMedia, Typography } from "@mui/material";
import { useQuery } from "react-query";

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

    const playersData = useQuery('playerQuery', Utils.getPlayers)
    const [player, setPlayer] = useState('');
    const [players, setPlayers] = useState([])
    const handleChangePlayer = (event) => {
        setPlayer(event.target.value);
    };

    const getWorstAndBestCombos = (data) => {
        let combos = data[0].entries
        combos.sort((a, b) =>  b.winPercentage - a.winPercentage)
        return [combos[0], combos[combos.length-1]]
    }

    const [data, setData] = useState(null)
    const fetchData = () => {
        fetch(`http://localhost:8080/stats/ttt/traitorCombos?round=true&from=${from}&to=${to}&player=${player}`)
            .then((response) => response.json())
            .then((data) => setData(data))
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

        if (!playersData.isFetching && !playersData.isLoading && player === '') {
            let players = playersData.data.players
            setPlayers(players)
            setPlayer(players[0])
        }

        if (from !== null && to !== null && player !== '') {
            fetchData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [metaData.isFetching, metaData.isLoading, from, to, player])

    if (metaData.isFetching || metaData.isLoading) return

    if (from === null || to === null || player === '') return

    if (data === null) return <h1>No data</h1>

    let [b, w] = getWorstAndBestCombos(data.combos)
    
    if (b === undefined || w === undefined) return (
        <Layout>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <PlayerSelect value={player} players={players} handleChangePlayer={handleChangePlayer}/>
            </SetDate>
            <h1>No data available in specified range</h1>
        </Layout>
    )

    return (
        <Layout>
            <h1>Traitor combo win percentage</h1>
            <SetDate handleChangeFrom={handleChangeFrom} handleChangeTo={handleChangeTo} from={from} minDate={minDate} to={to} maxDate={maxDate}>
                <PlayerSelect value={player} players={players} handleChangePlayer={handleChangePlayer}/>
            </SetDate>
            <Grid justifyContent="center" container spacing={4}>
                <Grid item>
                    <Typography>Worst</Typography>
                    <Card>
                        <CardMedia component={'img'} image={require(`../components/images/players/${w.player}.jpg`)} height={200}/>
                        <CardContent>
                            <Typography>{w.player}</Typography>
                            <Typography>{(w.winPercentage*100).toFixed(1)}%</Typography>
                            <Typography>{w.roundsTogether} round(s)</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card>
                        <CardMedia component={'img'} image={require(`../components/images/players/${player}.jpg`)} height={300}/>
                        <CardContent>
                            <Typography>{player}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Typography>Best</Typography>
                    <Card>
                        <CardMedia component={'img'} image={require(`../components/images/players/${b.player}.jpg`)} height={200}/>
                        <CardContent>
                            <Typography>{b.player}</Typography>
                            <Typography>{(b.winPercentage*100).toFixed(1)}%</Typography>
                            <Typography>{b.roundsTogether} round(s)</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default TraitorComboWinPercentage