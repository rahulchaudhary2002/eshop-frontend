import React, { useState } from 'react'
import { updateOrder } from '../../../api/OrderApi';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders, setOrder } from '../../../features/orderSlice';

const EditOrder = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.order)
    const [disable, setDisable] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisable(true)

        const res = await updateOrder(selector.order)

        if (res.status === 200) {
            toast.success(res.message)
            const updatedOrders = selector.orders.map(order =>
                order._id === res.data.order._id ? { ...order, ...res.data.order } : order
            );
            dispatch(setOrders(updatedOrders))
            document.getElementById('close-update-model').click()
        }
        else if (res.status) {
            toast.error(res.error)
        }

        setDisable(false)
    }

    const handleChange = (e) => {
        dispatch(setOrder({ ...selector.order, [e.target.name]: e.target.value }));
    }

    return (
        <>
            <div className="modal fade" id="update-order-model">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Update Order</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" id='close-update-model'></button>
                        </div>

                        <div className="modal-body">
                            <form action="/" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select name="status" id="status" className='form-control' onChange={handleChange} value={selector.order.status}>
                                                <option value="pending">Pending</option>
                                                <option value="packing">Packing</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
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

export default EditOrder