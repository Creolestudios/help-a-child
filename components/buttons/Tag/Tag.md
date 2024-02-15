**Tag normal:**

```js
<Tag onClick={() => alert("Optional click")}>Tag name</Tag>
```

**Tag small with positioning (Cardheader):**

```js
import CardHeader from "/components/card/CardHeader/CardHeader";
import { COLORS } from "/styles/theme";

<CardHeader style={{ border: "1px solid " + COLORS.primary }}>
  <Tag position="tl" size="m" onClick={() => alert("Optional click")}>
    Position tl
  </Tag>
  <Tag position="tr" size="m" onClick={() => alert("Optional click")}>
    Position tr
  </Tag>
  <Tag position="br" size="m" onClick={() => alert("Optional click")}>
    Position br
  </Tag>
  <Tag position="bl" size="m" onClick={() => alert("Optional click")}>
    Position bl
  </Tag>
</CardHeader>;
```
