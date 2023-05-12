import React from "react";
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container, Button } from '@material-ui/core'
import { PhotoCamera }  from '@material-ui/icons'

import { makeStyles } from "@material-ui/core";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6)
    },
    icon: {
        marginRight: '20px'
    }, 
    button: {
        marginTop: '40px'
    },
    cardGrid: {
        padding: '20px 0'
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardmedia: {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: '50px 0'
    }
}))

const App = () => {
    const classes = useStyles()
    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <PhotoCamera className="classes.icon"/>
                    <Typography variant="h6">
                        YogsStats
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <div className={classes.container}>
                    <Container maxWidth="sm">
                        <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
                            YogsStats
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            This is a longer paragraph This is a longer paragraph This is a longer paragraph This is a longer paragraph
                        </Typography>
                        <div className={classes.button}>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        See my ass
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        See my penis
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                    {cards.map((card) => (
                        <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardMedia className={classes.cardmedia} image="https://source.unsplash.com/random" title="Title"/>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5">
                                    Heading
                                </Typography>
                                <Typography>
                                    This is a media card to describe the content
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
                                    View
                                </Button>
                                <Button size="small" color="primary">
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    ))}
                    </Grid>
                </Container>
            </main>
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    This is a footer
                </Typography>
                <Typography variant="subtitle1" aligin="center" color="textSecondary">
                    Something else in the footer
                </Typography>
            </footer>
        </>
    )
}

export default App;