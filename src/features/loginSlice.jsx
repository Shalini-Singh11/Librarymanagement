import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../services/ApiServices';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post('api/auth/login/', credentials);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Invalid email or password.');
      }
      else{
      // localStorage.setItem('Token', data.token);
      // data.is_admin ? localStorage.setItem("IsAdmin", "admin") : localStorage.setItem("IsAdmin", "user");
      // localStorage.setItem("IsAdmin", data.is_admin);

      localStorage.setItem('Token', data.token);
const role = data.is_admin ? "admin" : "user"; 
localStorage.setItem("IsAdmin", role);
localStorage.setItem("userid", data.id);

      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong.');
    }
  }
);

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('Token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('Token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
