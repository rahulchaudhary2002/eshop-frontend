import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {}
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
