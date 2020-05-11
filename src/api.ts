import { NewUser, User, Session } from '@reliquaryhq/types';

const API_URL = `http://local.reliquaryhq.com:3000`;

const DEFAULT_OPTIONS: RequestInit = {
  credentials: 'include',
};

const session = {
  createSession: async (name: string, password: string): Promise<Session> =>
    (
      await fetch(`${API_URL}/session`, {
        ...DEFAULT_OPTIONS,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      })
    ).json(),

  deleteSession: async (): Promise<void> =>
    (
      await fetch(`${API_URL}/session`, {
        ...DEFAULT_OPTIONS,
        method: 'DELETE',
      })
    ).json(),

  getSession: async (): Promise<Session> =>
    (await fetch(`${API_URL}/session`, DEFAULT_OPTIONS)).json(),
};

const user = {
  createUser: async (newUser: NewUser): Promise<User> =>
    (
      await fetch(`${API_URL}/user`, {
        ...DEFAULT_OPTIONS,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
    ).json(),

  getUser: async (userId: number): Promise<User> =>
    (await fetch(`${API_URL}/user/${userId}`, DEFAULT_OPTIONS)).json(),
};

export default {
  session,
  user,
};
