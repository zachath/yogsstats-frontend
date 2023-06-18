import React, { useState } from "react";
import { Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Link from '@mui/material/Link';

const EmptySpace = () => {
    return (
        <Typography>&nbsp;</Typography>
    )
}

const MainPage = () => {
    const [roundCount, setRoundCount] = useState(0)
    const [oldestDate, setOldestDate] = useState(null)
    const [newestDate, setNewestDate] = useState(null)

    const handleFetch = () => {
        fetch('https://api.yogsstats.com/stats/ttt/meta')
            .then((response) => response.json())
            .then((data) => {
                setRoundCount(data.roundCount)
                setOldestDate(data.oldestRound.date)
                setNewestDate(data.newestRound.date)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    if (roundCount === 0) {
        handleFetch()
        return
    }

    return (
        <>
            <h1>Welcome to YogsStats, the home of Yogscast related TTT stats!</h1>
            <Grid container justifyContent="center" spacing={10}>
                <Grid item xs={6}>
                    <Typography>
                        This site tracks stats stats related to the <Link href="https://www.youtube.com/@yogscast">Yogscast</Link> TTT series on YouTube.
                        They are dynamically updated after each video is uploaded. In every tab you see to the left there are stats such as detective win percentage 
                        and the amount of jesters killed by each player and on the right you can find a description of each. A commonality between them all is the
                        possibility to time splice the data by setting the from and to date, use it if you want to only include rounds from a specific year, month,
                        week or even day.
                    </Typography>
                    <EmptySpace />
                    <Typography>
                        They don't take the game seriously so obviously neither should these stats.
                    </Typography>
                    <EmptySpace />
                    <Typography>
                        Currently there are <strong>{roundCount}</strong> rounds stored, the oldest of which is from <strong>{oldestDate}</strong> and the latest from <strong>{newestDate}</strong>
                    </Typography>
                    <EmptySpace />
                    <Typography>
                        Inspired by the work of <Link href="https://www.reddit.com/user/TheImminentFate">u/TheImminentFate</Link> and <Link href="https://www.reddit.com/user/Poissonza">u/Poissonza</Link> on Reddit.
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Wins by Team
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                A pie chart displaying the number of wins and win percentage of each team.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Detective win %
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Displays a bar graph of the win percentage as detective for each player.
                                On the horizontal axis you'll find the players and on the vertical axis their win percentage.
                                The weighted average win percentage is displayed as a line drawn horizontally through the graph.
                                Has the extra option to only include <strong>"canon"</strong> rounds.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Player win %
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Displays a bar graph of the win percentage for each team for each player.
                                On the horizontal axis you'll find the players and on the vertical axis their win percentage.
                                The weighted average win percentage is displayed as a line drawn horizontally through the graph.
                                To pick what team to display, use the select menu.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Traitor combo win %
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Displays the win percentage for traitor combinations, or "buddies", the current player is placed in the middle with their worst & best traitor buddies to the left & right of them respectively.
                                To change the current player, use the select menu.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Role Win %
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Displays a bar graph of the win percentage for each role for each player.
                                On the horizontal axis you'll find the players and on the vertical axis their win percentage.
                                The weighted average win percentage is displayed as a line drawn horizontally through the graph.
                                To pick what role to display, use the select menu.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Jester kills by player
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                A pie chart displaying the number of jester kills by each player.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            API
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                This frontend send requests to the API available for everyone at <Link>https://api.yogsstats.com/stats/ttt</Link>, for api documentation see the readme on <Link href="https://github.com/zachath/yogsstats">Github</Link>.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </>
    )
}

export default MainPage