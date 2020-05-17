import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Screen from './Screen';
import Session from './Session';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Session>
        <BrowserRouter>
          <Screen />
        </BrowserRouter>
      </Session>
    );
  }
}

export default App;
