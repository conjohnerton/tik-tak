import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddButton from "./AddButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  floatingButton: {
    margin: theme.spacing(1)
  },
  button: {
    theme: theme.spacing(1)
  }
}));

export default function SignIn({ handleCloseAndSubmit, open, closeDialog }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Remove this post?</DialogTitle>

        <DialogContent>
          <Button
            onClick={handleCloseAndSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Remove
          </Button>
          <Button
            onClick={closeDialog}
            fullWidth
            color="secondary"
            className={classes.button}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
