import React, { useRef, useState } from 'react'
import { createUser } from '../../../api/UserApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../../../features/userSlice';

const CreateUser = () => {
    const dispath = useDispatch()
    const selector = useSelector(state => state.user)
    const [disable, setDisable] = useState(false)
    const [state, setState] = useState({ name: '', email: '', role: '', isActive: false })
    const [errors, setErrors] = useState({ name: '', email: '', role: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisable(true)

        const res = await createUser(state, setErrors)

        if (res.status === 200) {
            dispath(setUsers([res.data.user, ...selector.users]))
            toast.success(res.message)
            setState({ name: '', email: '', role: '', status: false })
            setErrors({ name: '', email: '', role: '' })
            document.getElementById('close-create-model').click()
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setDisable(false)
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleCheckboxChange = (e) => {
        setState({ ...state, isActive: e.target.checked });
    }

    return (
        <>
            <div className="modal fade" id="create-user-model">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Create User</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='close-create-model'></button>
                        </div>

                        <div className="modal-body">
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input className='form-control' type="text" name='name' id='name' value={state.name} onChange={handleChange} />
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className='form-control' type="text" name='email' id='email' value={state.email} onChange={handleChange} />
                                            <span className="text-danger">{errors.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="role">Role</label>
                                            <select className='form-control' name="role" id="role" onChange={handleChange}>
                                                <option value="">Select role</option>
                                                <option value="customer">Customer</option>
                                                <option value="vendor">Vendor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                            <span className="text-danger">{errors.role}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-check mt-2">
                                            <input className="form-check-input" type="checkbox" id="status" onChange={handleCheckboxChange} />
                                            <label className="form-check-label" htmlFor="status">
                                                Is Active
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <button className='btn btn-md btn-primary mt-2' disabled={disable}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateUser