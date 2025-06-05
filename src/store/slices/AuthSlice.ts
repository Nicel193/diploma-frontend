import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postSignup } from "../../services/api/postSignup";

import type { PayloadAction } from '@reduxjs/toolkit';
import type { Credential } from "../../models/Credential";

const initialState: Credential = {
    accessToken: null,
    refreshToken: null,
};

const signup = createAsyncThunk<Credential, { name: string; email: string; address: string }>(
    'auth/signup',
    async ({ name, email, address }) => {
        const data = await postSignup(name, email, address);
        console.log(data);
        return data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signup.fulfilled, (state, action: PayloadAction<Credential>) => {
            return action.payload;
        });
    },
});

export { signup };
export default authSlice.reducer;