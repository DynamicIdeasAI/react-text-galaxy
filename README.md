# React Text Galaxy

This is a text galaxy animation component based on canvas for React. Inspired by Midjourney.

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

| Parameter   | Description                   | Default Value                                                           | Data Type                                                                                                                                                       | Required |
| ----------- | ----------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| text        | Text content                  | ""                                                                      | string                                                                                                                                                          | Yes      |
| spiralSpeed | Animation speed               | "normal"                                                                | "slow" \| "normal" \| "fast"                                                                                                                                    | No       |
| font        | Font property of text         | { sizeInPx: 14, color: "#4F6A9B", family: "Arial Black" }               | { sizeInPx: number, family: string, color: string }                                                                                                             | No       |
| background  | Background property of canvas | { color: "#081330" }                                                    | { color: string }                                                                                                                                               | No       |
| size        | Size property of canvas       | { width: { value: 100, unit: "%" }, height: { value: 100, unit: "%" } } | { width: { value: number; unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" }, height: { value: number, unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" } } | No       |
