import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import SharePartyPresenter from '../../presenters/sharePartyPresenter';
import '../../index.css';
import useStyles from './style'
import SingleSelectChips from '../../components/singleSelectChips';
import { isNull } from 'lodash';
import ArrowBack from "@material-ui/icons/ArrowBack";
import useWindowDimensions from '../../utils/useWindowDimensions';

function SharePartyDialog(props) {
    const { onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} 
        disableBackdropClick={true} disableEscapeKeyDown={true}>
              <SharePartyPresenter/>     
      </Dialog>
    );
  }
  
  SharePartyDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

export default function CreatePartyView(props) {
  const classes = useStyles();
  const { medium, large } = useWindowDimensions();
  
    const options = [
      {label: 'Rock', value: 'rock'},
      {label: 'Jazz', value: 'jazz'},
      {label: 'Blues', value: 'blues'},
      {label: 'Latin', value: 'latin'},
      {label: 'Chill', value: 'chill'}
    ];
    const [mood, setMood] = React.useState('rock');
    const [open, setOpen] = React.useState(false);
    const [partyName, setPartyName] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Container className={classes.box} >
              <Button
                  size="large" className={classes.linkButton}
                  startIcon={<ArrowBack />}
                  onClick={() => { props.onGoBack()}}
                  > { (large || medium) ? "Back to my parties" : null}
                </Button>
            <Grid container justify="center" direction='column' className={classes.createpartypanel}>
                 
                <Grid item>    
                  <h1>Create a Party</h1>
                 
            <form className={classes.textfield} noValidate autoComplete="off">
              <TextField
                error={!validName(partyName)}
                helperText="Name has to be non-empty and up to 40 characters."
                className={classes.textline}
                id="outlined-error"
                label="Party name"
                onInput={e => { setPartyName(e.target.value) }}
                InputProps={{className: classes.input}}
              />
            </form>
            
                <div className={classes.grow}></div>
                    <div className={classes.title}>
                    <h5>
                Choose a mood
                    </h5>
                    <div className={classes.grow}></div>
              <SingleSelectChips
                value={mood}
                setValue={setMood}
                options={options}
              />
                </div>
                    <div className={classes.grow}></div>
                    <div className={classes.grow}></div>
                <div className={classes.centerbox}>
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          className={classes.button}
                          disabled={!validName(partyName) || !validMood(mood)}
                          onClick={() => {
                            props.onCreate({name: partyName, mood: mood});
                            handleClickOpen();
                          }}>
                            Create
                        </Button>
                        <SharePartyDialog open={open} onClose={handleClose} />
                </div>
                
              
        </Grid>
        </Grid>
            
    </Container>
    
    );
}

function validName(name) {
  return name !== '' && name.length < 40;
}

function validMood(mood) {
  return !isNull(mood);
}
