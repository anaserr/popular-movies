import React, { useState, useEffect } from 'react'
import { Avatar, Grid, DialogActions, Dialog, DialogTitle,DialogContentText, DialogContent, Button} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { API_KEY, BASE_URL } from '../static';

const useStyles = makeStyles(theme => ({
    image: {
        width: 'auto',
        height: '60vh',
        marginRight: '10px'
    },
    item: {
        backgroundColor: '#1e1d1d',
        fontFamily: 'Verdana',
        margin: '10px 0',
        borderRadius: '5px',
        color: '#ffffff'
    },
    title: {
        fontSize: '40px'
    },
    date: {
        fontSize: '20px',
        color: 'grey',
        fontStyle: 'italic',
        margin: '-1px 0 10px'
    },
    icon: {
        color: '#eed522',
        fontSize: '40px',
        marginBottom: '-7px'
    },
    btn:{
        backgroundColor: '#e1c919',
        color: '',
        '&:hover': {
            color: '#e1c919',
        },
    },
    movieThumb: {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100%',
        width: '100%',
        position: 'relative',
    },
    movieThumbTitle: {
        position: 'absolute',    
        bottom: '3rem',
        left: '1.5rem',
        fontSize: '2.5rem',
        color: '#fff',
        margin: 0,
        maxHeight: '50%',
        overflow: 'hidden',
        textAlign: 'left',
        display: '-webkit-box',
        fontFamily: 'Verdana', 
        height: 'fit-content'
    },
    dialog: {
        background: '#1c1d1e',
        color: '#fff',
        fontFamily: 'Verdana', 
    },
    rate: {
        fontSize: '2rem',
        fontFamily: 'Verdana',
        position: 'absolute',
        right: '1rem'
    }
}));

const MovieItem = React.forwardRef(({movie}, ref) =>  {
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [id, setID] = useState(movie.id)
    const [movieObj, setMovieObj] = useState({})

    useEffect(() => {
        if(open && movieObj.id !== id){
                axios.get(`${BASE_URL}movie/${id}`, {
                params: {
                    api_key: API_KEY
                }
            })
            .then(res => {
                const obj = res.data;
                obj.adult = true
                setMovieObj(obj)
                console.log('receive')
            })
        }
        return () => {
            
        }
    }, [open])

    const showDialog = () => {
        const handleClose = () => {
            setOpen(false)
        }

        return (
            <Dialog
                open={open}
                maxWidth={"sm"}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.dialog}>{movieObj.title}</DialogTitle>
                <DialogContent id="alert-dialog-description" className={classes.dialog}>
                    <Grid container direction="row"  spacing={3} style={{height: '70vh'}}>
                        <Grid item  
                            className={classes.movieThumb}
                            style={{backgroundImage: `linear-gradient(0deg,rgba(0,0,0,0.85),rgba(0,0,0,0.45)), url(${movie.image})`}}>
                                <div className={classes.movieThumbTitle}>{movieObj.title}
                                    <span style={{fontSize: '0.8rem', color: 'grey'}}> {new Date(`${movie.release_date}`).getFullYear()}</span>
                                </div>
                                <div className={classes.rate}>
                                    {`${movie.vote_average}`}
                                    <StarIcon className={classes.icon}/>
                                </div>
                            </Grid>
                        <Grid item >
                            {
                                movieObj.genres && 
                                <div>
                                    <h5>Genres: </h5>
                                    <ul>{movieObj.genres.map(item => <li key={item.id}>{item.name}</li>)}</ul>
                                </div>
                            }
                            {movieObj.overview && <p ref={ref}> {movieObj.overview} </p>}
                            {movieObj.homepage && <Button className={classes.btn} href={movieObj.homepage} target="_blank">Home page</Button>}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.dialog}>
                <Button onClick={handleClose} style={{color: '#fff'}} autoFocus>
                    Exit
                </Button>
                </DialogActions>
          </Dialog>
        )
    }

    const clickHandler = (e) => {
        setID(movie.id)
        setOpen(true)
    }

    return(
        <Grid container spacing={5} className={classes.item} >
                <Grid item xs={12} sm={4}>
                    {movie.image ? <Avatar variant="rounded" src={movie.image} className={classes.image} /> :
                        <Avatar variant="rounded" className={classes.image}>
                            <ImageIcon />
                        </Avatar>
                    }
                </Grid>
                <Grid item  xs={12} sm={6} >
                    <div className={classes.title}>{movie.title}</div>
                    <div className={classes.date}>
                        {new Date(`${movie.release_date}`).getFullYear()}
                    </div>
                    <div style={{fontSize: '30px'}}>
                        {`${movie.vote_average}`}
                        <StarIcon className={classes.icon}/>
                    </div>
                    {movie.overview && <p ref={ref}> {movie.overview} </p>}
                    <Button className={classes.btn} onClick={clickHandler}>Show details</Button>
                </Grid>
                {showDialog()}
            </Grid>
    )
})
 
export default React.memo(MovieItem);