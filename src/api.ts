import { NewUser, User, Session } from '@reliquaryhq/types';
import { getJson, handleError } from './util/http';

const API_URL = `http://local.reliquaryhq.com:3000`;

const DEFAULT_OPTIONS: RequestInit = {
  credentials: 'include',
};

const session = {
  createSession: (name: string, password: string): Promise<Session> =>
    fetch(`${API_URL}/session`, {
      ...DEFAULT_OPTIONS,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    })
      .then(handleError)
      .then(getJson),

  deleteSession: (): Promise<void> =>
    fetch(`${API_URL}/session`, {
      ...DEFAULT_OPTIONS,
      method: 'DELETE',
    })
      .then(handleError)
      .then(getJson),

  getSession: (): Promise<Session> =>
    fetch(`${API_URL}/session`, DEFAULT_OPTIONS)
      .then(handleError)
      .then(getJson),
};

const user = {
  createUser: (newUser: NewUser): Promise<User> =>
    fetch(`${API_URL}/user`, {
      ...DEFAULT_OPTIONS,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })
      .then(handleError)
      .then(getJson),

  getUser: (userId: number): Promise<User> =>
    fetch(`${API_URL}/user/${userId}`, DEFAULT_OPTIONS)
      .then(handleError)
      .then(getJson),
};

export default {
  session,
  user,
};
