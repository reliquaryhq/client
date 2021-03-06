import React from 'react';
import {
  Button,
  InputGroup,
  Intent,
  Tooltip,
  Card,
  Elevation,
  Classes,
  FormGroup,
} from '@blueprintjs/core';
import api from '../api';
import toaster from '../toaster';
import styles from './Login.module.css';
import { SessionProps, withSession } from './Session';

type Props = SessionProps & {};

type State = {
  name: string;
  password: string;
  showPassword: boolean;
  isCreatingSession: boolean;
};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      showPassword: false,
      isCreatingSession: false,
    };
  }

  handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { refreshSession } = this.props;
    const { name, password } = this.state;

    this.setState({ isCreatingSession: true });

    try {
      await api.session.createSession(name, password);
      await refreshSession();
    } catch (error) {
      toaster.show({
        message: `Error: ${error.message}`,
        intent: Intent.DANGER,
      });
    } finally {
      this.setState({ isCreatingSession: false });
    }
  };

  handleShowPassword = () => {
    const { showPassword } = this.state;

    this.setState({
      showPassword: !showPassword,
    });
  };

  render() {
    const { name, password, showPassword, isCreatingSession } = this.state;

    const lockButton = (
      <Tooltip content={`${showPassword ? 'Hide' : 'Show'} Password`}>
        <Button
          icon={showPassword ? 'unlock' : 'lock'}
          intent={Intent.WARNING}
          minimal={true}
          onClick={this.handleShowPassword}
        />
      </Tooltip>
    );

    return (
      <div className={styles.wrapper}>
        <div className={styles.login}>
          <form onSubmit={this.handleSubmit}>
            <Card elevation={Elevation.TWO}>
              <h4 className={Classes.HEADING}>Log In</h4>

              <FormGroup
                label="Name"
                labelFor="login-name"
                labelInfo="(required)"
              >
                <InputGroup
                  id="login-name"
                  autoComplete="username"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    this.setState({ name: event.currentTarget.value })
                  }
                />
              </FormGroup>

              <FormGroup
                label="Password"
                labelFor="login-password"
                labelInfo="(required)"
              >
                <InputGroup
                  id="login-password"
                  autoComplete="current-password"
                  placeholder="Enter your password..."
                  rightElement={lockButton}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                    this.setState({ password: event.currentTarget.value })
                  }
                />
              </FormGroup>

              <div className={styles.actions}>
                <Button
                  type="submit"
                  disabled={isCreatingSession}
                  intent={Intent.PRIMARY}
                >
                  Log In
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </div>
    );
  }
}

export default withSession(Login);
