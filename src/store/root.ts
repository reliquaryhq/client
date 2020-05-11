import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { sessionReducer } from './session';
import { userReducer } from './user';

type AppAction = RootAction;

type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootAction
>;

const addEntityById = (
  entities: Record<string, { id?: string | number }>,
  entity: { id?: string | number }
) => {
  if (entity.id === undefined) {
    return entities;
  }

  return {
    ...entities,
    [entity.id]: entity,
  };
};

const removeEntityById = (
  entities: Record<string, { id?: string | number }>,
  entity: { id?: string | number }
) => {
  if (entity.id === undefined) {
    return entities;
  }

  const { [entity.id]: removedEntity, ...remainingEntities } = entities;
  return remainingEntities;
};

const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
});

type RootAction = Parameters<typeof rootReducer>[1];

type RootState = ReturnType<typeof rootReducer>;

export {
  RootState,
  AppAction,
  AppThunkAction,
  addEntityById,
  removeEntityById,
  rootReducer,
};
