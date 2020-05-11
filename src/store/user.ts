import { NewUser, User } from '@reliquaryhq/types';
import {
  AppAction,
  AppThunkAction,
  addEntityById,
  removeEntityById,
} from './root';
import api from '../api';

const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

type UserState = {
  users: Record<string, User>;
};

type AddUserAction = {
  type: typeof ADD_USER;
  payload: {
    user: User;
  };
};

type RemoveUserAction = {
  type: typeof REMOVE_USER;
  payload: {
    user: User;
  };
};

type UserAction = AddUserAction | RemoveUserAction;

const initialState: UserState = {
  users: {},
};

const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload;

      return {
        ...state,
        users: addEntityById(state.users, user),
      };
    }

    case REMOVE_USER: {
      const { user } = action.payload;

      return {
        ...state,
        users: removeEntityById(state.users, user),
      };
    }

    default: {
      return state;
    }
  }
};

const addUser = (user: User): AppAction => ({
  type: ADD_USER,
  payload: { user },
});

const createUser = (newUser: NewUser): AppThunkAction<void> => async (
  dispatch
) => {
  const user = await api.user.createUser(newUser);

  dispatch(addUser(user));
};

const getUser = (userId: number): AppThunkAction<void> => async (dispatch) => {
  const user = await api.user.getUser(userId);

  dispatch(addUser(user));
};

export { addUser, createUser, getUser, userReducer };
