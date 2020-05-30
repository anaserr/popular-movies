import React, { useState, useEffect, useRef, useCallback} from 'react'
import { Container , AppBar,Toolbar, IconButton, Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios'
import { BASE_URL , IMAGE_BASE_URL, API_KEY } from '../static'
import MovieItem from './MovieItem'


const useStyles = makeStyles((theme) => ({
    header: {
      
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
        marginTop: '10px',
    },
  }));

const HomePage = () => {
    const classes = useStyles();

    const [movies, setMovies] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(true)
    const [hasNext, setHasNext] = useState(true)

    const observer = useRef()
    const lastElement = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasNext){
                console.log('visible')
                setPageNumber(prevPage => prevPage + 1 )
            }
        })
        if (node) observer.current.observe(node)
    }, [loading])

    useEffect(() => {
        setLoading(true)
        fetchData()
        return () => {
            console.log('done');
        }
    }, [pageNumber]);

    // get data from api endpoint
    const fetchData = () => {
        axios.get(`${BASE_URL}movie/popular`, {
            params: {
                api_key: API_KEY,
                page: pageNumber
            }
        })
        .then(res => {
            if(res.data && res.data.results){
                res.data.results.map(item => {
                    item.image = `${IMAGE_BASE_URL}w780${item.poster_path}`
                    return item
                })
                setMovies(prevMovies => {
                    return [...prevMovies, ...res.data.results]
                })
                if(res.data.total_pages > pageNumber){
                    setHasNext(true)
                }else {
                    setHasNext(false)
                }
                setLoading(false)
                console.log(res.data.results)
            }
            
        })
        .catch(error => console.log(error))
        
    }

    return (
        <div style={{backgroundColor: '#e1c919'}}>
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
                {movies.map((item, index) => {
                    return (movies.length === index + 1) ? 
                        <MovieItem key={item.id} movie={item} ref={lastElement}/> :
                        <MovieItem key={item.id} movie={item} />
                })}
                {loading && <Box justifyContent="center"><img src="https://media.giphy.com/media/y1ZBcOGOOtlpC/source.gif"/></Box>}
            </Container>
        </div>
    );
}
 
export default HomePage;