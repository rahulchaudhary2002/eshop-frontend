import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verify } from '../../../api/AuthApi';
import { toast } from 'react-toastify';
import Loading from '../../../common/components/Loading';

const Verify = () => {
    const navigate = useNavigate();
    let { token } = useParams();

    const handleSubmit = async () => {
        const res = await verify(token);

        if (res.status === 200) {
            toast.success(res.message);
        } else if (res.status) {
            toast.error(res.error);
        }
        return navigate('/administrator');
    };

    useEffect(() => {
        handleSubmit();
    }, []);

    return <Loading />
};

export default Verify;
