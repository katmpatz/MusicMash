import { makeStyles,fade} from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    search: {
        display: 'flex',
        flexDirection:'row',
        position: 'absolute',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.3),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.15),
          
        },
        width:'30%',
        '@media (max-width:915px)': {
          width: '90%',
         
          marginTop: 20,
          
        },      
          transition:'0.8s ease', 
      },
    input: {
   
        marginLeft: theme.spacing(3),
        flex: 1,
        color: 'white',
      width: '50%',
      '@media (max-width:915px)': {
        width: '90%',
        position:'relative'
      },      
        transition:'0.8s ease', 
        

      },
      iconButton: {
        padding: 10,
        right:2,
        color: 'white',
        '&: hover': {
          backgroundColor:'#4caf50'
        }
    }, grow: {
        height:20
      }
      
  }));