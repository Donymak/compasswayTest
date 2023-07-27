import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmails as fetchEmailsAPI, createEmail as createEmailAPI } from '../../api/Emails';

export const fetchEmails = createAsyncThunk(
    'emails/fetchEmails',
    async ({ limit, offset }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetchEmailsAPI(token, limit, offset);
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const createEmail = createAsyncThunk(
    'emails/createEmail',
    async ({ emailData }, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')
            const response = await createEmailAPI(token, emailData);
            if (response.status === 201) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue(response.data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const emailSlice = createSlice({
    name: 'emails',
    initialState: {
        emails: [],
        count: 0,
        next: null,
        previous: null,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        resetEmailsState: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmails.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(fetchEmails.fulfilled, (state, { payload }) => {
                state.isFetching = false;
                state.isSuccess = true;
                state.emails = payload.results;
                state.count = payload.count;
                state.next = payload.next;
                state.previous = payload.previous;
            })
            .addCase(fetchEmails.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload;
            })
            .addCase(createEmail.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(createEmail.fulfilled, (state, { payload }) => {
                state.isFetching = false;
                state.isSuccess = true;
            })
            .addCase(createEmail.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload.detail;
            });
    },
});

export const { resetEmailsState } = emailSlice.actions;

export const emailsSelector = (state) => state.emails;