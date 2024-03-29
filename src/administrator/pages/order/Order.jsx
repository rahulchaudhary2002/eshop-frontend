import Pagination from '../../../common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder, setPage } from '../../../features/orderSlice';
import { API_URL } from '../../../constants';
import EditOrder from './EditOrder';

const Order = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.order)

    const handleSetPage = (page) => {
        dispatch(setPage(page));
    };

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
                                    <th>Customer Name</th>
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
                                        <td>{order.user.name}</td>
                                        <td>{order.product.name}</td>
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
                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#update-order-model" onClick={() => dispatch(setOrder(order))}><i className="fa fa-edit"></i></button>
                                        </td>
                                    </tr>
                                )) :
                                    <tr>
                                        <td colSpan={9}>No data found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <Pagination total={selector.totalRecords ? selector.totalRecords : 1} current={selector.page} length={selector.perPage} setPage={handleSetPage} />
                    </div>
                </div>
            </div>

            <EditOrder />
        </>
    )
}

export default Order