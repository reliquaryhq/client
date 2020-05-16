import React from 'react';
import Dashboard from './Dashboard';
import Login from './Login';
import { withSession, SessionProps } from './Session';
import styles from './Screen.module.css';

type Props = SessionProps & {};

type State = {};

class Screen extends React.Component<Props, State> {
  render() {
    const { session, sessionUser } = this.props;

    return (
      <div className={styles.screen}>
        {(!session || !sessionUser) && <Login />}
        {session && sessionUser && <Dashboard />}
      </div>
    );
  }
}

export default withSession(Screen);
