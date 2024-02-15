### Description

Video item that displays self hosted image.

### Examples

**Video Item in Grid cols:**

```jsx
import { Grid } from "/components/layout";
import { H5 } from "/components/typography";

<Grid container spacing={"32px"}>
  <Grid item md={8}>
    <H5 variant="bold">8 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </Grid>
  <Grid item md={4}>
    <H5 variant="bold">4 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </Grid>
  <Grid item md={6}>
    <H5 variant="bold">6 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </Grid>

  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </Grid>
  <Grid item md={3}>
    <H5 variant="bold">3 Col</H5>
    <VideoItem
      src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      title="Big Buck Bunny"
      subtitle="Hier komt een omschrijvende tekst"
    />
  </Grid>
</Grid>;
```
