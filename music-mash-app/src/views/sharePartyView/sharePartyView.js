import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import '../../index.css';
import useStyles from './style'
import Typography from '@material-ui/core/Typography';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function SharePartyView(props) {
    const classes = useStyles();

    const copyId = () => {
        var idElement = document.getElementById("myID");
        navigator.clipboard.writeText(idElement.textContent.split(' ')[2]);    
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.box} >
            <Grid container direction="column" justify='center' alignItems='center' spacing={3}>
                <Grid item >
                <img
                    src={"https://64.media.tumblr.com/3b6707f870899fdd93c2851ea9851fbf/a9f4dccfa3657065-91/s2048x3072/28eac553960608b6ff3e4b5e15a132da0da2c1e6.png"}
                    className={classes.partyImage}
                    alt={'BackgroundImage'}></img>
                </Grid>
                <Grid item >
                <Typography component="h4" variant="h4" align="center">
                    You have created a party!
                </Typography>
                </Grid>
                <Grid item container direction='row' alignContent='center' alignItems='center' justify="center" spacing={2}>
                    <Grid item>
                        <h5 id="myID" className={classes.partyId}>
                        Party ID: {props.partyId}
                        </h5>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<FileCopyOutlinedIcon/>} variant="contained" color="primary" size="small" className={classes.smallButton} onClick={() => { copyId(); handleClickOpen();}}>Copy
                        </Button>
                    </Grid>
                </Grid>
                
                <Grid item >
                    <Typography component="h6" variant="h6" align="center">
                        Share the above party ID with friends so they can join your party!
                    </Typography>
                </Grid>
                <Grid item>
                <Button variant="contained" size="large" className={classes.button} onClick={() => {props.onGoToParty();}}>
                    Go to your party
                </Button>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogContent className={classes.alert}>
                    <DialogContentText id="alert-dialog-slide-description" >
                        <Typography color="textPrimary" component={'span'} variant="body1">You have copied the party ID to your clipboard!</Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>      
        </div>
    );
}


