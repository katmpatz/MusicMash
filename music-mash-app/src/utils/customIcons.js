import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from '@material-ui/icons/Pause';
import {withStyles} from '@material-ui/core/styles';

export const CustomFavoriteBorder= withStyles({
    root: {
      boxShadow: 'none',
      color: 'inherit',
      borderColor: 'inherit',
    
      '&:hover': {
        cursor: 'pointer',
        color: '#BB86FC',
        borderColor: '#BB86FC',
        boxShadow: 'none',
        '@media (max-width:915px)': {
          color: 'none',
        },
        '@media (max-width:640px)': {
          color: 'none',
        },
      }
    },
  })(FavoriteBorder);
  
  export const CustomPlayArrowIcon = withStyles({
    root: {
      boxShadow: 'none',
      color: 'inherit',
      borderColor: 'inherit',
    
      '&:hover': {
        cursor: 'pointer',
        color: '#fff',
        borderColor: '#fff',
        boxShadow: 'none',
        '@media (max-width:915px)': {
          color: 'none',
        },
        '@media (max-width:640px)': {
          color: 'none',
        },

      },
      '&:active': {
        boxShadow: 'none',
        color: '#fff',
        borderColor: '#fff',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        color: '#fff',
      },
    },
  })(PlayArrowIcon);
  
  export const ActivePauseIcon = withStyles({
    root: {
      color: '#fff',
      borderColor: 'inherit',
    },
  })(PauseIcon);
  
  export const CustomDeleteIcon = withStyles({
    root: {
      boxShadow: 'none',
      color: 'inherit',
      cursor: 'pointer',
      '&:hover': {
        color: '#fff',
        '@media (max-width:915px)': {
          color: 'none',
        },
        '@media (max-width:640px)': {
          color: 'none',
        },
      },
    },
  })(DeleteIcon);