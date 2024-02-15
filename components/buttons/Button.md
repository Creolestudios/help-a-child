```jsx
const style = {
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "13px",
};

<div style={style}>
  <Button onClick={() => alert("Pizza: 🍕")}>Button Primary</Button>
  <Button variant="info" onClick={() => alert("Pizza: 🍕")}>
    Button Info
  </Button>
  <Button variant="infoReversed" onClick={() => alert("Pizza: 🍕")}>
    Button Inverted
  </Button>
  <Button variant="secondary" onClick={() => alert("Pizza: 🍕")}>
    Button Secondary
  </Button>
  <Button variant="tertiary" onClick={() => alert("Pizza: 🍕")}>
    Button tertiary
  </Button>
  <Button variant="link" onClick={() => alert("Pizza: 🍕")}>
    Button link
  </Button>
</div>;
```
