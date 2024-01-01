import { atom } from 'recoil';

const initialState = {
  authenticated: false,
  user: null,
};

const AUTH_STATE = atom({
  key: 'AUTH_STATE',
  default: initialState,
});

export default AUTH_STATE;
