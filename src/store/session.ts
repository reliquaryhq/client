import { Session } from '@reliquaryhq/types';
import api from '../api';
import { AppThunkAction } from './root';
import { getUser } from './user';

const CREATE_SESSION_PENDING = 'CREATE_SESSION_PENDING';
const CREATE_SESSION_SUCCEEDED = 'CREATE_SESSION_SUCCEEDED';
const CREATE_SESSION_FAILED = 'CREATE_SESSION_FAILED';
const DELETE_SESSION_PENDING = 'DELETE_SESSION_PENDING';
const DELETE_SESSION_SUCCEEDED = 'DELETE_SESSION_SUCCEEDED';
const DELETE_SESSION_FAILED = 'DELETE_SESSION_FAILED';
const GET_SESSION_PENDING = 'GET_SESSION_PENDING';
const GET_SESSION_SUCCEEDED = 'GET_SESSION_SUCCEEDED';
const GET_SESSION_FAILED = 'GET_SESSION_FAILED';

type SessionState = {
  isCreateSessionPending: boolean;
  isDeleteSessionPending: boolean;
  isGetSessionPending: boolean;
  session: Session | null;
};

type CreateSessionPendingAction = {
  type: typeof CREATE_SESSION_PENDING;
};

type CreateSessionSucceededAction = {
  type: typeof CREATE_SESSION_SUCCEEDED;
  payload: {
    session: Session;
  };
};

type CreateSessionFailedAction = {
  type: typeof CREATE_SESSION_FAILED;
};

type DeleteSessionPendingAction = {
  type: typeof DELETE_SESSION_PENDING;
};

type DeleteSessionSucceededAction = {
  type: typeof DELETE_SESSION_SUCCEEDED;
};

type DeleteSessionFailedAction = {
  type: typeof DELETE_SESSION_FAILED;
};

type GetSessionPendingAction = {
  type: typeof GET_SESSION_PENDING;
};

type GetSessionSucceededAction = {
  type: typeof GET_SESSION_SUCCEEDED;
  payload: {
    session: Session | null;
  };
};

type GetSessionFailedAction = {
  type: typeof GET_SESSION_FAILED;
};

type SessionAction =
  | CreateSessionPendingAction
  | CreateSessionSucceededAction
  | CreateSessionFailedAction
  | DeleteSessionPendingAction
  | DeleteSessionSucceededAction
  | DeleteSessionFailedAction
  | GetSessionPendingAction
  | GetSessionSucceededAction
  | GetSessionFailedAction;

const initialState: SessionState = {
  isCreateSessionPending: false,
  isDeleteSessionPending: false,
  isGetSessionPending: false,
  session: null,
};

const sessionReducer = (
  state = initialState,
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case CREATE_SESSION_PENDING: {
      return {
        ...state,
        isCreateSessionPending: true,
      };
    }

    case CREATE_SESSION_SUCCEEDED: {
      const { session } = action.payload;

      return {
        ...state,
        isCreateSessionPending: false,
        session,
      };
    }

    case CREATE_SESSION_FAILED: {
      return {
        ...state,
        isCreateSessionPending: false,
      };
    }

    case DELETE_SESSION_PENDING: {
      return {
        ...state,
        isDeleteSessionPending: true,
      };
    }

    case DELETE_SESSION_SUCCEEDED: {
      return {
        ...state,
        isDeleteSessionPending: false,
        session: null,
      };
    }

    case DELETE_SESSION_FAILED: {
      return {
        ...state,
        isDeleteSessionPending: false,
      };
    }

    case GET_SESSION_PENDING: {
      return {
        ...state,
        isGetSessionPending: true,
      };
    }

    case GET_SESSION_SUCCEEDED: {
      const { session } = action.payload;

      return {
        ...state,
        isGetSessionPending: false,
        session,
      };
    }

    case GET_SESSION_FAILED: {
      return {
        ...state,
        isGetSessionPending: false,
      };
    }

    default: {
      return state;
    }
  }
};

const createSession = (
  name: string,
  password: string
): AppThunkAction<void> => async (dispatch) => {
  dispatch({
    type: CREATE_SESSION_PENDING,
  });

  try {
    const session = await api.session.createSession(name, password);

    dispatch({ type: CREATE_SESSION_SUCCEEDED, payload: { session } });

    if (session.userId) {
      await dispatch(getUser(session.userId));
    }
  } catch (error) {
    dispatch({ type: CREATE_SESSION_FAILED });
  }
};

const deleteSession = (): AppThunkAction<void> => async (dispatch) => {
  dispatch({
    type: DELETE_SESSION_PENDING,
  });

  try {
    await api.session.deleteSession();

    dispatch({ type: DELETE_SESSION_SUCCEEDED });
  } catch (error) {
    dispatch({ type: DELETE_SESSION_FAILED });
  }
};

const getSession = (): AppThunkAction<void> => async (dispatch) => {
  dispatch({
    type: GET_SESSION_PENDING,
  });

  try {
    const session = await api.session.getSession();

    if (session.userId) {
      dispatch({ type: GET_SESSION_SUCCEEDED, payload: { session } });
      await dispatch(getUser(session.userId));
    } else {
      dispatch({ type: GET_SESSION_SUCCEEDED, payload: { session: null } });
    }
  } catch (error) {
    dispatch({ type: GET_SESSION_FAILED });
  }
};

export { createSession, deleteSession, getSession, sessionReducer };
