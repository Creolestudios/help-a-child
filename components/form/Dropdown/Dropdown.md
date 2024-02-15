### Dropdown

```jsx
<Dropdown
  options={[
    { name: "Option 1", value: 1 },
    { name: "Option 2", value: 2 },
    { name: "Option 3", value: 3 },
    { name: "Option 4", value: 4 },
  ]}
/>
```

### Dropdown with label

```jsx
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Dropdown
  options={[
    { name: "Option 1", value: 1 },
    { name: "Option 2", value: 2 },
    { name: "Option 3", value: 3 },
    { name: "Option 4", value: 4 },
  ]}
  label="Label"
/>;
```

### Dropdown with helper-text

```jsx
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Dropdown
  options={[
    { name: "Option 1", value: 1 },
    { name: "Option 2", value: 2 },
    { name: "Option 3", value: 3 },
    { name: "Option 4", value: 4 },
  ]}
  helperText="Text to help "
/>;
```

### Dropdown with label and helper text

```jsx
import UserIcon from "/components/icons/UserIcon/UserIcon";

<Dropdown
  options={[
    { name: "Option 1", value: 1 },
    { name: "Option 2", value: 2 },
    { name: "Option 3", value: 3 },
    { name: "Option 4", value: 4 },
  ]}
  label="Label"
  helperText="Text to help "
/>;
```

### Dropdown with helper text & Icon

```jsx
import UserIcon from "/components/icons/UserIcon/UserIcon";

<>
  <Dropdown
    options={[
      { name: "Option 1", value: 1 },
      { name: "Option 2", value: 2 },
      { name: "Option 3", value: 3 },
      { name: "Option 4", value: 4 },
    ]}
    label="Label"
    helperText="Text to help "
  />
</>;
```

### Dropdown with helper text, icon and placeholder

```jsx
<>
  <Dropdown
    options={[
      { name: "Option 1", value: 1 },
      { name: "Option 2", value: 2 },
      { name: "Option 3", value: 3 },
      { name: "Option 4", value: 4 },
    ]}
    label="Label"
    placeholder="Search"
    helperText="Text to help "
  />
</>
```

### Dropdown disabled

```jsx
<>
  <Dropdown
    options={[
      { name: "Option 1", value: 1 },
      { name: "Option 2", value: 2 },
      { name: "Option 3", value: 3 },
      { name: "Option 4", value: 4 },
    ]}
    label="Label"
    placeholder="Search"
    helperText="Text to help "
    disabled
  />
</>
```

### Dropdown active

```jsx
<>
  <Dropdown
    options={[
      { name: "Option 1", value: 1 },
      { name: "Option 2", value: 2 },
      { name: "Option 3", value: 3 },
      { name: "Option 4", value: 4 },
    ]}
    label="Label"
    placeholder="Search"
    helperText="Text to help "
    active
  />
</>
```

### Dropdown with error

```jsx
<>
  <Dropdown
    options={[
      { name: "Option 1", value: 1 },
      { name: "Option 2", value: 2 },
      { name: "Option 3", value: 3 },
      { name: "Option 4", value: 4 },
    ]}
    label="Label"
    placeholder="Search"
    helperText="Text to help "
    hasError
  />
</>
```
