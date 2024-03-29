import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { refreshToken, register } from '../../../api/AuthApi';
import Loading from '../../../common/components/Loading';
import { storeAccessToken } from '../../../constants';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import { setCurrentUser } from '../../../features/authSlice';
import { useDispatch } from 'react-redux';

export default function Register(props) {
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useDispatch()
    const [state, setState] = useState({ name: '', email: '', password: '', confirm_password: '' });
    const [errors, setErrors] = useState({ name: '', email: '', password: '', confirm_password: '' });
    const [loading, setLoading] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await register({...state, role: 'customer'}, setErrors)

        if (data.status === 200) {
            toast.success(data.message)
            navigate('/login')
        }
        else if (data.status) {
            toast.error(data.error)
        }
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }
    
    useEffect(() => {
        if (jsCookie.get('accessToken')) {
            navigate(-1)
        }
        else if (!jsCookie.get('accessToken') && jsCookie.get('refreshToken')) {
            refreshToken()
                .then(res => {
                    if (res.status == 200) {
                        dispatch(setCurrentUser(res.data.loggedInUser))
                        storeAccessToken(res.data.accessToken)
                        toast.success(res.message)
                        
                        if (location.pathname === "/register")
                            navigate('/')
                        navigate(-1)
                    }
                    else if(res.status) {
                        toast.error(res.error)
                        setLoading(false);
                    }
                })
        }
        else {
            setLoading(false);
        }
    }, [])

    if (loading)
        return <Loading />
    else
        return (
            <div className="d-flex align-items-center justify-content-center">
                <div className="row">
                    <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <h4 className="card-title text-white text-center mt-2">Register</h4>
                            </div>
                            <div className="card-body">
                                <form action="/" onSubmit={handleSubmit}>
                                    <div className="row g-2">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input className="form-control" type="text" name="name" onChange={handleChange} value={state.name} />
                                                <span className="text-danger">{errors.name}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <input className="form-control" type="text" name="email" onChange={handleChange} value={state.email} />
                                                <span className="text-danger">{errors.email}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="password">Password</label>
                                                <input className="form-control" type="password" name="password" onChange={handleChange} value={state.password} />
                                                <span className="text-danger">{errors.password}</span>
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
                                            <button className="w-100 btn btn-primary">Register</button>
                                        </div>
                                        <span className="text-center">Already have an account? <Link className="text-center text-decoration-none" to={'/login'}>Login</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}