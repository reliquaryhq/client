import React from 'react';
import { Alignment, Button, Navbar } from '@blueprintjs/core';

type Props = {
  onLogout: (event: React.FormEvent) => Promise<void>;
};

class AppNav extends React.Component<Props, {}> {
  render() {
    const { onLogout } = this.props;

    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Reliquary</Navbar.Heading>

          <Navbar.Divider />

          <Button className="bp3-minimal" icon="home" text="Home" />
        </Navbar.Group>

        <Navbar.Group align={Alignment.RIGHT}>
          <Navbar.Divider />

          <Button
            className="bp3-minimal"
            icon="log-out"
            text="Log Out"
            onClick={onLogout}
          />
        </Navbar.Group>
      </Navbar>
    );
  }
}

export default AppNav;
