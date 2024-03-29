import jsCookie from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from '../../common/components/Loading';
import Pagination from '../../common/components/Pagination';
import { setPage, setOrders, setTotalRecords } from '../../features/orderSlice';
import { getCustomerOrders, updateOrder } from '../../api/OrderApi';
import { API_URL } from "../../constants";
import { toast } from "react-toastify";

const Order = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.order)
    const [loading, setLoading] = useState(true)

    const handleSetPage = (page) => {
        dispatch(setPage(page));
    };

    const cancelOrder = async (id) => {
        const res = await updateOrder({_id: id, status: 'cancelled'})

        if (res.status === 200) {
            toast.success(res.message)
            const updatedOrders = selector.orders.map(order =>
                order._id === res.data.order._id ? { ...order, ...res.data.order } : order
            );
            dispatch(setOrders(updatedOrders))
        }
        else if (res.status) {
            toast.error(res.error)
        }
    }

    useEffect(() => {
        setLoading(true);
        if (!jsCookie.get('accessToken')) {
            return navigate('/login');
        }

        getCustomerOrders(selector.page, selector.perPage)
            .then(res => {
                if (res.status === 200) {
                    dispatch(setOrders(res.data.orders));
                    dispatch(setTotalRecords(res.data.totalRecords));
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, [selector.page]);

    if (loading)
        return <Loading />
    else
        return (
            <>
                <div className='container-fluid'>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <h5 className='card-title mt-2'>Order</h5>
                        </div>
                        <div className="card-body">
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Address</th>
                                        <th>Product Image</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selector.orders.length > 0 ? selector.orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Link className="text-decoration-none" to={`/product/${order.product._id}`}>{order.product.name}</Link></td>
                                            <td>{order.quantity}</td>
                                            <td>{order.price}</td>
                                            <td>{order.address}</td>
                                            <td><img src={`${API_URL}/${order.product.image}`} alt={order.product.name} height={50} width={50} /></td>
                                            <td>
                                                {order.status === 'pending' ? <span className={`badge bg-warning`}>Pending</span>
                                                    : (order.status === 'packing' ? <span className={`badge bg-primary`}>Packing</span>
                                                        : (order.status === 'delivered' ? <span className={`badge bg-success`}>Delivered</span>
                                                            : <span className={`badge bg-danger`}>Cancelled</span>))}
                                            </td>
                                            <td>
                                                {order.status !== 'cancelled' && order.status !== 'delivered' ?
                                                    <button className="btn btn-sm btn-danger" onClick={() => { cancelOrder(order._id) }}>Cancel</button>
                                                    : ''}
                                            </td>
                                        </tr>
                                    )) :
                                        <tr>
                                            <td colSpan={7}>No data found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                            <Pagination total={selector.totalRecords ? selector.totalRecords : 1} current={selector.page} length={selector.perPage} setPage={handleSetPage} />
                        </div>
                    </div>
                </div>
            </>
        )
}

export default Order