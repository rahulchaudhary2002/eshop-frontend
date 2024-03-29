import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../../api/AuthApi';
import { toast } from 'react-toastify';
import Loading from '../../../common/components/Loading';

export default function ForgetPassword(props) {
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({ email: '' });
    const [errors, setErrors] = useState({ email: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true)
        const res = await forgotPassword(state, setErrors)

        if (res.status === 200) {
            toast.success(res.message)
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
        setLoading(false);
    }, [])

    if (loading)
        return <Loading />
    else
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ 'minHeight': '100vh' }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-header bg-primary">
                                <h4 className="card-title text-white text-center mt-2">Forgot Password</h4>
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
                                            <button className="w-100 btn btn-md btn-primary">Send Reset Link</button>
                                        </div>
                                        <span className="text-center">Don't have an account yet? <Link className="text-center text-decoration-none" to={'/administrator/register'}>Register now</Link></span>
                                        <span className="text-center">Have password? <Link className="text-center text-decoration-none" to={'/administrator/login'}>Login</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}