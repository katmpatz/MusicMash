import React from 'react';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';
import musicMash from '../images/musicMash.png';
import useStyles from './style'
import '../../index.css';
import Copyright from '../../components/copyright';

export default function LoginView(props) {
  const classes = useStyles();

  return (
    <motion.div
    animate={{ background: "#85F" }}
    transition={{
      duration: 5,
      yoyo: Infinity
    }}
    background={"#0CF"}
    className={classes.container}>
     
      <div className={classes.paper}>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        >
        <motion.img
          src={musicMash}
            className={classes.brand}
            id={classes.logo}
        >
        </motion.img>
          <div className={classes.grow}></div>
          <div className={classes.grow}></div>

        <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={() => props.handleLogin()}
            id={classes.button}
          >
            Log in with Spotify
          </Button>
        </motion.div>
        
        
      </div >
      <div className={classes.Copyright} id={classes.Copyright}>
        <Copyright />
      </div>
    </motion.div>
  );
}