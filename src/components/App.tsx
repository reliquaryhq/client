import React, { Fragment } from 'react';
import { Button } from '@blueprintjs/core';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Fragment>
        <h1>Hello from React!</h1>
        <Button>Button</Button>
      </Fragment>
    );
  }
}

export default App;
