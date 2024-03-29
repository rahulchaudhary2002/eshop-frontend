import React, { useRef, useState } from 'react'
import { updateCategory } from '../../../api/CategoryApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories, setCategory } from '../../../features/categorySlice';

const EditCategory = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.category)
    const [disable, setDisable] = useState(false)
    const [file, setFile] = useState('')
    const [errors, setErrors] = useState({ name: '', file: '' })
    const fileInputRef = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisable(true)

        const res = await updateCategory({ id: selector.category?._id, name: selector.category?.name, old_file: selector.category?.image, file }, setErrors)

        if (res.status === 200) {
            toast.success(res.message)
            const updatedCategories = selector.categories.map(category =>
                category._id === res.data.category._id ? { ...category, ...res.data.category } : category
            );
            dispatch(setCategories(updatedCategories))
            setErrors({ name: '', file: '' })
            fileInputRef.current.value = '';
            setFile('');
            document.getElementById('close-update-model').click()
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setDisable(false)
    }

    const handleChange = (e) => {
        dispatch(setCategory({ ...selector.category, [e.target.name]: e.target.value }));
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <>
            <div className="modal fade" id="update-category-model">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Update Category</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='close-update-model'></button>
                        </div>

                        <div className="modal-body">
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input className='form-control' type="text" name='name' id='name' value={selector.category?.name} onChange={handleChange} />
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

export default EditCategory