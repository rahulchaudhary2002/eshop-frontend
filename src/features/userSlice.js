import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        totalRecords: 0,
        page: 1,
        perPage: 10,
        user: {
            name: '',
            email: '',
            role: '',
            isActive: false
        },
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        setTotalRecords: (state, action) => {
            state.totalRecords = action.payload;
        },
        
        setPage: (state, action) => {
            state.page = action.payload;
        },
        
        setPerPage: (state, action) => {
            state.perPage = action.payload;
        },
        
        setUser: (state, action) => {
            state.user = action.payload;
        },
    }
});

export const { setUsers, setTotalRecords, setPage, setPerPage, setUser } = userSlice.actions;
export default userSlice.reducer;
