import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  gameReviews: [],
  myReviews: [],
  selectedReview: null,
  loading: false,
  error: null,
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setGameReviews(state, action) {
      state.gameReviews = action.payload;
    },
    setMyReviews(state, action) {
      state.myReviews = action.payload;
    },
    setSelectedReview(state, action) {
      state.selectedReview = action.payload;
    },
    clearReviewsError(state) {
      state.error = null;
    },
  },
});

export const {
  setGameReviews,
  setMyReviews,
  setSelectedReview,
  clearReviewsError,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
