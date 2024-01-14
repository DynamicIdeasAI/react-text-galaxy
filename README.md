# React Text Galaxy

This is a text galaxy animation component based on canvas for React.

![Preview](preview-react-text-galaxy.gif)

## Install

```bash
npm i react-text-galaxy
```

## Import

```typescript
import { TextGalaxy } from 'react-text-galaxy'
```

## Use

```typescript
const [text, setText] = useState<string>("");

<TextGalaxy
  text={text}
/>
```

### Parameters

| Parameter   | Description                   | Default Value                                                           | Data Type                                                                                                                                                       | Optional |
| ----------- | ----------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| text        | Text content                  | ""                                                                      | string                                                                                                                                                          | No       |
| spiralSpeed | Animation speed               | "normal"                                                                | "slow" \| "normal" \| "fast"                                                                                                                                    | Yes      |
| font        | Font property of text         | { sizeInPx: 14, color: "#4F6A9B", family: "Arial Black" }               | { sizeInPx: number, family: string, color: string }                                                                                                             | Yes      |
| background  | Background property of canvas | { color: "#081330" }                                                    | { color: string }                                                                                                                                               | Yes      |
| size        | Size property of canvas       | { width: { value: 100, unit: "%" }, height: { value: 100, unit: "%" } } | { width: { value: number; unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" }, height: { value: number, unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" } } | Yes      |
