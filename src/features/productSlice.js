import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalRecords: 0,
        page: 1,
        perPage: 10,
        product: {
            name: '',
            brand: '',
            category: '',
            price: '',
            description: '',
            image: ''
        },
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
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
        
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    }
});

export const { setProducts, setTotalRecords, setPage, setPerPage, setProduct } = productSlice.actions;
export default productSlice.reducer;
