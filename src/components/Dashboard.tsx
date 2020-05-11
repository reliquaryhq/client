import React from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import { deleteSession } from '../store/session';

const mapDispatch = {
  deleteSession,
};

const connector = connect(null, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

type State = {};

class Dashboard extends React.Component<Props, State> {
  handleLogout = (event: React.FormEvent) => {
    event.preventDefault();

    const { deleteSession } = this.props;

    deleteSession();
  };

  render() {
    return (
      <Button type="button" onClick={this.handleLogout}>
        Logout
      </Button>
    );
  }
}

export default connector(Dashboard);
