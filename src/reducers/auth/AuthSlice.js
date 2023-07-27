import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserByToken, signup, login } from '../../api/Auth';

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async (userData, thunkAPI) => {
        try {
            const response = await signup(userData);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                return { ...response.data, username: userData.name, email: userData.email };
            } else {
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async (userData, thunkAPI) => {
        try {
            const response = await login(userData);
            if (response.status === 200) {
                localStorage.setItem('token', response.token);
                return response.data;
            } else {
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchUser = createAsyncThunk(
    'users/fetchUserByToken',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return thunkAPI.rejectWithValue('No token');
            }
            const response = await fetchUserByToken(token);
            if (response.status === 200) {
                return { ...response.data };
            } else {
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        email: '',
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state, { payload }) => {
                state.isFetching = false;
                state.isSuccess = true;
                state.email = payload.user.email;
                state.username = payload.user.name;
            })
            .addCase(signupUser.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(signupUser.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload?.detail;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.email = payload.email;
                state.username = payload.name;
                state.isFetching = false;
                state.isSuccess = true;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload?.detail;
            })
            .addCase(loginUser.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchUser.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchUser.fulfilled, (state, { payload }) => {
                state.isFetching = false;
                state.isSuccess = true;
                state.email = payload.email;
                state.username = payload.username;
                state.sender = payload.id
            })
            .addCase(fetchUser.rejected, (state) => {
                state.isFetching = false;
                state.isError = true;
            });
    },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;