# React Text Galaxy

This is a text galaxy animation component based on canvas for React.

`Galaxy`
![Text Galaxy Preview](preview/preview-react-text-galaxy.gif)

`Matrix`
![Text Matrix Preview](preview/preview-react-text-matrix.gif)

## Install

```bash
npm i react-text-galaxy
```

OR

```bash
yarn add react-text-galaxy
```

## Import

```typescript
import { TextGalaxy, TextMatrix } from 'react-text-galaxy';
```

## Use

```typescript
const [text, setText] = useState<string>("");

<TextGalaxy
  text={text}
/>

<TextMatrix
  text={text}
/>
```

## Parameters

### TextGalaxy

| Parameter   | Description                   | Default Value                                                                                        | Data Type                                                                                                                                                         | Required |
| ----------- | ----------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| text        | Text content                  | `""`                                                                                                 | string                                                                                                                                                            | Yes      |
| spiralSpeed | Animation speed               | `"normal"`                                                                                           | `"slow" \| "normal" \| "fast"`                                                                                                                                    | No       |
| font        | Font property of text         | `{ sizeInPx: 14, family: "Arial Black" }`                                                            | `{ sizeInPx: number, family: string }`                                                                                                                            | No       |
| textColors  | Colors of text line           | `['rgba(166, 213, 119, 1)', 'rgba(67, 128, 50, 1)', 'rgba(1, 68, 33, 0.8)', 'rgba(1, 50, 32, 0.5)']` | `string[]`                                                                                                                                                        | No       |
| background  | Background property of canvas | `{ color: "#081330" }`                                                                               | `{ color: string }`                                                                                                                                               | No       |
| size        | Size property of canvas       | `{ width: { value: 100, unit: "%" }, height: { value: 100, unit: "%" } }`                            | `{ width: { value: number; unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" }, height: { value: number, unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" } }` | No       |

### TextMatrix

| Parameter    | Description                   | Default Value                                                                                        | Data Type                                                                                                                                                         | Required |
| ------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| text         | Text content                  | `""`                                                                                                 | string                                                                                                                                                            | Yes      |
| fallingSpeed | Animation speed               | "normal"                                                                                             | `"slow" \| "normal" \| "fast"`                                                                                                                                    | No       |
| font         | Font property of text         | `{ sizeInPx: 16, family: "Arial Black" }`                                                            | `{ sizeInPx: number, family: string }`                                                                                                                            | No       |
| textColors   | Colors of text line           | `['rgba(166, 213, 119, 1)', 'rgba(67, 128, 50, 1)', 'rgba(1, 68, 33, 0.8)', 'rgba(1, 50, 32, 0.5)']` | `string[]`                                                                                                                                                        | No       |
| background   | Background property of canvas | `{ color: "#071104" }`                                                                               | `{ color: string }`                                                                                                                                               | No       |
| size         | Size property of canvas       | `{ width: { value: 100, unit: "%" }, height: { value: 100, unit: "%" } }`                            | `{ width: { value: number; unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" }, height: { value: number, unit: "px" \| "em" \| "rem" \| "vh" \| "vw" \| "%" } }` | No       |
