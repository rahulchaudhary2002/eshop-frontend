import React from 'react'
import { API_URL } from '../../constants'
import { Link, useNavigate } from 'react-router-dom'
import jsCookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { createCart } from '../../api/CartApi'
import { setCarts } from '../../features/cartSlice'
import { toast } from 'react-toastify'

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const selector = useSelector(state => state.cart)

    const addToCart = async (product) => {
        if (!jsCookie.get('accessToken'))
            return navigate('/login')

        createCart(product)
            .then(res => {
                if (res.status == 200) {
                    dispatch(setCarts([...selector.carts, res.data.cart]))
                    toast.success(res.message)
                }
                else {
                    toast.error(res.error)
                }
            })
    }

    return (
        <div className="card mb-3">
            <Link to={`/product/${product._id}`} className='text-decoration-none' >
                <img src={`${API_URL}/${product.image}`} className="card-img-top" alt={product.name} height={200} />
                <div className="card-body">
                    <p className="card-text text-dark h5">{product.name}</p>
                    <p className="card-text h4"><small className="text-primary">Rs. {product.price}</small></p>
                </div>
            </Link>
            <button type="buttton" className='btn btn-primary w-100' style={{ 'borderRadius': '0px 0px 5px 5px' }} onClick={() => { addToCart(product._id) }}>Add to cart</button>
        </div>
    )
}

export default ProductCard