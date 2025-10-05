import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  refreshToken
} from '../../utils/burger-api';
import { TUser } from '../../utils/types';

type UserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const register = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name: string }) => {
    const res = await registerUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    document.cookie = `accessToken=${res.accessToken}`;
    return res.user;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    document.cookie = `accessToken=${res.accessToken}`;
    return res.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: { name?: string; email?: string; password?: string }) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  document.cookie = 'accessToken=; Max-Age=0';
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка регистрации';
      });
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error = action.error.message || 'Ошибка входа';
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.error =
          action.error.message || 'Не удалось получить данные пользователя';
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка обновления данных';
      });
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка выхода';
      });
  }
});

export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;
