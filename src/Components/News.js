import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import { Button, Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({

    media: {
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    maincontainer: {
        width: "100vw",
        backgroundColor: theme.palette.grey[200],
        paddingTop: theme.spacing(5)
    },
    equal:{
        // height: "100%",
        width:"100%"
    }
}));

function News(props) {

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [specificName, setSpecificname] = React.useState([])

    const handleExpandClick = (name) => {
        setExpanded(!expanded);

        if (specificName.includes(name)) {
            var nameIndex = specificName.indexOf(name);
            specificName.splice(nameIndex, 1);
            
        }
        else {
            setSpecificname((st) => ([...st, name]))
        }
    };

    const [news, setNews] = useState([])
    const [activeMobile, setactiveMobile] = useState(false)

    React.useEffect(() => {
        axios.get('http://newsapi.org/v2/everything?q=tesla&from=2020-12-30&sortBy=publishedAt&apiKey=1419196c797f480d893789330129a6d9')
            .then(res => {
                const Newsdata = res.data
                setNews(Newsdata)
                console.log(Newsdata)

            })
            .catch(err => {
                console.log(err);
            })


        window.addEventListener('resize', () => {
            if (window.innerWidth <= 600) {
                setactiveMobile(true);
            } else {
                setactiveMobile(false)
            }
        })

    }, []);


    return (
        
        <>
        
            <Container className={classes.maincontainer}>

                {activeMobile ?

                    <Grid container spacing={3} wrap="nowrap"
                        alignItems="stretch" 
                        justify="center"
                    >
                        <Grid xs={12}>

                            {news.articles && news.articles.map(d => (
                                
                                <Card key={d.source.name}>
                                
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                B
                                            </Avatar>
                                        }

                                        title={d.source.name}
                                        subheader={d.publishedAt}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={d.urlToImage}
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body1" component="b">
                                            {d.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button variant="outlined" size="small">
                                            <a href={d.url} style={{ textDecoration: "none" }}>Read More</a>
                                        </Button>

                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={() => handleExpandClick(d.source.name)}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={specificName.includes(d.source.name) ? true : false} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>{d.author}</Typography>
                                            <Typography paragraph>
                                                {d.content}
                                            </Typography>
                                            <Typography paragraph>
                                                {d.description}
                                            </Typography>

                                        </CardContent>
                                    </Collapse>
                                </Card>
                            ))}
                        </Grid>
                    </Grid>

                    : null}

                {!activeMobile &&

                    <Grid container spacing={5}
                        alignItems="stretch"
                        justify="center"
                    >
                        {news.articles && news.articles.map(d => (

                            <Grid item xs={3}>
                                <Card key={d.source.name} className={classes.equal}>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                B
                                            </Avatar>
                                        }

                                        title={d.source.name}
                                        subheader={d.publishedAt}
                                    />
                                    <CardMedia
                                        className={classes.media}
                                        image={d.urlToImage}
                                        title="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body1" component="b">
                                            {d.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button variant="outlined" size="small">
                                            <a href={d.url} style={{ textDecoration: "none" }}>Read More</a>
                                        </Button>

                                        <IconButton
                                            className={clsx(classes.expand, {
                                                [classes.expandOpen]: expanded,
                                            })}
                                            onClick={() => handleExpandClick(d.source.name)}
                                            aria-expanded={expanded}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    </CardActions>
                                    <Collapse in={specificName.includes(d.source.name) ? true : false} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>{d.author}</Typography>
                                            <Typography paragraph>
                                                {d.content}
                                            </Typography>
                                            <Typography paragraph>
                                                {d.description}
                                            </Typography>

                                        </CardContent>
                                    </Collapse>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>}
            </Container>
        </>
    )
}
export default News;
