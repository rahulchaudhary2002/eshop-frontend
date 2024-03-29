import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkRestPasswordToken, resetPassword } from '../../../api/AuthApi';
import Loading from '../../../common/components/Loading';
import { toast } from 'react-toastify';

const ResetPassword = (props) => {
    const navigate = useNavigate();
    let { token } = useParams();
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({ email: '', password: '', confirm_password: '' });
    const [errors, setErrors] = useState({ email: '', password: '', confirm_password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        const res = await resetPassword(state, setErrors, token)

        if (res.status === 200) {
            toast.success(res.message)
            navigate('/administrator/login')
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
        const check = async () => {
            const res = await checkRestPasswordToken(token)
            if (res.status === 200) {
                setState({...state, email: res.data.user.email})
                setLoading(false);
            }
            else if (res.status) {
                toast.error(res.error)
                return navigate('/administrator/login')
            }
        }

        check()
    }, [])

    if (loading)
        return <Loading />
    else
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ 'minHeight': '100vh' }}>
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
                                                <label htmlFor="email">Email</label>
                                                <input className="form-control" type="text" name="email" value={state.email} readOnly disabled />
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
                                            <button className="w-100 btn btn-primary">Reset Password</button>
                                        </div>
                                        <span className="text-center">Already have an account? <Link className="text-center text-decoration-none" to={'/administrator/login'}>Login</Link></span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default ResetPassword