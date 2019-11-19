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
  }
}));

export default function SignIn({
  handleChange,
  handleClickOpen,
  handleClose,
  handleCloseAndSubmit,
  open
}) {
  const classes = useStyles();

  return (
    <div>
      <AddButton className={classes.floatingButton} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a Post</DialogTitle>

        <DialogContent>
          <DialogContentText>
            When you create a post, everybody near you will see it, instantly!
          </DialogContentText>

          <form
            className={classes.form}
            noValidate
            onSubmit={handleCloseAndSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="content"
              label="Content"
              name="content"
              autoFocus
              multiline={true}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
