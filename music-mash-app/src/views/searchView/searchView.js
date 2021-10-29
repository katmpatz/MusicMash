import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import '../../index.css';
import useStyles from './style'

export default function SearchView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  return (
    <Grid container direction='column'>
      <Grid item xs>
        <form className={classes.search} onSubmit={(e) => { e.preventDefault(); props.onSearch();}}>
          <InputBase
            className={classes.input}
            placeholder="Search songs by name, artist, album"
            inputProps={{ 'aria-label': 'search a song' }}
            onInput={e => { props.onText(e.target.value); setValue(e.target.value); }}
            value={props.shouldEmpty ? '' : value}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={ ()=>props.onSearch()}>
            <SearchIcon />
          </IconButton> 
        </form> 
      </Grid>
      <div className={classes.grow}></div>
      <div className={classes.grow}></div>
      <Grid item xs>  
      </Grid>
    </Grid>
  );
}
