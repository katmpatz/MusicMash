import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';


export const StyledCardContent = withStyles({
    root: {
      padding: 0,
      "&:last-child": {
        paddingBottom: 0,
      }
    },
  })(CardContent);
  
  export const DangerTextButton = withStyles({
    label: {
      fontWeight: 600,
    },
  })(Button);
  
  export const DarkDialog = withStyles({
    paper: {
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #121212',
      boxSshadow: '0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
      color:'white',
    },
  })(Dialog);
  
  
  export const DialogContentTextDark = withStyles({
    root: {
      color:'rgba(255, 255, 255, 0.6)',
    },
  })(DialogContentText);