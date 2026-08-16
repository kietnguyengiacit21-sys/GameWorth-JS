import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {
  createReview,
  deleteReview,
  getCommunityRating,
  getGameReviews,
  getMyReviews,
  getReviewById,
  updateReview,
} from '../../services/reviewApi';


const initialState = {
  gameReviews: [],
  myReviews: [],
  selectedReview: null,
  communitySummary: null,

  loading: false,
  saving: false,
  deleting: false,

  error: null,
};


function getErrorMessage(error, defaultMessage) {
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}


function getToken(thunkApi) {
  const state = thunkApi.getState();
  return state.auth.token;
}

export const fetchGameReviews = createAsyncThunk(
  'reviews/fetchGameReviews',
  async function (gameId, thunkApi) {
    try {
      const reviews = await getGameReviews(gameId);
      return reviews;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load game reviews');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchCommunityRating = createAsyncThunk(
  'reviews/fetchCommunityRating',
  async function (gameId, thunkApi) {
    try {
      const summary = await getCommunityRating(gameId);
      return summary;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load community rating');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchReviewDetail = createAsyncThunk(
  'reviews/fetchReviewDetail',
  async function (reviewId, thunkApi) {
    try {
      const review = await getReviewById(reviewId);
      return review;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load review detail');
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const fetchMyReviews = createAsyncThunk(
  'reviews/fetchMyReviews',
  async function (unusedValue, thunkApi) {
    try {
      const token = getToken(thunkApi);

      if (token == null || token === '') {
        return thunkApi.rejectWithValue('Please log in first');
      }

      const reviews = await getMyReviews(token);

      return reviews;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load your reviews');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const submitReview = createAsyncThunk(
  'reviews/submitReview',
  async function (data, thunkApi) {
    try {
      const token = getToken(thunkApi);

      if (token == null || token === '') {
        return thunkApi.rejectWithValue('Please log in first');
      }

      const request = {
        rating: data.rating,
        verdict: data.verdict,
        comment: data.comment,
      };

      const review = await createReview(data.gameId, request, token);

      return review;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot create review');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const saveReview = createAsyncThunk(
  'reviews/saveReview',
  async function (data, thunkApi) {
    try {
      const token = getToken(thunkApi);

      if (token == null || token === '') {
        return thunkApi.rejectWithValue('Please log in first');
      }

      const request = {
        rating: data.rating,
        verdict: data.verdict,
        comment: data.comment,
      };

      const review = await updateReview(data.reviewId, request, token);

      return review;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot update review');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const removeReview = createAsyncThunk(
  'reviews/removeReview',
  async function (reviewId, thunkApi) {
    try {
      const token = getToken(thunkApi);

      if (token == null || token === '') {
        return thunkApi.rejectWithValue('Please log in first');
      }

      await deleteReview(reviewId, token);

      return reviewId;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot delete review');
      return thunkApi.rejectWithValue(message);
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: initialState,

  reducers: {
    clearSelectedReview: function (state) {
      state.selectedReview = null;
    },

    clearReviewsError: function (state) {
      state.error = null;
    },

    clearCommunitySummary: function (state) {
      state.communitySummary = null;
    },
  },

  extraReducers: function (builder) {

    builder.addCase(fetchGameReviews.pending, function (state) {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchGameReviews.fulfilled, function (state, action) {
      state.loading = false;
      state.gameReviews = action.payload;
    });

    builder.addCase(fetchGameReviews.rejected, function (state, action) {
      state.loading = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot load game reviews';
      }
    });

    builder.addCase(fetchCommunityRating.pending, function (state) {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchCommunityRating.fulfilled, function (state, action) {
      state.loading = false;
      state.communitySummary = action.payload;
    });

    builder.addCase(fetchCommunityRating.rejected, function (state, action) {
      state.loading = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot load community rating';
      }
    });

    builder.addCase(fetchReviewDetail.pending, function (state) {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchReviewDetail.fulfilled, function (state, action) {
      state.loading = false;
      state.selectedReview = action.payload;
    });

    builder.addCase(fetchReviewDetail.rejected, function (state, action) {
      state.loading = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot load review detail';
      }
    });

    builder.addCase(fetchMyReviews.pending, function (state) {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchMyReviews.fulfilled, function (state, action) {
      state.loading = false;
      state.myReviews = action.payload;
    });

    builder.addCase(fetchMyReviews.rejected, function (state, action) {
      state.loading = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot load your reviews';
      }
    });

    builder.addCase(submitReview.pending, function (state) {
      state.saving = true;
      state.error = null;
    });

    builder.addCase(submitReview.fulfilled, function (state, action) {
      state.saving = false;

      const newReview = action.payload;

      state.selectedReview = newReview;
      state.myReviews.unshift(newReview);
      state.gameReviews.unshift(newReview);
    });

    builder.addCase(submitReview.rejected, function (state, action) {
      state.saving = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot create review';
      }
    });


    builder.addCase(saveReview.pending, function (state) {
      state.saving = true;
      state.error = null;
    });

    builder.addCase(saveReview.fulfilled, function (state, action) {
      state.saving = false;

      const updatedReview = action.payload;

      state.selectedReview = updatedReview;

      for (let i = 0; i < state.myReviews.length; i++) {
        if (state.myReviews[i].id === updatedReview.id) {
          state.myReviews[i] = updatedReview;
          break;
        }
      }

      for (let i = 0; i < state.gameReviews.length; i++) {
        if (state.gameReviews[i].id === updatedReview.id) {
          state.gameReviews[i] = updatedReview;
          break;
        }
      }
    });

    builder.addCase(saveReview.rejected, function (state, action) {
      state.saving = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot update review';
      }
    });


    builder.addCase(removeReview.pending, function (state) {
      state.deleting = true;
      state.error = null;
    });

    builder.addCase(removeReview.fulfilled, function (state, action) {
      state.deleting = false;

      const reviewId = action.payload;

      for (let i = state.myReviews.length - 1; i >= 0; i--) {
        if (state.myReviews[i].id === reviewId) {
          state.myReviews.splice(i, 1);
        }
      }

      for (let i = state.gameReviews.length - 1; i >= 0; i--) {
        if (state.gameReviews[i].id === reviewId) {
          state.gameReviews.splice(i, 1);
        }
      }

      if (state.selectedReview != null && state.selectedReview.id === reviewId) {
        state.selectedReview = null;
      }
    });

    builder.addCase(removeReview.rejected, function (state, action) {
      state.deleting = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot delete review';
      }
    });
  },
});


export const {
  clearSelectedReview,
  clearReviewsError,
  clearCommunitySummary,
} = reviewsSlice.actions;


export default reviewsSlice.reducer;