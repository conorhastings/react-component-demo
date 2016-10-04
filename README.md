## React Component Demo

A React Component To make live editable demos of other React Components. Great for documentation.

#### <a href='http://conor.rodeo/react-component-demo'>Demo</a>

<img src='http://i.imgur.com/9ah89vu.gif' />

### Install

`npm install react-component-demo --save`

### Use

#### props
* `Component` - the Component to demo.
* `name` - the name of the Component, will use Component.displayName if not provided.
* `props` - an object with the props for the component (these will be editable)
* `codeContainerStyle` - optional prop to edit style of code container
* `componentContainerStyle` - optional prop to edit style of component container

```jsx
import React from 'react';
import { render } from 'react-dom';
import ComponentDemo from 'react-component-demo';

function TestComponent({ backgroundColor, color, height }) {
  return (
    <div style={{backgroundColor, color, height, fontWeight: 800, fontSize: "80px" }}>
      React Component Demo
    </div>
  );
}

function Demo() {
  return (
    <ComponentDemo 
      Component={TestComponent}
      name='TestComponent'
      props={{
        backgroundColor: 'dodgerblue',
        color: 'bisque',
        height: '500px'
      }}
      codeContainerStyle={{ width: '48%', float: 'left'}}
      componentContainerStyle={{ width: '48%', float: 'right'}}
    />
  );
}

render(<Demo />, document.getElementById('app'));
```
