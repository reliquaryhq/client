import React, { Fragment } from 'react';
import { withSession, SessionProps } from './Session';
import api from '../api';
import AppNav from './AppNav';

type Props = SessionProps & {};

type State = {};

class Dashboard extends React.Component<Props, State> {
  handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();

    const { refreshSession } = this.props;

    await api.session.deleteSession();
    await refreshSession();
  };

  render() {
    return (
      <Fragment>
        <AppNav onLogout={this.handleLogout} />
      </Fragment>
    );
  }
}

export default withSession(Dashboard);
