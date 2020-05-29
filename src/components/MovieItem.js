import React from 'react'
import { ListItem , ListItemAvatar,ListItemText, Avatar, Typography} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    image: {
        width: '25vh',
        height: '20vw',
        marginRight: '10px'
    },
}));

function MovieItem({movie}) {
    const classes = useStyles();
    return(
        <ListItem alignItems="flex-start" >
            <ListItemAvatar>
                {movie.image ? <Avatar variant="rounded" src={movie.image} className={classes.image} /> :
                    <Avatar variant="rounded" className={classes.image}>
                        <ImageIcon />
                    </Avatar>
                }
            </ListItemAvatar>
            <ListItemText
                primary={
                    <div>
                        <Typography 
                            component="h5"
                            variant="h5"
                            color="textPrimary"
                        >
                            {movie.title}
                        </Typography>
                        <Typography
                            component="span"
                            variant="h6"
                            color="textPrimary"
                        >
                            {`Date de sortie : ${new Date(`${movie.release_date}`).getFullYear()}`}
                            
                        </Typography>
                    </div>
                }
            />
        </ListItem>
    )
}
 
export default MovieItem;