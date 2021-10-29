import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    media: {
      height: 250,
      width:240
    },
    playlist: {
      textTransform: "lowercase",
      backgroundColor: '#4caf50',
      color:'#ffffff',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      margin:0,
      height: '100%',
      width:'100%',
      backgroundColor: '#69f0ae',
      right: 0,
      justifyItems:'center'
      
  },
    card: {
      height: 360,
      padding:0,
      width: 240,
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), #121212',
      boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
      '&:hover': {
        border:'solid',
        borderColor: '#b694f6',
        color:'#8466c3'
      },
      marginTop:40,
  },
  cardTitle: {
    color: '#fff',
    marginBottom: 0,
    marginTop:-6
  },
createpartypanel: {
  // display: 'flex',
  // flexDirection:'column',
  width:"100%",
  height: '100vh',
  backgroundColor: '#f1caff',
  textAlign: 'center',
  color:'#121212',
  [theme.breakpoints.down("sm")]: {
        width:'100%'
  },
  [theme.breakpoints.up("md")]: {
    width:'100%' 
  },
  [theme.breakpoints.up("lg")]: {
    width:'100%'
  },
  transition:'0.8s ease'
  
    
  },
  right: {
    
    padding: 0,
    position: 'fixed',
    top: 0,
    right:0,
    },
  logo: {
      height:80,
    position: 'relative',
      marginTop:20,
      [theme.breakpoints.down("sm")]: {
        height: 40,
        
        
      },
      [theme.breakpoints.up("md")]: {
        height: 50,
    
        
      },
      [theme.breakpoints.up("lg")]: {
        height: 80,
        
      
      },
      transition:'0.8s ease'
    },
  textfield: {
    position:'relative',
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: 240,    
    },
    textAlign: 'center',
    marginTop:20,
    '& .MuiInputBase-input': {
      color: 'black',
    }
  },
  grow: {
    height:20
  },
  button: {
    position: 'relative',
    fontSize: 14,
    fontWeight:350,
    textTransform: 'capitalize',
    backgroundColor: '#121212',
      '&:hover':{
          backgroundColor: '#8466c3',  
        },
      color:'#ffffff',
      width: 200,
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        width: 150,   
      },
      [theme.breakpoints.up("md")]: {
        fontSize: 14,
        width: 150,
      
      },
      [theme.breakpoints.up("lg")]: {
        fontSize: 18,
        width:200,
      },
      transition:'0.8s ease',
    
  },
  createPartyTitle: {
    position: 'relative',
   marginBottom:40,
    [theme.breakpoints.down("sm")]: {
      fontSize:'2rem',
      width: 300,
      marginTop:80,
    },
    [theme.breakpoints.up("md")]: {
      fontSize:'2rem',
      width: 300,
      marginTop: 80,
      
    },
    [theme.breakpoints.up("lg")]: {
      fontSize:'2rem',
      width: 300,  
      marginTop:80,   
    },
    transition:'0.8s ease',
  },
  joinPartyTitle: {
    position: 'relative',
    marginBottom:20,
    [theme.breakpoints.down("sm")]: {
      fontSize:'2rem',
      width: 300,
      marginTop:40,
    },
    [theme.breakpoints.up("md")]: {
      fontSize:'2rem',
      width: 300,
      marginTop:80,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize:'2rem',
      width: 300,  
      top: 40,
      marginTop:80,
    },
    transition:'0.8s ease',
  },
  text: {
    alignItems: 'center',
    position: 'relative',
    marginTop:40,
    [theme.breakpoints.down("sm")]: {
      fontSize:'10px',
      marginTop: 10,
      left:'8%'
    },
    [theme.breakpoints.up("md")]: {
      fontSize: '12px',
      marginTop:40,
      
    },
    [theme.breakpoints.up("lg")]: {
      fontSize:'12px',
   
      
    },
    transition:'0.8s ease',
  },
  header: {
    marginLeft: 20,
    padding: 0,
    width:'100%'
  },
  title: {
    
      maxWidth: 400,
    color: '#ffffff',
      marginLeft:20,
      [theme.breakpoints.down("sm")]: {
       
        fontSize: '2rem',
        fontWeight: '800',
      },
      [theme.breakpoints.up("md")]: {
        
        fontSize: '2.5rem',
        fontWeight: '600',
      },
      [theme.breakpoints.up("lg")]: {
       
        fontSize: '3rem',
        fontWeight: '900',
      },
      transition:'0.8s ease'
        
  },
  brand: {
      height:80
  },
    partyContainer: {
      color:'#ffffff',
      paddingLeft:30,
      paddingRight: 0,
      backgroundColor: '#121212',
      height: '100%',
      width:'100%',
      paddingBottom: 150,
      alignItems: 'center',
      textAlign:'center',
      [theme.breakpoints.down("sm")]: {
        textAlign: 'center',
        justifyItems: 'center',
        justifyContents: 'center',
        alignItems: 'center',
        paddingLeft:30,
      },  
      transition:'0.8s ease'  
  },
  Deleteicon: {
      marginTop: '20px',
      marginLeft: '20px',
    color: '#121212',
      
  },
  
  backIcon: {
    marginTop: 20,
    marginLeft: 0,
    width:50,
    '&:hover': {
      marginLeft: 18,
      color:'#8b6acb'
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 40,
      left:30,
    },     
  },
  margin: {
    marginLeft: 0,
  },
  
  createPartyDrawer: {

    fontSize: 11,
    fontWeight:400,
    textTransform: 'capitalize',
    border:'1px solid #8b6acb',
    
    '&:hover':{
      backgroundColor:'#8466c3',
    },
    color:'#ffffff',
    width: 150,
    // position: 'absolute',
    // top: 80,
    // right:'50%' 
    marginLeft: 20,
    transition:'0.8s ease'
  },
  
  partyImage: {
      margin: 0,
      padding:0,
      height: 300,
      zIndex: 1,
      position: 'absolute',
      top: '30%',
      left: '40%',
      opacity: '50%',
      '&:hover': {
        opacity:"100%",
      },
      [theme.breakpoints.down("sm")]: {
      height:200,
       
      },
      
  },
  parties: {
    //justifyContent:'center',
    marginTop: 20,
    //alignItems:'center' 
  },
  partyName: {
    textAlign: 'left'
  },
  partyDate: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom:-10
    
  },
  linkButton: {
    color: '#ffffff',
  },
  JoinPartyDialog: {
    color: '#fff',
    backgroundColor: '#424242',
  }
  }));
  