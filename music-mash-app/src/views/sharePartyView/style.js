
import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
   
    
    box: {
    textAlign: 'center',
    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), #121212',
    boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    alignItems:'center',
    padding: 40,
  },
  Dialog: {
    backgroundColor: '#424242',
    color: '#fff',
  },
  
  alert: {
    height: '100%',
    textAlign: 'center',
    backgroundColor: '#424242',
    color: '#fff',
    transition:'0.8s ease'
  },
  smallButton: {
        border: 'solid 1px',
        borderColor: "#BB86FC",
        textTransform: 'capitalize',
        fontSize: 13,
        backgroundColor: 'transparent',
        color:'#fff'
        
  },

  button: {
  
        fontSize: 14,
        fontWeight:350,
        textTransform: 'capitalize',
        backgroundColor: 'black',
        '&:hover':{
          backgroundColor:'#8b6acb',
        },
        color: 'white',
        width: 200,
        
      },
  partyImage: {
    height: 130,
    position:'relative',
  },
  partyId: {
    color:'#fff'
  }

}));
