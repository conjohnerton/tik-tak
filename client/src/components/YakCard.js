import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import {
  Grid,
  TextField,
  Paper,
  Button,
  Avatar,
  Container,
  Collapse
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore,
  PersonPinCircle,
  AddComment
} from "@material-ui/icons";

import ContentCard from "./ContentCard";
import PostedBy from "./PostedBy";
import UpvoteBox from "./UpvoteBox";
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
    maxWidth: 500
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

function YakCard({ yak, deleteYak, currUser, commentActions, upvoteYak }) {
  const classes = useStyles();
  const splitEmail = stripEmailHandle(yak.author);

  const [open, setOpen] = useState(false);

  function handleCommentCloseAndSubmit(event) {
    event.target.reset();
    commentActions.handleSubmitWithId(event, yak._id);
  }

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

  // Creates yak comment cards for collapsable section
  const comments = yak.comments.map((comment) => (
    <Comment
      key={comment._id}
      classes={classes}
      splitEmail={stripEmailHandle(comment.author)}
      content={comment.content}
    />
  ));

  return (
    <Container style={{ width: "60vw" }}>
      <Paper className={classes.paper} elevation={2}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Grid
                  item
                  container
                  direction="row"
                  alignItems="flex-start"
                  justify="space-between"
                >
                  {/* Renders image if yak has a url that I deem valid */}
                  {yak.image.length <= 12 ? (
                    <Avatar className={classes.avatar} variant="rounded">
                      <PersonPinCircle />
                    </Avatar>
                  ) : (
                    <img
                      style={{
                        height: "9em",
                        width: "9em",
                        justifySelf: "center"
                      }}
                      src={yak.image}
                      alt="From someone near your current location."
                    />
                  )}

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <PostedBy name={splitEmail} />
                    <UpvoteBox
                      upvotes={yak.upvotes}
                      upvoteYak={() => upvoteYak(yak._id)}
                    />
                  </div>
                </Grid>

                <ContentCard content={yak.content} style={classes.paperText} />
              </Grid>

              <Container className={classes.buttonArea}>
                <Grid
                  container
                  direction="row"
                  alignContent="center"
                  alignItems="center"
                  justify="space-between"
                >
                  {/* Renders the removeButton, if it exists */}
                  <Grid item>{removeButton}</Grid>
                  <Grid item>
                    {/* If no comments for yak, don't render the view comments */}
                    {yak.comments.length !== 0 ? (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {`View comments (${yak.comments.length})`}
                        {open ? <ExpandLess /> : <ExpandMore />}
                      </Button>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>

                <form onSubmit={handleCommentCloseAndSubmit}>
                  <Grid
                    item
                    container
                    direction="column-reverse"
                    style={{ marginTop: ".6em" }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      type="submit"
                      // style={{ marginTop: ".6em" }}
                    >
                      Add comment
                      <AddComment style={{ marginLeft: "1px" }} />
                    </Button>
                    <TextField
                      fullWidth
                      placeholder="Enter a comment"
                      variant="outlined"
                      margin="dense"
                      required
                      id="content"
                      label="Comment"
                      name="content"
                      multiline={false}
                      onChange={commentActions.handleChange}
                    />
                  </Grid>
                </form>

                {/* Renders collapsable comment section */}
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
