import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import gamesReducer from '../features/games/gamesSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    games: gamesReducer,
    reviews: reviewsReducer,
  },
});
