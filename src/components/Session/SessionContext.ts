import React from 'react';
import { Session, User } from '@reliquaryhq/types';

type SessionProps = {
  session: Session | null;
  sessionUser: User | null;
  refreshSession: () => Promise<void>;
};

const SessionContext = React.createContext({
  session: null,
  sessionUser: null,
  refreshSession: () => Promise.resolve(),
} as SessionProps);

export default SessionContext;
