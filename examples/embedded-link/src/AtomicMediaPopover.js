import React from "react";
import { AtomicMediaButton } from "draft-js-wysiwyg";
import {
  Popover,
  makeStyles,
  TextField,
  Typography,
  Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2)
  },
  title: {
    fontWeight: theme.typography.fontWeightBold
  },
  actions: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "15px 15px 0px 15px"
  }
}));

const AtomicMediaPopover = ({ onClose, ...other }) => {
  const [src, setSrc] = React.useState("");
  const classes = useStyles();

  const handleChange = (event) => {
    setSrc(event.target.value);
  };

  const handleClose = () => {
    setSrc("");
    onClose();
  };

  return (
    <Popover
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      {...other}
    >
      <div className={classes.paper}>
        <Typography className={classes.title} gutterBottom>
          Embed ULR
        </Typography>
        <TextField
          value={src}
          onChange={handleChange}
          variant="outlined"
          label="Enter link"
          size="small"
        />
        <div className={classes.actions}>
          <AtomicMediaButton
            color="primary"
            disabled={!Boolean(src)}
            atomicMediaProps={{ src }}
            onInserted={handleClose}
            variant="outlined"
          >
            Add
          </AtomicMediaButton>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </Popover>
  );
};

export default AtomicMediaPopover;
