import { makeStyles } from '@material-ui/core/styles';

export default  makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  box: {
    marginTop:100,
    display:'flex',
    flex: 'raw',
    textAlign: 'center',
    color: "#ffffff",
  },
  textline:{
    borderRadius: 4,
  }, 
  input: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10,
  },
  grow: {
    height: 20,
  },
  title: {
    textAlign: 'center',
    color: "#ffffff",
  },
  dialog: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    color: "#ffffff",
        
  },
  dialogPop: {
    backgroundColor: '#424242',
    
  },
  moodPicker: {
    marginRight: 10,
    color: "#ffffff",
  },
  button: {
    fontSize: 14,
    fontWeight: 700,
    textTransform: 'capitalize',
    border:'1px solid #8b6acb',
    color: '#ffffff', 
    '&:hover':{
      backgroundColor:'#8b6acb',
    },
    width: 200,  
  },
  linkButton: {
    color: '#ffffff',
    position: 'absolute',
    top: 80,
  },
}));