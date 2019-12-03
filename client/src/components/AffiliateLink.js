import React from "react";
import { Grid, Typography } from "@material-ui/core";

function AffiliateLink({ maxWidth }) {
  return (
    <Grid>
      <Typography align="center" style={{ width: maxWidth }}>
        Like the app? Support it by using my{" "}
        <a href="https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=sr_1_2?crid=NEZTT3M7C6C6&amp;keywords=cracking+the+coding+interview&amp;qid=1575069077&amp;sprefix=cracking+the+coding+%2Caps%2C155&amp;sr=8-2&_encoding=UTF8&tag=johnconnerton-20&linkCode=ur2&linkId=99d75c02add5c23b93dab45562ff8dd6&camp=1789&creative=9325">
          Amazon affiliate link!
        </a>
      </Typography>
    </Grid>
  );
}

export default AffiliateLink;
