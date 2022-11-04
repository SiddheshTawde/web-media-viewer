<h1 align="center">Web Media Viewer</h1>

<h4 align="center">A React based viewer, inspired from the <a href="https://codesandbox.io/s/github/pmndrs/react-spring/tree/master/demo/src/sandboxes/viewpager" target="_blank">React Spring View Pager Example</a> for different types of web media.</h4>

<div align="center">
	<img src="https://raw.githubusercontent.com/SiddheshTawde/web-media-viewer/main/documentation/demo.gif" alt="Web Media Viewer Demo" />
</div>

<br />

---

## Getting Started

Web Media Viewer requires <a href="https://reactjs.org/">React</a>.

#### Installation
```bash

npm install web-media-viewer

```

#### Basic Usage

```tsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import MediaViewer from 'web-media-viewer';

const App: React.FunctionComponent = () => {
  return (
    <MediaViewer
      items={[
        {
          url: 'https://images.pexels.com/photos/7932578/pexels-photo-7932578.jpeg',
          title: 'Swiss valley'
        },
        {
          url: 'https://images.pexels.com/photos/1461027/pexels-photo-1461027.jpeg',
          title: 'Grassland'
        },
        {
          url: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg',
          title: 'Frozen Lake'
        }
      ]}
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
      <td align="center" width="250px">items*</td>
      <td align="center" width="250px">ItemProps[ ]</td>
    </tr>
    <tr>
      <td align="center" width="250px">hideControls</td>
      <td align="center" width="250px">boolean</td>
    </tr>
    <tr>
      <td align="center" width="250px">titleStyles</td>
      <td align="center" width="250px">CSS Properties</td>
    </tr>
    <tr>
      <td align="center" width="250px">swipeDistance</td>
      <td align="center" width="250px">number</td>
    </tr>
    <tr>
      <td align="center" width="250px">galleryName</td>
      <td align="center" width="250px">string</td>
    </tr>
    <tr>
      <td align="center" width="250px">spinnerSize</td>
      <td align="center" width="250px">number</td>
    </tr>
  </tbody>
</table>

<br />

<h4>ItemProps:</h4>
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
      <td align="center" width="250px">url*</td>
      <td align="center" width="250px">string</td>
    </tr>
    <tr>
      <td align="center" width="250px">title</td>
      <td align="center" width="250px">string</td>
    </tr>
    <tr>
      <td align="center" width="250px">thumbnailUrl</td>
      <td align="center">string</td>
    </tr>
    <tr>
      <td align="center" width="250px">type</td>
      <td align="center" width="250px">string</td>
    </tr>
  </tbody>
</table>

<br />

---

### License
MIT
