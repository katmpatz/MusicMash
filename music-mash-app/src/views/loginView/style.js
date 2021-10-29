import { makeStyles } from '@material-ui/core/styles';
export default  makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
  submit: {
    display:'flex',
    //textTransform: 'capitalize',
    margin: theme.spacing(3, 0, 2),
    fontWeight: '400',
      backgroundColor: 'black',
      '&:hover':{
        backgroundColor:'#8b6acb',
      },
    
      color: '#ffffff',
      width: 300,
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      width: 200,
      fontSize: '14px',
      fontWeight: '400',
      
    },
    [theme.breakpoints.up("md")]: {
      margin: 0,
      width: 260,
      fontSize: '16px',
      fontWeight: '400',
    },
    [theme.breakpoints.up("lg")]: {
      margin: 0,
      width: 320,
      fontSize: '18px',
      fontWeight: '700',
    },
    transition:'0.8s ease'
      
  },
  container: {
     
      width: '100%',
      height: '100vh',
      padding: 0,
      margin: 0,
      backgroundColor: '#f1caff',
      textAlign: 'center',
    justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    gridTemplateAreas:'"logo" "button" "Copyright',
    
    },
    Copyright: {
      position:'absolute',
      bottom: 10,
      textAlign: 'center',
      
      width: '100%',
      
      
    }, brand: {
      height:100
    },
    grow: {
      height:20
    }
  }));
  
  

  