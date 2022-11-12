<h1 align="center">Web Media Viewer</h1>

<h4 align="center">A React based viewer, inspired from the <a href="https://codesandbox.io/s/github/pmndrs/react-spring/tree/master/demo/src/sandboxes/viewpager" target="_blank">React Spring View Pager Example</a> for different types of web media.</h4>

<div align="center">
  <img src="https://raw.githubusercontent.com/SiddheshTawde/web-media-viewer/main/public/web-media-viewer-1.1.1-demo.gif" alt="Web Media Viewer Demo" width="720px" />
</div>

## Getting Started

Web Media Viewer requires [React](https://reactjs.org/).

#### Installation
```bash

npm install web-media-viewer

# or

yarn add web-media-viewer

```

#### Basic Usage

```jsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import MediaViewer from 'web-media-viewer';

const App = () => {
  return (
    <MediaViewer
      items={[
        {
          url: "https://picsum.photos/id/12/2500/1667",
          title: "Paul Jarvis",
          type: "image" // required if the image link is not a direct link
        },
        {
          url: "https://images.pexels.com/photos/2399391/pexels-photo-2399391.jpeg",
          title: "<div><b>Photo of People Near Clock Tower During Daytime</b><p>Bern, BE, Switzerland</p><div>"
        },
        {
          url: "https://www.youtube.com/watch?v=linlz7-Pnvw", // Auto-embed Youtube/Vimeo links
          title: "Switzerland in 8K ULTRA HD HDR - Heaven of Earth (60 FPS)"
        },
        {
          url: "https://images.pexels.com/photos/1608966/pexels-photo-1608966.jpeg",
          title: "<div><b>Green Trees</b><p>Lauterbrunnen, BE, Switzerland</p><div>"
        },
      ]}
      galleryName="Switzerland's Best"
    />
  );
};

const root = createRoot(document.body);
root.render(<App />);

```

#### Required & Optional Props

<br />
<h4>MediaViewerProps:</h4>
items prop requires an array of items with URL.<br />
<table width="500px" border>
  <thead>
    <tr>
      <th><center width="250px">prop</center></th>
      <th><center width="250px">value</center></th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td align="center" width="250px">items (required)</td>
      <td align="center" width="250px">ItemProp[ ]</td>
    </tr>
    <tr>
      <td align="center" width="250px">galleryName</td>
      <td align="center" width="250px">string</td>
    </tr>
  </tbody>
</table>

<br />

<h4>ItemProp:</h4>
Each item must contain a url key. Optionally, you can pass a title and/or thumbnail url.

<table width="500px" border>
  <thead width="250px">
    <tr>
      <th><center width="250px">prop</center></th>
      <th><center width="250px">value</center></th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td align="center" width="250px">url (required)</td>
      <td align="center" width="250px">string</td>
    </tr>
    <tr>
      <td align="center" width="250px">title</td>
      <td align="center" width="250px">string | HTML</td>
    </tr>
    <tr>
      <td align="center" width="250px">thumbnail</td>
      <td align="center">string</td>
    </tr>
    <tr>
      <td align="center" width="250px">type <br/>(required if url is NOT a direct link)</td>
      <td align="center" width="250px">string</td>
    </tr>
  </tbody>
</table>

<br />

---

### License

[MIT](https://github.com/SiddheshTawde/web-media-viewer/blob/main/LICENCE)