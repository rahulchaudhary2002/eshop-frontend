import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../common/components/Loading'
import { getCarts, removeCart, updateCart } from '../../api/CartApi'
import { setCarts } from '../../features/cartSlice'
import { API_URL } from '../../constants'
import { toast } from 'react-toastify'
import { createOrder } from '../../api/OrderApi'

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.cart)
    const authSelector = useSelector(state => state.auth)
    const [loading, setLoading] = useState(true)
    const [state, setState] = useState({ province: '', district: '', municipality: '', street: '', shippingFee: 0, discount: 0, subTotal: 0, total: 0 })
    const [errors, setErrors] = useState({ province: '', district: '', municipality: '', street: '' })

    useEffect(() => {
        if (!jsCookie.get('accessToken'))
            return navigate('/login')
        else
            getCarts()
                .then(res => {
                    if (res.status === 200)
                        dispatch(setCarts(res.data.carts))
                })
                .finally(() => {
                    setLoading(false)
                })
    }, [authSelector.user])

    const handleCartChange = (id, e) => {
        if (e.target.value > 0) {
            const updatedCarts = selector.carts.map(cart =>
                cart._id === id ? { ...cart, quantity: e.target.value } : cart
            );
            dispatch(setCarts(updatedCarts))
        }
    }

    const handleBlur = (id, e) => {
        if (e.target.value > 0)
            updateCart(id, e.target.value)
                .then(res => {
                    if (res.status === 200) {
                        const updatedCarts = selector.carts.map(cart =>
                            cart._id === id ? { ...cart, ...res.data.cart } : cart
                        );
                        dispatch(setCarts(updatedCarts))
                    }
                    else {
                        toast.error(res.error)
                    }
                })
    };

    const increment = (id, quantity) => {
        updateCart(id, quantity + 1)
            .then(res => {
                if (res.status === 200) {
                    const updatedCarts = selector.carts.map(cart =>
                        cart._id === id ? { ...cart, ...res.data.cart } : cart
                    );

                    dispatch(setCarts(updatedCarts))
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    const decrement = (id, quantity) => {
        if (quantity - 1 > 0) {
            updateCart(id, quantity - 1)
                .then(res => {
                    if (res.status === 200) {
                        const updatedCarts = selector.carts.map(cart =>
                            cart._id === id ? { ...cart, ...res.data.cart } : cart
                        );
                        dispatch(setCarts(updatedCarts))
                    }
                    else {
                        toast.error(res.error)
                    }
                })
        }
    }

    const remove = (id) => {
        removeCart(id)
            .then(res => {
                if (res.status === 200) {
                    const updatedCarts = selector.carts.filter(cart =>
                        cart._id != id
                    );

                    dispatch(setCarts(updatedCarts))
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    const calculateSubTotal = () => {
        let value = 0;
        let shippingFee = 0

        selector.carts.length > 0 && selector.carts.forEach(cart => {
            const price = parseInt(cart.product.price) * parseInt(cart.quantity);
            shippingFee += 50;
            value += price;
        });

        setState(prevState => ({ ...prevState, shippingFee, subTotal: value }));
    };

    const calculateTotal = () => {
        setState(prevState => {
            const value = prevState.subTotal + prevState.shippingFee - prevState.discount;
            return { ...prevState, total: value };
        });
    };

    useEffect(() => {
        calculateSubTotal();
        calculateTotal()
    }, [selector.carts]);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const res = await createOrder(state, selector.carts, setErrors)

        if (res.status === 200) {
            dispatch(setCarts([]))
            toast.success(res.message)
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setLoading(false)
    }

    if (loading)
        return <Loading />
    else
        return (
            <>
                <div className='card'>
                    <div className="card-body">
                        <div className="row gap-3">
                            {selector.carts.length > 0 ? selector.carts.map((cart, index) => (
                                <div className="col-md-12" key={index}>
                                    <div className="d-flex justify-content-between align-items-center w-100 gap-2 flex-wrap">
                                        <Link to={`/product/${cart.product._id}`}><img src={`${API_URL}/${cart.product.image}`} alt={cart.product.name} width={60} height={60} /></Link>
                                        <div>
                                            <Link className='text-decoration-none text-dark h5' to={`/product/${cart.product._id}`}>{cart.product.name}</Link>
                                            <p>Brand: <a href="#" className="text-primary text-decoration-none">{cart.product.brand}</a></p>
                                        </div>
                                        <div>
                                            <strong className="text-primary h5">Rs. {cart.product.price}</strong><br />
                                            <small className="text-gray"><del>Rs. 4000</del></small> <small>-50%</small>
                                        </div>
                                        <div className="d-flex">
                                            <button className="btn btn-secondary" type="button" onClick={() => decrement(cart._id, cart.quantity)}><span className="fa fa-minus"></span></button>
                                            <input type="text" className="form-control text-center" value={cart.quantity} onChange={(e) => handleCartChange(cart._id, e)} onBlur={(e) => handleBlur(cart._id, e)} />
                                            <button className="btn btn-secondary" type="button" onClick={() => increment(cart._id, cart.quantity)}><span className="fa fa-plus"></span></button>
                                        </div>
                                        <button type="button" className="btn btn-danger" onClick={() => remove(cart._id)}><i className="fa fa-trash"></i></button>
                                    </div>
                                    {index !== selector.carts.length - 1 && <hr />}
                                </div>
                            )) :
                                <div> No product in your cart.</div>
                            }
                        </div>
                    </div>
                </div>
                {selector.carts.length > 0 &&
                    <form action='/' className="row mt-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <div className="card">
                                <h5 className="card-header bg-white">Shipping Address</h5>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="province">Province</label>
                                                <input className='form-control' type="text" name='province' id='province' onChange={handleChange} value={state.province} />
                                                <span className="text-danger">{errors.province}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="district">District</label>
                                                <input className='form-control' type="text" name='district' id='district' onChange={handleChange} value={state.district} />
                                                <span className="text-danger">{errors.district}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="municipality">Municipality</label>
                                                <input className='form-control' type="text" name='municipality' id='municipality' onChange={handleChange} value={state.municipality} />
                                                <span className="text-danger">{errors.municipality}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="street">Street</label>
                                                <input className='form-control' type="text" name='street' id='street' onChange={handleChange} value={state.street} />
                                                <span className="text-danger">{errors.street}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <h5 className="card-header bg-white">Order Summery</h5>
                                <div className="card-body d-flex flex-column gap-4">
                                    <div className="d-flex justify-content-between">
                                        <span>Subtotal</span>
                                        <span>Rs {state.subTotal}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Shipping Fee</span>
                                        <span>Rs {state.shippingFee}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Discount</span>
                                        <span>Rs {state.discount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Total</span>
                                        <span className='text-primary'>Rs {state.total}</span>
                                    </div>
                                    <button className='btn btn-primary w-100'>Proceed To Checkout</button>
                                </div>
                            </div>
                        </div>
                    </form>
                }
            </>
        )
}

export default Cart