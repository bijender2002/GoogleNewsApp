import React from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import Typhography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(12)
    },
}));

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const heading = "Welcome to Google News";
const text = "Google News is a personalised news aggregator that organises and highlights what's happening in the world.";

function Title() {

    const classes = useStyles();

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Typhography variant="h5" gutterBottom align="center" color="primary" className={classes.title}>
                    {heading}
                </Typhography>
                <Typhography variant="h6" align="center" gutterBottom color="secondary">
                    <marquee width="80%" direction="left">
                        {text}
                    </marquee>
                </Typhography>
                <hr></hr>
            </ThemeProvider>
        </div>
    );
}

export default Title;