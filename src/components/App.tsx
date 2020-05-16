import React from 'react';
import Screen from './Screen';
import Session from './Session';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Session>
        <Screen />
      </Session>
    );
  }
}

export default App;
