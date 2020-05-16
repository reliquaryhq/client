import React from 'react';
import { Subtract } from '../../util/type';
import SessionContext from './SessionContext';

type SessionProps = React.ContextType<typeof SessionContext>;

const withSession = <Props extends SessionProps>(
  Component: React.ComponentType<Props>
) => {
  const displayName = Component.displayName || Component.name || 'Component';

  class WrappedComponent extends React.Component<
    Subtract<Props, SessionProps>
  > {
    public static readonly displayName = `WithSession(${displayName})`;

    render() {
      return (
        <SessionContext.Consumer>
          {({ session, sessionUser, refreshSession }) => (
            <Component
              {...(this.props as Props)}
              session={session}
              sessionUser={sessionUser}
              refreshSession={refreshSession}
            />
          )}
        </SessionContext.Consumer>
      );
    }
  }

  return WrappedComponent;
};

export default withSession;
