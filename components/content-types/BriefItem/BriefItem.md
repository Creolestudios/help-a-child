```js
import { Grid } from "/components/layout";
import { H3, H5, P } from "/components/typography";

<Grid container spacing={"32px"}>
  <Grid item md={8}>
    <H5 variant="bold">8 Col</H5>
    <BriefItem
      key={letter.id}
      title="Brief voor alle kinderen"
      content="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de
          ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per
          jaar horen dat hun ouders gaan scheiden?"
      imgSrc="https://picsum.photos/920/180"
      fileSrc={`#test`}
      category="Thema"
    />
  </Grid>
  <Grid item md={4}>
    <H5 variant="bold">8 Col</H5>
    <BriefItem
      key={letter.id}
      title="Brief voor alle kinderen"
      content="Lieve jij. Deze brief is speciaal voor jou: voor kinderen van wie de
          ouders uit elkaar gaan of al zijn. Wist je dat 86.000 kinderen per
          jaar horen dat hun ouders gaan scheiden?"
      imgSrc="https://picsum.photos/920/180"
      fileSrc={`#test`}
      category="Thema"
    />
  </Grid>
</Grid>;
```
