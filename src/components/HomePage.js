import React, { useState, useEffect} from 'react'
import { Container , AppBar,Toolbar, IconButton, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios'
import { BASE_URL , IMAGE_BASE_URL, API_KEY } from '../static'
import MovieItem from './MovieItem'


const useStyles = makeStyles((theme) => ({
    header: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
        background: '#1c1d1e',
        color: '#e1c919'
    },
    main: {
        flexGrow: 1,
        marginTop: '20px',
        minHeight: '70vh'
    },
  }));

const HomePage = () => {
    const classes = useStyles();

    const [movies, setMovies] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
        return () => {
            console.log('done');
        }
    }, []);

    // get data from api endpoint
    const fetchData = () => {
        axios.get(`${BASE_URL}movie/popular`, {
            params: {
                api_key: API_KEY,
                page: pageNumber
            }
        })
        .then(res => {
            res.data.results.map(item => {
                item.image = `${IMAGE_BASE_URL}w780${item.poster_path}`
                console.log(item)
                return item
            })
            setMovies([...res.data.results])
            console.log(res.data.results)
        })
        .catch(error => console.log(error))
        
    }

    return (
        <React.Fragment>
            <header className={classes.header}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="home" href="/">
                            <HomeIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Best Movie List</Typography>
                    </Toolbar>
                </AppBar>
            </header>
            <Container maxWidth="md" className={classes.main}>
                {movies.map(item => <MovieItem key={item.id} movie={item} /> )}
            </Container>
        </React.Fragment>
    );
}
 
export default HomePage;