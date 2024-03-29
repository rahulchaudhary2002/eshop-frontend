import React, { useEffect, useState } from 'react'
import Loading from '../../common/components/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { findProductById } from '../../api/ProductApi';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../../features/productSlice';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { createCart } from '../../api/CartApi'
import { setCarts } from '../../features/cartSlice';
import jsCookie from 'js-cookie'

const ProductDetail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.product)
    const cartSelector = useSelector(state => state.cart)
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)

    const handleChange = (e) => {
        if (e.target.value > 0)
            setQuantity(e.target.value);
    }
    
    const increment = () => {
        setQuantity(parseInt(quantity + 1));
    }

    const decrement = () => {
        if (quantity - 1 > 0)
            setQuantity(parseInt(quantity - 1));
    }

    useEffect(() => {
        setLoading(true)

        findProductById(id)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setProduct(res.data.product))
                }
                else {
                    toast.error(res.error)
                    return navigate('/')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [dispatch])

    const addToCart = async () => {
        if (!jsCookie.get('accessToken'))
            return navigate('/login')

        createCart(selector.product._id, quantity)
            .then(res => {
                if (res.status == 200) {
                    dispatch(setCarts([...cartSelector.carts, res.data.cart]))
                    toast.success(res.message)
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    const buyNow = async () => {
        if (!jsCookie.get('accessToken'))
            return navigate('/login')

        createCart(selector.product._id, quantity)
            .then(res => {
                if (res.status == 200) {
                    dispatch(setCarts([...cartSelector.carts, res.data.cart]))
                    return navigate('/cart')
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    if (loading)
        return <Loading />
    else
        return (
            <div className="container">
                <div className="row gap-2">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img className='w-100' src={`${API_URL}/${selector.product.image}`} alt="Product Image" height={300} />
                                    </div>
                                    <div className="col-md-8">
                                        <h4>{selector.product.name}</h4>
                                        Brand: <a href="#" className="text-primary text-decoration-none">{selector.product.brand}</a>
                                        <div className="mt-4">
                                            <strong className="text-primary h3">Rs. {selector.product.price}</strong><br />
                                            {/* <small className="text-gray"><del>Rs. 4000</del></small> <small>-50%</small> */}
                                        </div>
                                        <div className="input-group mt-4 w-50">
                                            <label className="input-group-text w-25">Quantity</label>
                                            <button className="btn btn-secondary w-25" type="button" onClick={decrement}><span className="fa fa-minus"></span></button>
                                            <input type="text" className="form-control text-center w-25" name="quantity" value={quantity} onChange={handleChange} />
                                            <button className="btn btn-secondary w-25" type="button" onClick={increment}><span className="fa fa-plus"></span></button>
                                        </div>
                                        <div className="mt-4 d-flex gap-2">
                                            <button type="button" className="btn btn-md btn-primary buy-now w-25" onClick={ buyNow }>Buy Now</button>
                                            <button type="button" className="btn btn-md btn-warning w-25" onClick={ addToCart }>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {selector.product.description &&
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <strong className="text-dark">Product detail of {selector.product.name}</strong>
                                </div>
                                <div className="card-body">
                                    {selector.product.description}
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
}

export default ProductDetail