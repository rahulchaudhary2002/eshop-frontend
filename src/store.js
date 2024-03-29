import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import categorySlice from './features/categorySlice';
import userSlice from './features/userSlice';
import productSlice from './features/productSlice';
import cartSlice from './features/cartSlice';
import orderSlice from './features/orderSlice';

export default configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        category: categorySlice,
        product: productSlice,
        cart: cartSlice,
        order: orderSlice
    }
});
