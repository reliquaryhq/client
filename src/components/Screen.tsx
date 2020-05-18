import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import api from '../api';
import AppNav from './AppNav';
import HomeScreen from './HomeScreen';
import Login from './Login';
import { withSession, SessionProps } from './Session';
import SourceScreen from './SourceScreen';
import styles from './Screen.module.css';

type Props = SessionProps & {};

type State = {};

class Screen extends React.Component<Props, State> {
  handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();

    const { refreshSession } = this.props;

    await api.session.deleteSession();
    await refreshSession();
  };

  render() {
    const { session, sessionUser } = this.props;

    return (
      <div className={styles.screen}>
        {(!session || !sessionUser) && <Login />}

        {session && sessionUser && (
          <Fragment>
            <AppNav onLogout={this.handleLogout} />

            <div className={styles.content}>
              <Switch>
                <Route path="/" exact>
                  <HomeScreen />
                </Route>

                <Route path="/source">
                  <SourceScreen />
                </Route>
              </Switch>
            </div>
          </Fragment>
        )}
      </div>
    );
  }
}

export default withSession(Screen);
