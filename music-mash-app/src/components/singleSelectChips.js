import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Chip,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: ".5rem 0 .5rem",
    textAlign: "center",
  },
  chipsDiv: {
    marginTop: ".3rem",
  },
  chip: {
    margin: ".5rem",
    padding: "0.5rem",
  }
}));

export default function SingleSelectChips ({ value, setValue, options }) {
    const classes = useStyles();

    const handleClick = (clickedValue) => {
        if (value !== clickedValue) {
            setValue(clickedValue);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.chipsDiv}>
            {options && options.length
                ? options.map((option, i) => (
                    <Chip
                    icon={option.icon}
                    className={classes.chip}
                    key={i}
                    color="primary"
                    variant={
                        (value === option.value)
                        ? "default"
                        : "outlined"
                    }
                    label={
                        <Typography variant="body2" color={(value === option.value) ? 'initial' : 'primary'}>{`${option.label}`}</Typography>
                    }
                    clickable
                    onClick={() => handleClick(option.value)}
                    />
                ))
                : null}
            </div>
        </div>
    );
}

SingleSelectChips.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  error: PropTypes.string,
  setError: PropTypes.func,
};