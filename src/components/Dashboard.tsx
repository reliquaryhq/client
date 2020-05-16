import React from 'react';
import { Button } from '@blueprintjs/core';
import { withSession, SessionProps } from './Session';
import api from '../api';

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
      <Button type="button" onClick={this.handleLogout}>
        Logout
      </Button>
    );
  }
}

export default withSession(Dashboard);
