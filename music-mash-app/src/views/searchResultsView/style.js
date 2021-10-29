import { makeStyles, fade } from '@material-ui/core/styles';

export default makeStyles((theme)=> ({
  box: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 10,            
  }, 
  space: {
    marginTop:5,
    display: 'flex',
    flexDirection:'column',
    width: '30%',
    color: 'white',
    position: 'absolute',
    marginLeft: theme.spacing(0),
    '@media (max-width:915px)': {
      width: '90%',
      zIndex: 10,
      top: 450,
      backgroundColor: 'rgba(40, 40, 40, 0.95)'
    },
    '@media (max-width:640px)': {
      width: '90%',
      zIndex: 10,
      top: 340,
      backgroundColor: 'rgba(40, 40, 40, 0.95)'
    },
    backgroundColor: 'rgba(256, 256, 256, 0.1)',
    transition:'0.8s ease',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },
  clearButton: {
    color: '#ffffff', 
  },

  content: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), #121212',
    boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
    color: 'rgb(255, 255, 255)',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      cursor:'pointer',
    },
  },
  primaryText: {
    color: 'white',
    fontSize: '13px',
  },
  secondaryText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '13px',
    '@media (max-width:640px)': {
      fontSize: '12px',
  }},
  noResults: {
    color: 'white',
    fontSize: '13px',
    marginTop: '30px',
    marginBottom: '30px',
  }
    
}));