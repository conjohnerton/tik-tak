import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, GridItem } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import { lightBlue } from "@material-ui/core/colors";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

import Comment from "./Comment";

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
    margin: 10,
    backgroundColor: lightBlue[500],
    color: "#fff"
  },
  commentsArea: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    marginBottom: "1em"
  },
  commentArea: {
    marginBottom: "1em"
  },
  commentContent: {
    margin: ".2em .5em 0em .5em",
    paddingBottom: ".5em",
    paddingTop: ".2em"
  }
}));

function YakCard({ yak, deleteYak, currUser }) {
  const classes = useStyles();
  const splitEmail = stripEmailHandle(yak.author);

  const [open, setOpen] = useState(false);

  // Creates a render button if user owns yak
  let removeButton = "";
  if (currUser.email === yak.author) {
    removeButton = (
      <Grid item>
        <Button
          onClick={() => deleteYak(yak._id)}
          variant="outlined"
          size="small"
          color="secondary"
        >
          Remove
        </Button>
      </Grid>
    );
  }

  const comments = yak.comments.map((comment) => (
    <Comment
      classes={classes}
      splitEmail={splitEmail}
      content={comment.content}
    />
  ));

  return (
    <Container>
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
                  <Typography
                    variant="body2"
                    style={{ wordWrap: "break-word" }}
                  >
                    {yak.content}
                  </Typography>
                </Paper>
              </Grid>

              <Container className={classes.buttonArea}>
                <Grid
                  direction="column"
                  alignContent="flex-end"
                  alignItems="flex-end"
                  justify="flex-end"
                >
                  {/* Renders the removeButton, if it exists */}
                  <Grid item>{removeButton}</Grid>
                  <Grid item>
                    <Typography onClick={() => setOpen(!open)}>
                      Comments {open ? <ExpandLess /> : <ExpandMore />}
                    </Typography>
                  </Grid>
                </Grid>
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  className={classes.commentsArea}
                >
                  {comments}
                </Collapse>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default YakCard;
