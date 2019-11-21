import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

// Returns a string without the @email.com
function stripEmailHandle(email) {
  return email.split("@")[0];
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    marginBottom: "1em"
  },
  paperText: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    marginTop: ".5em"
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  avatar: {
    margin: 10
    // color: "#fff",
    // backgroundColor: lightBlue[500]
  }
}));

function YakCard({ yak, deleteYak, currUser }) {
  const classes = useStyles();
  const splitEmail = stripEmailHandle(yak.author);

  // Creates a render button if user owns yak
  let removeButton = "";
  if (currUser.email === yak.author) {
    removeButton = (
      <Grid item>
        <Typography
          onClick={() => deleteYak(yak._id)}
          variant="body2"
          style={{ cursor: "pointer" }}
        >
          Remove
        </Typography>
      </Grid>
    );
  }

  return (
    <Paper className={classes.paper} elevation={2}>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="space-between"
              >
                <Avatar className={classes.avatar} variant="rounded">
                  <PersonPinCircleIcon />
                </Avatar>

                <div>
                  <Typography variant="body2" color="textPrimary">
                    Posted by:
                  </Typography>

                  <Typography variant="body2" color="primary">
                    {splitEmail}
                  </Typography>
                </div>
              </Grid>

              <Paper className={classes.paperText} elevation={2}>
                <Typography variant="body2" style={{ wordWrap: "break-word" }}>
                  {yak.content}
                </Typography>
              </Paper>
            </Grid>
            {removeButton}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default YakCard;
