import React, { useEffect, useState } from 'react'
import { changePassword } from '../../../api/AuthApi';
import Loading from '../../../common/components/Loading';
import { toast } from 'react-toastify';
import jsCookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const ChangePassword = (props) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({ old_password: '', new_password: '', confirm_password: '' });
    const [errors, setErrors] = useState({ old_password: '', new_password: '', confirm_password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const res = await changePassword(state, setErrors)

        if (res.status === 200) {
            toast.success(res.message)
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setState({ old_password: '', new_password: '', confirm_password: '' })
        setLoading(false)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        setLoading(true);

        if (!jsCookie.get('accessToken')) {
            return navigate('/administrator/login');
        }

        setLoading(false);
    }, [])

    if (loading)
        return <Loading />
    else
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <h4 className="card-title text-white text-center mt-2">Reset Password</h4>
                            </div>
                            <div className="card-body">
                                <form action="/" onSubmit={handleSubmit}>
                                    <div className="row g-2">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="old_password">Old Password</label>
                                                <input className="form-control" type="password" name="old_password" onChange={handleChange} value={state.old_password} />
                                                <span className="text-danger">{errors.old_password}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="new_password">New Password</label>
                                                <input className="form-control" type="password" name="new_password" onChange={handleChange} value={state.new_password} />
                                                <span className="text-danger">{errors.new_password}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="confirm_password">Confirm Password</label>
                                                <input className="form-control" type="password" name="confirm_password" onChange={handleChange} value={state.confirm_password} />
                                                <span className="text-danger">{errors.confirm_password}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="w-100 btn btn-primary">Reset Password</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default ChangePassword