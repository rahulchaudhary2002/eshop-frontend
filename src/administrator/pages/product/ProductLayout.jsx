import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { getCategories } from '../../../api/CategoryApi';
import { getProducts } from '../../../api/ProductApi';
import { setCategories, setTotalRecords } from '../../../features/categorySlice';
import { setProducts, setTotalRecords as setTotalProductRecords } from '../../../features/productSlice';
import Loading from '../../../common/components/Loading';

const ProductLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const categorySelector = useSelector(state => state.category)
    const productSelector = useSelector(state => state.product)
    const authUser = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        if (!jsCookie.get('accessToken') || authUser.user.role === 'customer') {
            return navigate('/administrator/login');
        }

        Promise.all([
            getCategories(categorySelector.page, categorySelector.perPage),
            getProducts(productSelector.page, productSelector.perPage)
        ]).then(([categoriesRes, productsRes]) => {
            if (categoriesRes.status === 200) {
                dispatch(setCategories(categoriesRes.data.categories));
                dispatch(setTotalRecords(categoriesRes.data.totalRecords));
            }
            
            if (productsRes.status === 200) {
                dispatch(setProducts(productsRes.data.products));
                dispatch(setTotalProductRecords(productsRes.data.totalRecords));
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        }).finally(() => {
            setLoading(false);
        });
    }, [categorySelector.page, productSelector.page]);

    if (loading)
        return <Loading />
    else
        return (
            <Outlet />
        )
}

export default ProductLayout