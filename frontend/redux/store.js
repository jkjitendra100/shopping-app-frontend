import { configureStore } from '@reduxjs/toolkit';
import { playerReducer } from './reducer/playerReducer';
import { userReducer } from './reducer/userReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    player: playerReducer,
  },
});
