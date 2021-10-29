import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
    loader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
  });

const Loader = withStyles(styles)((props) => {
    const { classes } = props;
    return (
        <div className={classes.loader}>
            <CircularProgress size='60px' color='primary' disableShrink />
        </div>
    );
});

export default Loader;