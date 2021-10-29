import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import useStyles from './style'
import '../../index.css';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import useWindowDimensions from '../../utils/useWindowDimensions';
import { Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import {StyledCardContent, DialogContentTextDark, DarkDialog} from '../../utils/customMaterialUI';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default function SearchResultsView(props) {
  const classes = useStyles();
  const [close, setClose] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { large } = useWindowDimensions();
  let songs = props.songs;
  
  if (!large && props.songs) {
    songs = props.songs.slice(0, 5); // for medium and small screens, take only the first 5 search results
  }
  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.backGround}>
      {close? null :
        <Grid container direction='row' spacing={1} className={classes.space}>
          <Button
            variant="outlined"
            size="small" className={classes.clearButton}
            startIcon={<CancelIcon />}
            onClick={() => { props.onClear(); setClose(true); }}>
              Clear
          </Button>
        { props.songsError ?
          <Typography align="center" className={classes.noResults} variant="body1">
            {props.songsError}
          </Typography> :
          songs.map((song) => {
              return (
              <Grid xs={12} item key={song.SpotifyTrack.id}>
                <Card className={classes.content}>
                <StyledCardContent>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item sm={2} xs={2}>
                      <img alt={song.SpotifyTrack.name} src={song.SpotifyTrack.pictUrl} width='50' height='100%'></img>
                    </Grid>
                    <Grid item sm={9} xs={9}>
                      <Typography className={classes.primaryText} variant="body1">
                          {song.SpotifyTrack.name}
                        </Typography>
                        <Typography className={classes.secondaryText} variant="body2">
                          {song.SpotifyTrack.artist}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <AddCircleIcon onClick={ ()=> {
                        try { props.onAdd(song); } catch(error) { setDialogOpen(true); }
                      }}/>
                    </Grid>
                  </Grid>                            
                </StyledCardContent>    
                </Card>
              </Grid>
              );})}
        </Grid>}
        <DarkDialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">Already added</DialogTitle>
          <DialogContent>
            <DialogContentTextDark id="alert-dialog-description">
              This song is already in your playlist.
            </DialogContentTextDark>
          </DialogContent>
          <DialogActions className={classes.JoinPartyDialog}>
            <Button autoFocus onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </DarkDialog>          
      </div>
  );
}
