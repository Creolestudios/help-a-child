### Description

Forum post that displays a summary of the forum post.

### Examples

**Video Item in Grid cols:**

```js
import { Grid } from "/components/layout";
import { H5 } from "/components/typography";

<Grid container spacing="32px">
  <Grid item md={8}>
    <H5 variant="bold">8 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </Grid>
  <Grid item md={4}>
    <H5 variant="bold">4 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </Grid>
  <Grid item md={6}>
    <H5 variant="bold">6 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </Grid>

  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </Grid>
  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <ForumPost
      author="Mathijs"
      age={18}
      likes={126}
      authorType="Buddy"
      postDate={new Date()}
      tags={["Tag 1", "Tag 2"]}
      title="Vraag van forum post komt hier, dit kan een lange zin zijn? Lorem ipsum dolor sit amet."
    />
  </Grid>
</Grid>;
```
