import { makeStyles, fade} from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    continer: {
        background: '#121212',
        color: '#ffffff',
        padding: 0,
        margin: 0,
        width:'100%'
        
          },
          gap: {
            marginBottom:10,
          },  
  
        space: {
          marginTop:50,
          
          '@media (max-width:915px)': {
            marginTop:100,
          },
          '@media (max-width:640px)': {
           marginTop:50,
          },
        },
  
        linkButton: {
          color: '#ffffff',
        },
  
        content: {
          width: '100%',
          height: '100%',
          background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), #121212',
          boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
          color: 'rgb(255, 255, 255)'
        },
        secondaryText: {
          color: 'rgba(255, 255, 255, 0.6)',
          '@media (max-width:640px)': {
            fontSize: '12px',
        }
        },
  
      header: {
   
        height: 100,
        width:'100%',
        left: 40,
        top: 50,
        paddingTop: 50,
        
      },
  
    copyright: {
      bottom: 20
    },
    number: {
      //color: "#fff",
      '@media (max-width:640px)': {
      fontSize:'13px', 
      fontWeight:'600'
      }
    },
  
      avatar: {
        backgroundColor: '#74539C',
        '&:hover': {
          backgroundColor: '#5B4179',
          cursor: 'pointer',
        },
        '@media (max-width:640px)': {
        width: theme.spacing(3),
        height: theme.spacing(3),
        }
      },
      userlist:{
        position:'absolute',
        height:'100%',
        backgroundColor: fade(theme.palette.common.black, 0.3),
        
    },
    player: {
      position:"fixed", 
      bottom:0, 
      width:'100vw', 
      paddingTop:"7px", 
      background: '#2C2C2C', 
      borderRadius: "5px"
    },
    coloredLink: {
      color: '#BB86FC',
    },
    playIcon: {
      color: "#fff",
  },
  songCover: {
    marginBottom: -10,
    
  }

}));
    