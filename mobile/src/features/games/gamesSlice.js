import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {getGameById, getGames} from '../../services/gameApi';

const initialState = {
  items: [],
  selectedGame: null,
  listLoading: false,
  detailLoading: false,
  error: null,
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (_, thunkApi) => {
    try {
      return await getGames();
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error ? error.message : 'Cannot load games',
      );
    }
  },
);

export const fetchGameDetail = createAsyncThunk(
  'games/fetchGameDetail',
  async (gameId, thunkApi) => {
    try {
      return await getGameById(gameId);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Cannot load game detail',
      );
    }
  },
);

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    clearSelectedGame(state) {
      state.selectedGame = null;
    },
    replaceGame(state, action) {
      const index = state.items.findIndex(
        game => game.id === action.payload.id,
      );

      if (index >= 0) {
        state.items[index] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.listLoading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.listLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.listLoading = false;
        state.error = action.payload ?? 'Cannot load games';
      })
      .addCase(fetchGameDetail.pending, state => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchGameDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedGame = action.payload;
      })
      .addCase(fetchGameDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload ?? 'Cannot load game detail';
      });
  },
});

export const {clearSelectedGame, replaceGame} = gamesSlice.actions;

export default gamesSlice.reducer;
