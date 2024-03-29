import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { getCategories } from '../../../api/CategoryApi';
import { setCategories, setTotalRecords } from '../../../features/categorySlice';
import Loading from '../../../common/components/Loading';

const CategoryLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const selector = useSelector(state => state.category)
    const authUser = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (!jsCookie.get('accessToken') || authUser.user.role == 'customer') {
            return navigate('/administrator/login')
        }

        getCategories(selector.page, selector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setCategories(res.data.categories))
                    dispatch(setTotalRecords(res.data.totalRecords))
                    setLoading(false);
                }
            })
    }, [selector.page])

    if (loading)
        return <Loading />
    else
        return (
            <Outlet />
        )
}

export default CategoryLayout