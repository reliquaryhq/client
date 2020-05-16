import React from 'react';
import SessionContext from './Session/SessionContext';
import SessionProvider from './Session/SessionProvider';
import withSession from './Session/withSession';

type SessionProps = React.ContextType<typeof SessionContext>;

export { SessionProps, withSession };

export default SessionProvider;
