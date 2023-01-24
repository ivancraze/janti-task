import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import RouteDataService from '../../services/api/routeService';

import { IAppState } from '@app/types';

export const getRoutes = createAsyncThunk(
  'routes/getRoutes',
  async function (_, { rejectWithValue }) {
    try {
      return await RouteDataService.getRoutes();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getRouteData = createAsyncThunk(
  'route/getRouteData',
  async function (id: number, { rejectWithValue }) {
    try {
      return await RouteDataService.getRouteData(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState: IAppState = {
  isLoading: false,
  error: null,
  routes: [],
  activeRoute: null,
  activeRouteData: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedRoute: (state, action) => {
      state.activeRoute = action.payload;
    },
    clearSelectedRoute: (state) => {
      state.activeRoute = null;
      state.activeRouteData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoutes.pending, (state: IAppState) => {
      state.isLoading = true;
    });
    builder.addCase(getRoutes.fulfilled, (state: IAppState, action) => {
      state.isLoading = false;
      state.routes = action.payload.data;
    });
    builder.addCase(getRoutes.rejected, (state: IAppState, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(getRouteData.pending, (state: IAppState) => {
      state.isLoading = true;
    });
    builder.addCase(getRouteData.fulfilled, (state: IAppState, action) => {
      state.isLoading = false;
      state.activeRouteData = action.payload.data;
    });
    builder.addCase(getRouteData.rejected, (state: IAppState, action) => {
      state.isLoading = false;
      state.activeRouteData = [];
      state.error = action.error;
    });
  },
});

export const { setSelectedRoute, clearSelectedRoute } = appSlice.actions;

export default appSlice.reducer;
