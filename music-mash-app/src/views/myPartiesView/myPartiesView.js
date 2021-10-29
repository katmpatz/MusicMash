import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import musicMash from '../images/musicMash.png';
import { withStyles } from '@material-ui/core/styles';
import useStyles from './style';
import Drawer from '@material-ui/core/Drawer';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import {DangerTextButton, DialogContentTextDark, DarkDialog} from '../../utils/customMaterialUI';
import DialogContent from '@material-ui/core/DialogContent';
import '../../index.css';
import useWindowDimensions from '../../utils/useWindowDimensions';
import {CustomDeleteIcon} from '../../utils/customIcons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { isNull } from "lodash";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function JoinPartyDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog onClose={() => props.onClose()} aria-labelledby="customized-dialog-title" open={!isNull(props.error) && props.error !== 'Success'} >
        <DialogTitle id="customized-dialog-title" onClose={() => props.onClose()} className={classes.JoinPartyDialog} >
          Invalid party ID
        </DialogTitle>
        <DialogContent className={classes.JoinPartyDialog}>
        <Typography gutterBottom color='inherit'>
            {props.error}
          </Typography>
        </DialogContent>
          
        <DialogActions className={classes.JoinPartyDialog}>
          <Button autoFocus onClick={() => props.onClose()} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function MyPartiesView(props) {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const { small, medium, large} = useWindowDimensions();
  const [idToDelete, setIdToDelete] = React.useState('');
  const [openLogOut, setOpenLogOut] = React.useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleDrawerClose = () => {
    setState(false);
  };

  const handleClickOpenDelete = (id) => {
    setIdToDelete(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenLogOut = () => {
    setOpenLogOut(true);
  };

  const handleCloseLogOut = () => {
    setOpenLogOut(false);
  };

  return (
      <Container className={classes.root}>
        <Grid container justify="flex-start" alignItems="flex-start">

        <Grid item xs={8} className={classes.left}>
            <Grid container direction="row" justify="space-between" alignItems="center" className={classes.header}>
                <Grid item xs>
                  <h2 className={classes.title}>Your Parties </h2>
                </Grid>
                {small ?  
                <Grid item xs>
                  <Button onClick={toggleDrawer('right', true)} className={classes.createPartyDrawer}>Create/Join Party</Button>
                </Grid> : null}
                <Grid item>
                { (large || medium) ?
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<ExitToAppIcon />}
                  onClick={handleClickOpenLogOut}
                  > Log out
                </Button>
                :
                <Button
                  size="large" color='secondary'
                  endIcon={<ExitToAppIcon />}
                  onClick={handleClickOpenLogOut}
                  > Log out
                </Button>
                }
                <DarkDialog
                  open={openLogOut}
                  onClose={handleCloseLogOut}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Log out"}</DialogTitle>
                  <DialogContent>
                    <DialogContentTextDark id="alert-dialog-description">
                      Are you sure you want to log out?
                    </DialogContentTextDark>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseLogOut} className={classes.linkButton}>
                      Cancel
                    </Button>
                    <DangerTextButton onClick={() => props.logOut()} color="secondary" autoFocus>
                      Yes
                    </DangerTextButton>
                  </DialogActions>
                </DarkDialog>
                </Grid>
              </Grid>
            <Container className={classes.partyContainer}>
        
         <Grid container spacing={small? 0:1} className={classes.parties} justify='flex-start' alignItems='flex-start'>
                  {props.partyList.map((party) => (
                      <Grid item lg={4} key={party.id}>
                          <Card className={classes.card} > 
                              <CardActionArea onClick={()=>props.selectParty(party.id) }>
                              <CardMedia
                              className={classes.media}
                              image={party.image}
                              title="Party Cover"
                              />
                              </CardActionArea>
                        <CardContent>
                            <Grid container direction='column' spacing={0} justify='flex-start' alignItems='flex-start'>
                                <Grid item xs>
                                <h5 className={classes.cardTitle}>{party.name}</h5>
                                </Grid>
                                <Grid item xs>
                                <Typography variant="body2" component="p" className={classes.partyDate}>
                                            Created: {(new Date(party.date.seconds * 1000)).toDateString()}
                                </Typography>
                                </Grid>
                                
                              </Grid>
                              <Grid container direction='row' spacing={0} alignItems='flex-start' justify='flex-start'>
                              <Grid item xs>
                                <div></div>
                                </Grid>    
                              <Grid item xs={3}>
                                <CustomDeleteIcon fontSize='large' onClick={() => handleClickOpenDelete(party.id)} className={classes.Deleteicon} />
                                </Grid>
                              </Grid>
                                    <DarkDialog
                                      open={openDelete}
                                      onClose={handleCloseDelete}
                                      aria-labelledby="alert-dialog-title"
                                      aria-describedby="alert-dialog-description"
                                    >
                                    <DialogTitle id="alert-dialog-title">{"Delete party"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentTextDark id="alert-dialog-description">
                                        Are you sure you want to delete this party? 
                                      </DialogContentTextDark>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDelete} className={classes.linkButton}>
                                          Cancel
                                        </Button>
                                        <DangerTextButton onClick={() => { props.removeParty(idToDelete); handleCloseDelete(); }} color="secondary" autoFocus>
                                          Delete
                                        </DangerTextButton>
                                      </DialogActions>
                                    </DarkDialog>          
                          </CardContent>                          
                    
                      </Card>
                  </Grid>
                  ))}
              </Grid>
        </Container>
        </Grid>

        <Drawer anchor={'right'} open={small ? state: false} onClose={toggleDrawer('right', false)} >
            <Grid item className={classes.right}>
          <Container className={classes.createpartypanel}>
            <Grid container direction='row' justify='space-between'>
               <Grid item xs>
                 <KeyboardBackspaceIcon fontSize='large' className={ classes.backIcon} onClick={handleDrawerClose}/>
              </Grid>
            <Grid item xs>
              <img
                src={musicMash}
                alt={"musicMashLogo"}
                className={classes.logo} ></img>
            </Grid>
            </Grid>
            
        <Grid container direction='column' alignItems='center' justify='center' className={classes.margin}>
          <Grid item>
            <h2 className={classes.createPartyTitle}>Create a Party</h2>
          </Grid>
          <Grid item>
            <Button variant="contained" size="large" className={classes.button} onClick={() => { props.onCreate(); }}>Create</Button>
          </Grid>
          
        </Grid>

        <Grid container direction='column' alignItems='center' className={classes.margin}>
          <Grid item>
            <h2 className={classes.joinPartyTitle} >Join a Party</h2>
          </Grid>
          <Grid item>
            <form className={classes.textfield} noValidate autoComplete="off">
                <TextField id="standard-basic" className={classes.textfield} label="Put your party ID here" onInput={e => props.onText(e.target.value)} />
            </form>
                
              <h5 className={classes.text}>Click on the Join button to join the party</h5>
          </Grid>
              
          <Grid item>
            <Button variant="contained" size="large" className={classes.button} onClick={() => props.joinParty()}>
                  Join
            </Button>
          </Grid>
          
        </Grid>
        

        </Container>
        </Grid>
        </Drawer>
        {small ? null :
          <Grid item className={classes.right}>
            <Container className={classes.createpartypanel}>
              <Grid container direction='row' justify='space-between'>
                {/* <Grid item xs>
                  <KeyboardBackspaceIcon fontSize='large' className={classes.backIcon} onClick={handleDrawerClose} />
                </Grid> */}
                <Grid item xs>
                  <img
                    src={musicMash}
                    alt={"musicMashLogo"}
                    className={classes.logo} ></img>
                </Grid>
              </Grid>
            
              <Grid container direction='column' alignItems='center' justify='center' className={classes.margin}>
                <Grid item>
                  <h2 className={classes.createPartyTitle}>Create a Party</h2>
                </Grid>
                <Grid item>
                  <Button variant="contained" size="large" className={classes.button} onClick={() => { props.onCreate(); }}>Create</Button>
                </Grid>
          
              </Grid>

              <Grid container direction='column' alignItems='center' className={classes.margin}>
                <Grid item>
                  <h2 className={classes.joinPartyTitle} >Join a party</h2>
                </Grid>
                <Grid item>
                  <form className={classes.textfield} autoComplete="off" onSubmit={(e) => { e.preventDefault(); props.joinParty();}}>
                    <TextField size='medium' label="Put your party ID here" onInput={e => props.onText(e.target.value)} />
                    <h5 className={classes.text}>Click on the Join button to join in the party</h5>
                    <Button type="submit" variant="contained" size="large" className={classes.button} onClick={() => props.joinParty()}>
                    Join
                  </Button>
                  </form>
                
                  
                </Grid>
              
                <Grid item>
                  
                </Grid>
          
              </Grid>
        

            </Container>
          </Grid>}

      </Grid>
      
      <JoinPartyDialog error={props.error} onClose={() => props.onDialogClose()} />
      </Container>
    
  );
}
