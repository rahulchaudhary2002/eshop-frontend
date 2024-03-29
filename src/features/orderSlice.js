import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        totalRecords: 0,
        page: 1,
        perPage: 10,
        order: {
            status: ''
        }
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
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

        setOrder: (state, action) => {
            state.order = action.payload;
        },
    }
});

export const { setOrders, setTotalRecords, setPage, setPerPage, setOrder } = orderSlice.actions;
export default orderSlice.reducer;
