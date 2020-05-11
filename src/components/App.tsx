import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Screen from './Screen';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <Screen />
      </Provider>
    );
  }
}

export default App;
