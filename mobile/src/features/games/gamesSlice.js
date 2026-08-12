import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {getGameById, getGames, getGameMedia} from '../../services/gameApi';


const initialState = {
  items: [],
  selectedGame: null,
  mediaItems: [],
  listLoading: false,
  detailLoading: false,
  mediaLoading: false,
  error: null,
  mediaError: null,
};


function getErrorMessage(error, defaultMessage) {
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
}

export const fetchGames = createAsyncThunk('games/fetchGames',
  async function (unusedValue, thunkApi) {
    try {
      const games = await getGames();
      return games;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load games');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchGameDetail = createAsyncThunk('games/fetchGameDetail',
  async function (gameId, thunkApi) {
    try {
      const game = await getGameById(gameId);
      return game;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load game detail');
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const fetchGameMedia = createAsyncThunk('games/fetchGameMedia',
  async function (gameId, thunkApi) {
    try {
      const mediaList = await getGameMedia(gameId);
      return mediaList;
    } catch (error) {
      const message = getErrorMessage(error, 'Cannot load game media');
      return thunkApi.rejectWithValue(message);
    }
  }
);

const gamesSlice = createSlice({
  name: 'games',
  initialState: initialState,
  reducers: {
    clearSelectedGame: function (state) {
      state.selectedGame = null;
    },


    clearGameMedia: function (state) {
      state.mediaItems = [];
      state.mediaError = null;
    },

    replaceGame: function (state, action) {
      const newGame = action.payload;
      let foundIndex = -1;

      for (let i = 0; i < state.items.length; i++) {
        const currentGame = state.items[i];

        if (currentGame.id === newGame.id) {
          foundIndex = i;
          break;
        }
      }

      if (foundIndex >= 0) {
        state.items[foundIndex] = newGame;
      } else {
        state.items.push(newGame);
      }
    },
  },

  extraReducers: function (builder) {

    builder.addCase(fetchGames.pending, function (state) {
      state.listLoading = true;
      state.error = null;
    });


    builder.addCase(fetchGames.fulfilled, function (state, action) {
      state.listLoading = false;
      state.items = action.payload;
    });


    builder.addCase(fetchGames.rejected, function (state, action) {
      state.listLoading = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot load games';
      }
    });

    builder.addCase(fetchGameDetail.pending, function (state) {
      state.detailLoading = true;
      state.error = null;
    });


    builder.addCase(fetchGameDetail.fulfilled, function (state, action) {
      state.detailLoading = false;
      state.selectedGame = action.payload;
    });

    builder.addCase(fetchGameDetail.rejected, function (state, action) {
      state.detailLoading = false;

      if (action.payload != null) {
        state.error = action.payload;
      } else {
        state.error = 'Cannot load game detail';
      }
    });

    builder.addCase(fetchGameMedia.pending, function (state) {
      state.mediaLoading = true;
      state.mediaError = null;
      state.mediaItems = [];
    });

    builder.addCase(fetchGameMedia.fulfilled, function (state, action) {
      state.mediaLoading = false;
      state.mediaItems = action.payload;
    });

    builder.addCase(fetchGameMedia.rejected, function (state, action) {
      state.mediaLoading = false;

      if (action.payload != null) {
        state.mediaError = action.payload;
      } else {
        state.mediaError = 'Cannot load game media';
      }
    });
  },
});


export const {
  clearSelectedGame,
  clearGameMedia,
  replaceGame
} = gamesSlice.actions;


export default gamesSlice.reducer;