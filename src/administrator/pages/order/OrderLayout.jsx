import React, { useEffect, useState } from 'react'
import Loading from '../../../common/components/Loading'
import { Outlet } from 'react-router-dom'
import jsCookie from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setTotalRecords } from '../../../features/orderSlice';
import { getOrders } from '../../../api/OrderApi';

const OrderLayout = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.order)
    const authUser = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        if (!jsCookie.get('accessToken') || authUser.user.role === 'customer') {
            return navigate('/administrator/login');
        }

        getOrders(selector.page, selector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setOrders(res.data.orders));
                    dispatch(setTotalRecords(res.data.totalRecords));
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, [selector.page]);

    if (loading)
        return <Loading />
    else
        return (
            <Outlet />
        )
}

export default OrderLayout