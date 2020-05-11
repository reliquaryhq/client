import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { RootState } from '../store';
import { getSession } from '../store/session';
import Login from './Login';
import Dashboard from './Dashboard';
import styles from './Screen.module.css';

const mapState = (state: RootState) => ({
  session: state.session,
});

const mapDispatch = {
  getSession,
};

const connector = connect(mapState, mapDispatch);

type ScreenProps = ConnectedProps<typeof connector> & {};

type ScreenState = {};

class Screen extends React.Component<ScreenProps, ScreenState> {
  componentDidMount() {
    const { getSession } = this.props;
    getSession();
  }

  render() {
    const { session } = this.props;

    return (
      <div className={styles.screen}>
        {session.isGetSessionPending && <p>Loading...</p>}
        {!session.session && <Login />}
        {session.session && <Dashboard />}
      </div>
    );
  }
}

export default connector(Screen);
