import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        totalRecords: 0,
        page: 1,
        perPage: 10,
        category: {
            name: '',
            image: ''
        },
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
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
        
        setCategory: (state, action) => {
            state.category = action.payload;
        },
    }
});

export const { setCategories, setTotalRecords, setPage, setPerPage, setCategory } = categorySlice.actions;
export default categorySlice.reducer;
