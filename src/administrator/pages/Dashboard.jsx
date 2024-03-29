import jsCookie from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../common/components/Loading';

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!jsCookie.get('accessToken')) {
            navigate('/administrator/login')
        }
        setLoading(false);
    }, [])

    if (loading)
        return <Loading />
    else
        return (
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-body">
                        Dashboard
                    </div>
                </div>
            </div>
        )
}

export default Dashboard