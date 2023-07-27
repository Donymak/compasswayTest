import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from "../reducers/auth/AuthSlice";
import {emailSlice} from "../reducers/emails/EmailsSlice";

export default configureStore({
    reducer: {
        user: userSlice.reducer,
        emails: emailSlice.reducer,
    },
});