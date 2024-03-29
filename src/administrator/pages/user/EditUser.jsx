import React, { useRef, useState } from 'react'
import { updateUser } from '../../../api/UserApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setUser } from '../../../features/userSlice';

const EditUser = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.user)
    const [disable, setDisable] = useState(false)
    const [errors, setErrors] = useState({ name: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisable(true)

        const res = await updateUser(selector.user, setErrors)

        if (res.status === 200) {
            toast.success(res.message)
            const updatedUsers = selector.users.map(user =>
                user._id === res.data.user._id ? { ...user, ...res.data.user } : user
            );
            dispatch(setUsers(updatedUsers))
            setErrors({ name: '', role: '' })
            document.getElementById('close-update-model').click()
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setDisable(false)
    }

    const handleChange = (e) => {
        dispatch(setUser({ ...selector.user, [e.target.name]: e.target.value }));
    }

    const handleCheckboxChange = (e) => {
        dispatch(setUser({ ...selector.user, isActive: e.target.checked }));
    }

    return (
        <>
            <div className="modal fade" id="update-user-model">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Update User</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='close-update-model'></button>
                        </div>

                        <div className="modal-body">
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input className='form-control' type="text" name='name' id='name' value={selector.user?.name} onChange={handleChange} />
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input className='form-control' type="text" name='email' id='email' value={selector.user?.email} disabled readOnly />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="role">Role</label>
                                            <select className='form-control' name="role" id="role" onChange={handleChange} value={selector.user?.role}>
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
                                            <input className="form-check-input" type="checkbox" id="update-status" onChange={handleCheckboxChange} checked={selector.user?.isActive} />
                                            <label className="form-check-label" htmlFor="update-status">
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

export default EditUser