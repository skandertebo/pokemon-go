import User from './User';

export interface Entity {
  id: number;
}
export type useAuthOptions = {
  renderId: string;
  clientId: string;
  scope?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (response: any) => void;
};
export enum AuthenticationStates {
  NOT_LOGGED_IN,
  VERIFYING_AUTH,
  AUTHORIZED,
  ADMIN
}

export type UseLoginReturnType = {
  authentication: AuthenticationStates;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
};

export type AuthContextType = UseLoginReturnType;

export type Notification = {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
};
