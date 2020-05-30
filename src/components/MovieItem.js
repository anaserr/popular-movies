import React from 'react'
import { ListItem , ListItemAvatar,ListItemText, Avatar, Typography, Grid} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

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
    }
}));

const MovieItem = React.forwardRef(({movie}, ref) =>  {
    const classes = useStyles();
    return(
        <Grid container spacing={4} className={classes.item}>
                <Grid item xs={12} sm={4}>
                    {movie.image ? <Avatar variant="rounded" src={movie.image} className={classes.image} /> :
                        <Avatar variant="rounded" className={classes.image}>
                            <ImageIcon />
                        </Avatar>
                    }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <div className={classes.title}>{movie.title}</div>
                    <div className={classes.date}>
                        {new Date(`${movie.release_date}`).getFullYear()}
                    </div>
                    <div ref={ref} style={{fontSize: '30px'}}>
                        {`${movie.vote_average}`}
                        <StarIcon style={{color: '#eed522', fontSize: '40px', marginBottom: '-7px'}} />
                    </div>
                    {movie.overview && <p> {movie.overview} </p>}
                </Grid>
            </Grid>
            
    
    )
})
 
export default React.memo(MovieItem);