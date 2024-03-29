import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, refreshToken } from '../../../api/AuthApi';
import Loading from '../../../common/components/Loading';
import { storeAccessToken, storeRefreshToken } from '../../../constants';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../features/authSlice';

export default function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    const [state, setState] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const res = await login(state, setErrors)

        if (res.status === 200) {
            storeAccessToken(res.data.accessToken)
            storeRefreshToken(res.data.refreshToken)
            dispatch(setCurrentUser(res.data.loggedInUser))
            toast.success(res.message)
            navigate(-1)
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setLoading(false)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (jsCookie.get('accessToken')) {
            return navigate('/')
        }
        else if (!jsCookie.get('accessToken') && jsCookie.get('refreshToken')) {
            refreshToken()
                .then(res => {
                    if (res.status == 200) {
                        dispatch(setCurrentUser(res.data.loggedInUser))
                        storeAccessToken(res.data.accessToken)
                        toast.success(res.message)

                        if (location.pathname === "/login")
                            navigate('/')
                        navigate(-1)
                    }
                    else if (res.status) {
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
                                <h4 className="card-title text-white text-center mt-2">Login</h4>
                            </div>
                            <div className="card-body">
                                <form action="/" onSubmit={handleSubmit}>
                                    <div className="row g-2">
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
                                            <Link className='float-end text-decoration-none' to={'/forget-password'}>Forgot your password?</Link>
                                        </div>
                                        <div className="col-md-12">
                                            <button className="w-100 btn btn-md btn-primary">Login</button>
                                        </div>
                                        <span className="text-center">Don't have an account yet? <Link className="text-center text-decoration-none" to={'/register'}>Register now</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}