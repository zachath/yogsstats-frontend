import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import Layout from "../components/Layout";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
}));

const MainPage = () => {
    return (
        <Layout>
            <h1>Welcome to YogsStats, the home of Yogscast related TTT stats!</h1>
            <Stack spacing={4} alignItems={'center'} justifyContent={'center'} direction={'row'}>
                <Item>
                    <Typography>HERE GOES THE DESCRIPTION</Typography>
                </Item>
                {/*Make the accordion a component wichi takes a title & content*/}
                <Item>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            An accordion
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            Another accordion
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Item>
            </Stack>
        </Layout>
    )
}

export default MainPage