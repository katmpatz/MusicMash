import React from 'react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import ArrowBack from "@material-ui/icons/ArrowBack";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import SpotifyPlayer from 'react-spotify-web-playback';
import SearchPresenter from '../../presenters/searchPresenter';
import useWindowDimensions from '../../utils/useWindowDimensions';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {StyledCardContent, DangerTextButton, DialogContentTextDark, DarkDialog} from '../../utils/customMaterialUI';
import {CustomFavoriteBorder, CustomPlayArrowIcon, ActivePauseIcon, CustomDeleteIcon} from '../../utils/customIcons';
import Copyright from '../../components/copyright';
import useStyles from './partyViewStyle';


export default function PartyView(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openLeave, setOpenLeave] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [songToDelete, setSongToDelete] = React.useState({id: null, name: null, artist: null});
  const { small, medium, large} = useWindowDimensions();
  const [notPremiumDialog, setNotPremiumDialog] = React.useState(false);

  const handleOpenPremiumDialog = () => {
    setNotPremiumDialog(true);
  };

  const handleClosePremiumDialog = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotPremiumDialog(false);
  };

  const handleClickOpenLeave = () => {
    setOpenLeave(true);
  };
  const handleCloseLeave = () => {
    setOpenLeave(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDelete = (song) => {
    setSongToDelete(song);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  return (
       <main className={classes.continer}>
        <Container>
            <Grid container direction="row" justify="space-between" alignItems="center" className={classes.header}>
              <Grid item>
                <Button
                  size="large" className={classes.linkButton}
                  startIcon={<ArrowBack />}
                  onClick={() => { props.onMyParties(); }}
                  >{ (large || medium) ? "Back to my parties" : null}
                </Button>
              </Grid>
              <Grid item>
                { (large || medium) ?
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  endIcon={<ExitToAppIcon />}
                  onClick={handleClickOpenLeave}
                  > Leave the party
                </Button>
                :
                <IconButton color="secondary" aria-label="Leave the party" onClick={handleClickOpenLeave}>
                  <ExitToAppIcon />
                </IconButton>
                }
                <DarkDialog
                  open={openLeave}
                  onClose={handleCloseLeave}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <DialogTitle id="alert-dialog-title">{"Leave party"}</DialogTitle>
                  <DialogContent>
                    <DialogContentTextDark id="alert-dialog-description">
                      If you leave this party, it will be deleted from your Parties list.
                      Are you sure that you want to leave?
                    </DialogContentTextDark>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseLeave} className={classes.linkButton}>
                      No
                    </Button>
                    <DangerTextButton onClick={props.onLeave} color="secondary" autoFocus>
                      Yes, I want to leave!
                    </DangerTextButton>
                  </DialogActions>
                </DarkDialog>
              </Grid>
            </Grid>
            <Grid container spacing={small?1:3} alignItems="center" alignContent="center" justify="center">
              <Grid item xs={12}>
                <Typography component="h1" variant="h1" align="center">
                    {props.party.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    Party ID: <span style={{color:"rgba(255, 255, 255, 0.6)"}}>{props.party.id}</span>
                    {/* <IconButton aria-label="copy" color="primary">
                      <FileCopyOutlinedIcon />
                    </IconButton> */}
                </Typography>
              </Grid>
              <Grid container direction="row" alignItems="center" alignContent="center" justify="center" spacing={1}>
                <Grid item>
                  <Typography variant="h6" align="center">
                      Collaborators: 
                  </Typography>
                </Grid>
                <Grid item>
                  <AvatarGroup max={4} justify='center'>
                      {props.users.map(user => (
                        <Avatar key={user.name} alt={user.name} className={classes.avatar} size="small" onClick={handleClickOpen}>
                          {user.name[0]}
                          </Avatar>
                      ))}
                    </AvatarGroup>
                  <DarkDialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.userlist} >
                    <DialogTitle id="simple-dialog-title">Collaborators</DialogTitle>
                    <List>
                      {props.users.map((user) => (
                        <ListItem key={user.id}>
                          <ListItemAvatar>
                          <Avatar alt={user.name} className={classes.user}>
                          {user.name[0]}
                          </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={user.name} />
                        </ListItem>
                      ))}
                    </List>
                  </DarkDialog>
                </Grid>

              </Grid>
            </Grid>
        {/* Playlist and Add songs */}
        <Grid container direction={large ? 'row' : 'column-reverse'} justify="space-between" alignItems={large ? "flex-start" : 'center'} className={classes.space}>
          <Grid item md={8} xs={12} container direction='row' spacing={small?0:2} className={!large ? classes.space : null}>
            <Grid xs={12} item className={small ?classes.gap : null}>
              <Typography component="h3" variant="h3">
                Playlist              
              </Typography>
            </Grid>
            <Grid xs={12} item container direction='row' spacing={small?0:2}>
            {props.songlist.map((song, index) => (
                  <Grid xs={12} item key={index} className={small ?classes.gap : null}>
                    <Card className={classes.content}>
                        <StyledCardContent>
                          <Grid container alignItems="center">
                            <Grid item sm={2} xs={3}>
                              <img alt={song.SpotifyTrack.name} src={song.SpotifyTrack.pictUrl} width={small?'60':'100'} height='100%' className={classes.songCover}></img>
                            </Grid>
                            <Grid item sm={6} xs={5}>
                              <Typography component="h6" variant="h6">
                                  {song.SpotifyTrack.name}
                                </Typography>
                                <Typography className={classes.secondaryText} variant="subtitle1">
                                  {song.SpotifyTrack.artist}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} container direction="row" justify="space-between">
                              <Grid item xs={4}>     
                              {!props.premium ?
                                  <IconButton aria-label="play/pause" onClick={handleOpenPremiumDialog}>
                                    <CustomPlayArrowIcon fontSize={small ? 'small' : 'large'} />
                                  </IconButton> :
                                  props.isPlaying && song.SpotifyTrack.id === props.playingSong.SpotifyTrack.id
                                    ? <IconButton aria-label="play/pause" onClick={() => {
                                        props.playSong(false);
                                      }}>
                                          <ActivePauseIcon fontSize={small ? 'small' : 'large'} />
                                      </IconButton>
                                    :<IconButton aria-label="play/pause" onClick={() => {
                                        props.chooseSong(index, song);
                                        props.playSong(true);
                                      }}>
                                        <CustomPlayArrowIcon fontSize={small ? 'small':'large'} />
                                      </IconButton>}
                                <Snackbar
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                    open={notPremiumDialog}
                                    autoHideDuration={6000}
                                    
                                  > 
                                  <Alert severity="error" onClose={handleClosePremiumDialog}>
                                      To play the songs, you need to have Spotify Premium!
                                  </Alert>
                                </Snackbar>
                              </Grid>
                              <Grid item xs={4}>
                                      <IconButton aria-label="add to favorites" onClick={()=>props.likeToggle(song.SpotifyTrack.id)}> 
                                        {props.isLikedByTheUser(song)
                                          ?
                                          <FavoriteIcon color="primary" fontSize={small ? 'small':'large'}/>
                                          : 
                                          <CustomFavoriteBorder fontSize={small ? 'small':'large'} />
                                        }<span className={classes.number}>&nbsp;{(song.likes || []).length === 0 ? null : (song.likes||[]).length}</span>
                                      </IconButton>
                                      
                                  </Grid>
                              <Grid item xs={4}>
                                    <IconButton aria-label="delete songs" onClick={() => handleClickOpenDelete({id: song.SpotifyTrack.id, name: song.SpotifyTrack.name, artist: song.SpotifyTrack.artist})}>
                                      <CustomDeleteIcon fontSize={small ? 'small':'large'}/>
                                    </IconButton>  
                              </Grid>
                            </Grid>
                          </Grid>                            
                       </StyledCardContent>    
                    </Card>
                    </Grid>))}
                </Grid>
                <DarkDialog
                      open={openDelete}
                      onClose={handleCloseDelete}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description">
                      <DialogTitle id="alert-dialog-title">{"Delete song"}</DialogTitle>
                      <DialogContent>
                        <DialogContentTextDark id="alert-dialog-description">
                          Are you sure you want to delete {songToDelete.name} by {songToDelete.artist}? 
                        </DialogContentTextDark>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseDelete} className={classes.linkButton}>
                          Cancel
                        </Button>
                        <DangerTextButton onClick={() => { handleCloseDelete(); props.removeSong(songToDelete.id);}} color="secondary" autoFocus>
                          Delete
                        </DangerTextButton>
                      </DialogActions>
                    </DarkDialog> 
          </Grid>
                      <Grid item md={4} xs={12} container direction='row' spacing={small?0:2}>
                      <Grid item xs={12}>
                        <Typography component="h3" variant="h3">
                          Add songs           
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <SearchPresenter />
                      </Grid>
                    </Grid>
          </Grid>  
          <Box pt={4} className={classes.copyright}>
            <Copyright />
          </Box>
          </Container> 
            {props.premium &&
            <div className={classes.player}>
            <SpotifyPlayer
                    autoPlay={true}
                    token={props.token}
                    uris={props.uris}
                    play={props.isPlaying}
                    callback={state => {                        
                        props.findSongById(state.track.id);
                      }}
                    offset = {props.playingSongNumber}
                    styles={{
                      activeColor: '#fff',
                      bgColor: '#2C2C2C',
                      color: '#fff',
                      loaderColor: '#fff',
                      sliderColor: '#BB86FC',
                      trackArtistColor: '#ccc',
                      trackNameColor: '#fff',
                      sliderHandleColor: '#DBB2FF',
                    }}
                />
              </div>
          }
      </main>
  );
} 