import React, { useRef, useState } from 'react'
import { updateProduct } from '../../../api/ProductApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setProduct } from '../../../features/productSlice';

const EditProduct = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.product)
    const categorySelector = useSelector(state => state.category)
    const [disable, setDisable] = useState(false)
    const [file, setFile] = useState('')
    const [errors, setErrors] = useState({ name: '', brand: '', category: '', description: '', price: '', file: '' })
    const fileInputRef = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisable(true)

        const res = await updateProduct({ ...selector.product, file }, setErrors)

        if (res.status === 200) {
            toast.success(res.message)
            const updatedProducts = selector.products.map(product =>
                product._id === res.data.product._id ? { ...product, ...res.data.product } : product
            );
            dispatch(setProducts(updatedProducts))
            setErrors({ name: '', brand: '', category: '', description: '', price: '', file: '' })
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
        dispatch(setProduct({ ...selector.product, [e.target.name]: e.target.value }));
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <>
            <div className="modal fade" id="update-product-model">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Update Product</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='close-update-model'></button>
                        </div>

                        <div className="modal-body">
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input className='form-control' type="text" name='name' id='name' value={selector.product?.name} onChange={handleChange} />
                                            <span className="text-danger">{errors.name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="category">Category</label>
                                            <select className='form-control' name="category" id="category" value={selector.product.category} onChange={handleChange}>
                                                <option value="">Select category</option>
                                                {categorySelector.categories.length > 0 && categorySelector.categories.map(category => (
                                                    <option value={category._id} key={category._id}>{category.name}</option>
                                                ))}
                                            </select>
                                            <span className="text-danger">{errors.category}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="brand">Brand</label>
                                            <input className='form-control' type="text" name='brand' id='brand' value={selector.product?.brand} onChange={handleChange} />
                                            <span className="text-danger">{errors.brand}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="price">Price</label>
                                            <input className='form-control' type="text" name='price' id='price' value={selector.product?.price} onChange={handleChange} />
                                            <span className="text-danger">{errors.price}</span>
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
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <textarea className='form-control' name='description' id='description' onChange={handleChange} value={selector.product?.description}></textarea>
                                            <span className="text-danger">{errors.description}</span>
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

export default EditProduct