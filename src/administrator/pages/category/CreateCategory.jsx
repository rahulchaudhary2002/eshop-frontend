import React, { useRef, useState } from 'react'
import { createCategory } from '../../../api/CategoryApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../../features/categorySlice';

const CreateCategory = () => {
    const dispath = useDispatch()
    const selector = useSelector(state => state.category)
    const [disable, setDisable] = useState(false)
    const [state, setState] = useState({ name: '', file: '' })
    const [errors, setErrors] = useState({ name: '', file: '' })
    const fileInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisable(true)

        const res = await createCategory(state, setErrors)

        if (res.status === 200) {
            dispath(setCategories([res.data.category, ...selector.categories]))
            toast.success(res.message)
            setState({ name: '', file: '' })
            setErrors({ name: '', file: '' })
            fileInputRef.current.value = null;
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

    const handleFileChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.files[0] });
    }

    return (
        <>
            <div className="modal fade" id="create-category-model">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Create Category</h4>
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
                                            <label htmlFor="file">Image</label>
                                            <input className='form-control' type="file" name='file' id='file' onChange={handleFileChange} ref={fileInputRef} />
                                            <span className="text-danger">{errors.file}</span>
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

export default CreateCategory