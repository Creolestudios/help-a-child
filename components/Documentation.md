### Colors

```jsx
import { Box, Grid } from "/components/layout";
import ColorCard from "/components/card/ColorCard/ColorCard";
import { COLORS } from "/styles/theme";

<Grid container spacing={"32px"}>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.primary,
        textAlign: "center",
      }}
    >
      primary <br />
      {COLORS.primary}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.secondary,
        textAlign: "center",
      }}
    >
      secondary <br />
      {COLORS.secondary}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.tertiary,
        textAlign: "center",
      }}
    >
      tertiary <br />
      {COLORS.tertiary}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.text,
        color: "white",
        textAlign: "center",
      }}
    >
      text <br />
      {COLORS.text}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.white,
        textAlign: "center",
      }}
    >
      white <br />
      {COLORS.white}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.black,
        color: "white",
        textAlign: "center",
      }}
    >
      black <br />
      {COLORS.black}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.error,
        textAlign: "center",
      }}
    >
      error <br />
      {COLORS.error}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.success,
        textAlign: "center",
      }}
    >
      success <br />
      {COLORS.success}
    </Box>
  </Grid>
  <Grid item lg={2} xs={6}>
    <Box
      sx={{
        border: "1px solid black",
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: COLORS.info,
        textAlign: "center",
      }}
    >
      info <br />
      {COLORS.info}
    </Box>
  </Grid>
</Grid>;
```

### Icons & Logos

```jsx
import { Grid } from "/components/layout";
import Logo from "/components/icons/Logo/Logo";

import HeartIcon from "/components/icons/HeartIcon/HeartIcon";
import ChevronUp from "/components/icons/ChevronUp/ChevronUp";
import ChevronDown from "/components/icons/ChevronDown/ChevronDown";
import ChevronUpFilled from "/components/icons/ChevronUpFilled/ChevronUpFilled";
import ChevronDownFilled from "/components/icons/ChevronDownFilled/ChevronDownFilled";
import ImportantCircle from "/components/icons/ImportantCircle/ImportantCircle";
import UserIcon from "/components/icons/UserIcon/UserIcon";
import SearchIcon from "/components/icons/SearchIcon/SearchIcon";
import CheckmarkIcon from "/components/icons/Checkmark/CheckmarkIcon";
import MenuIcon from "/components/icons/MenuIcon/MenuIcon";
import ShareIcon from "/components/icons/ShareIcon/ShareIcon";
import UserAvatar from "/components/icons/UserAvatar/UserAvatar";
import CloseIcon from "/components/icons/CloseIcon/CloseIcon";

<Grid container>
  <Grid item md={6}>
    <Logo />
  </Grid>
  <Grid item md={3}>
    <UserAvatar
      alt="John Doe"
      size="sm"
      src="https://randomuser.me/api/portraits/lego/2.jpg"
    />
  </Grid>
  <Grid item md={3}>
    <UserAvatar
      alt="John Doe"
      size="md"
      src="https://randomuser.me/api/portraits/lego/2.jpg"
    />
  </Grid>

  <Grid md={1}>
    <HeartIcon />
  </Grid>
  <Grid md={1}>
    <ChevronUp />
  </Grid>
  <Grid md={1}>
    <ChevronDown />
  </Grid>
  <Grid md={1}>
    <ChevronUpFilled />
  </Grid>
  <Grid md={1}>
    <ChevronDownFilled />
  </Grid>
  <Grid md={1}>
    <ImportantCircle />
  </Grid>
  <Grid md={1}>
    <UserIcon />
  </Grid>
  <Grid md={1}>
    <SearchIcon />
  </Grid>
  <Grid md={1}>
    <CheckmarkIcon />
  </Grid>
  <Grid md={1}>
    <MenuIcon />
  </Grid>
  <Grid md={1}>
    <ShareIcon />
  </Grid>
  <Grid md={1}>
    <CloseIcon />
  </Grid>
</Grid>;
```

### Grid System

```jsx
import { Box, Grid } from "/components/layout";
import { COLORS } from "/styles/theme";

<Grid container spacing={2}>
  <Grid item xs={12}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col2
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      6 Col
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      6 Col
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      4 Col
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      4 Col
    </Box>
  </Grid>
  <Grid item xs={4}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      4 Col
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      3 Col
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      3 Col
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      3 Col
    </Box>
  </Grid>
  <Grid item xs={3}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      3 Col
    </Box>
  </Grid>
  <Grid item xs={2}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      2 Col
    </Box>
  </Grid>
  <Grid item xs={2}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      2 Col
    </Box>
  </Grid>
  <Grid item xs={2}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      2 Col
    </Box>
  </Grid>
  <Grid item xs={2}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      2 Col
    </Box>
  </Grid>
  <Grid item xs={2}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      2 Col
    </Box>
  </Grid>
  <Grid item xs={2}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      2 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item xs={1}>
    <Box
      sx={{
        border: "1px solid",
        borderRadius: "3px",
        paddingTop: "50px",
        paddingBottom: "50px",
        backgroundColor: "white",
        color: COLORS.primary,
        textAlign: "center",
      }}
    >
      1 Col
    </Box>
  </Grid>
  <Grid item>
    <p>
      Read more on the
      <a
        style={{ color: "blue" }}
        href="https://mui.com/material-ui/react-grid/"
      >
        grid system
      </a>
    </p>
  </Grid>
</Grid>;
```

### Typography

```jsx
import { H1, H2, H3, H4, H5, H6, P, ColorSpan } from "/components/typography";

<>
  <H1 variant="bold">Heading 1 - Bold</H1>
  <H1 variant="regular">Heading 1 - Regular</H1>
  <H1 variant="light">Heading 1 - Light</H1>
  <br />
  <br />
  <H2 variant="bold">Heading 2 - Bold</H2>
  <H2 variant="regular">Heading 2 - Regular</H2>
  <H2 variant="light">Heading 2 - Light</H2>
  <br />
  <br />
  <H3 variant="bold">Heading 3 - Bold</H3>
  <H3 variant="regular">Heading 3 - Regular</H3>
  <H3 variant="light">Heading 3 - Light</H3>
  <br />
  <br />
  <H4 variant="bold">Heading 4 - Bold</H4>
  <H4 variant="regular">Heading 4 - Regular</H4>
  <H4 variant="light">Heading 4 - Light</H4>
  <br />
  <br />
  <H5 variant="bold">Heading 5 - Bold</H5>
  <H5 variant="regular">Heading 5 - Regular</H5>
  <H5 variant="light">Heading 5 - Light</H5>
  <br />
  <br />
  <H6 variant="bold">Heading 6 - Bold</H6>
  <H6 variant="regular">Heading 6 - Regular</H6>
  <H6 variant="light">Heading 6 - Light</H6>
  <br />
  <br />
  <P>
    Paragraph Regular: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </P>
  <P variant="bold">
    Paragraph Bold: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </P>
  <P variant="italic">
    Paragraph Italic: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </P>
  <P variant="light">
    Paragraph Light: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </P>
  <P variant="helper">
    Helper text: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </P>
  <br />
  <br />
  <P variant="bold">
    Paragraph with primary color span: Lorem ipsum dolor{" "}
    <ColorSpan variant="primary">sit amet</ColorSpan>.
  </P>
  <P variant="regular">
    Paragraph with secondary color span: Lorem ipsum dolor{" "}
    <ColorSpan variant="secondary">sit amet</ColorSpan>.
  </P>
  <P variant="light">
    Paragraph with tertiary color span: Lorem ipsum dolor{" "}
    <ColorSpan variant="tertiary">sit amet</ColorSpan>.
  </P>
  <P variant="italic">
    Paragraph with info color span: Lorem ipsum dolor{" "}
    <ColorSpan variant="info">sit amet</ColorSpan>.
  </P>
</>;
```
