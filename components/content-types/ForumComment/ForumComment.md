```js
import { Grid } from "/components/layout";
import { H5 } from "/components/typography";

const comment = {
  user_name: "Mathijs",
  user_age: 18,
  user_type: "Anonymous",
  content:
    "Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet.",
};

<Grid container spacing="32px">
  <Grid item md={8}>
    <H5 variant="bold">8 Col</H5>
    <ForumComment
      author={comment.user_name}
      age={comment.user_age}
      authorType={comment.user_type}
      postDate={new Date()}
      title={comment.content}
    />
  </Grid>
  <Grid item md={4}>
    <H5 variant="bold">4 Col</H5>
    <ForumComment
      author={comment.user_name}
      age={comment.user_age}
      authorType={comment.user_type}
      postDate={new Date()}
      title={comment.content}
    />
  </Grid>
  <Grid item md={6}>
    <H5 variant="bold">6 Col</H5>
    <ForumComment
      author={comment.user_name}
      age={comment.user_age}
      authorType={comment.user_type}
      postDate={new Date()}
      title={comment.content}
    />
  </Grid>

  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <ForumComment
      author={comment.user_name}
      age={comment.user_age}
      authorType={comment.user_type}
      postDate={new Date()}
      title={comment.content}
    />
  </Grid>
  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <ForumComment
      author={comment.user_name}
      age={comment.user_age}
      authorType={comment.user_type}
      postDate={new Date()}
      title={comment.content}
    />
  </Grid>
</Grid>;
```
