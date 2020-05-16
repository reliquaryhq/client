import React from 'react';
import { Session, User } from '@reliquaryhq/types';
import api from '../../api';
import SessionContext from './SessionContext';

type Props = {
  children: React.ReactElement;
};

type State = {
  isLoadingSession: boolean;
  loadSessionError: Error | null;
  isRefreshingSession: boolean;
  refreshSessionError: Error | null;
  session: Session | null;
  sessionUser: User | null;
};

class SessionProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoadingSession: false,
      loadSessionError: null,
      isRefreshingSession: false,
      refreshSessionError: null,
      session: null,
      sessionUser: null,
    };
  }

  componentDidMount() {
    this.loadSession();
  }

  loadSession = async (): Promise<void> => {
    this.setState({ isLoadingSession: true });

    try {
      const session = await api.session.getSession();
      this.setState({ session });

      if (session.userId) {
        const user = await api.user.getUser(session.userId);
        this.setState({ sessionUser: user });
      } else {
        this.setState({ sessionUser: null });
      }
    } catch (error) {
      this.setState({ loadSessionError: error });
    } finally {
      this.setState({ isLoadingSession: false });
    }
  };

  refreshSession = async (): Promise<void> => {
    this.setState({ isRefreshingSession: true });

    try {
      const session = await api.session.getSession();
      this.setState({ session });

      if (session.userId) {
        const user = await api.user.getUser(session.userId);
        this.setState({ sessionUser: user });
      } else {
        this.setState({ sessionUser: null });
      }
    } catch (error) {
      this.setState({ refreshSessionError: error });
    } finally {
      this.setState({ isRefreshingSession: false });
    }
  };

  render() {
    const { children } = this.props;
    const { isLoadingSession, session, sessionUser } = this.state;

    const sessionContext = {
      session,
      sessionUser,
      refreshSession: this.refreshSession,
    };

    return (
      <SessionContext.Provider value={sessionContext}>
        {isLoadingSession && <p>Loading...</p>}
        {!isLoadingSession && children}
      </SessionContext.Provider>
    );
  }
}

export default SessionProvider;
