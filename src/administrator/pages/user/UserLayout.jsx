import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import jsCookie from 'js-cookie';
import { getUsers } from '../../../api/UserApi';
import { setUsers, setTotalRecords } from '../../../features/userSlice';
import Loading from '../../../common/components/Loading';

const UserLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const selector = useSelector(state => state.user)
    const authUser = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        if (!jsCookie.get('accessToken') && authUser.user.role == 'admin') {
            return navigate('/administrator/login')
        }

        getUsers(selector.page, selector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setUsers(res.data.users))
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

export default UserLayout