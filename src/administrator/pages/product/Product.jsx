import Pagination from '../../../common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct, setPage } from '../../../features/productSlice';
import { API_URL } from '../../../constants';
import CreateProduct from './CreateProduct';
import EditProduct from './EditProduct';

const Product = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.product)

    const handleSetPage = (page) => {
        dispatch(setPage(page));
    };

    const handleEdit = (product) => {
        let { category, ...rest } = product
        rest = {...rest, category: category._id}
        dispatch(setProduct(rest))
    }

    return (
        <>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className='card-title mt-2'>Product</h5>
                        <button className='btn btn-md btn-primary' data-bs-toggle="modal" data-bs-target="#create-product-model"><i className="fa fa-plus"></i> create product</button>
                    </div>
                    <div className="card-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selector.products.length > 0 ? selector.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.category?.name}</td>
                                        <td>{product.price}</td>
                                        <td><img src={`${API_URL}/${product.image}`} alt={product.name} height={50} width={50} /></td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#update-product-model" onClick={() => handleEdit(product)}><i className="fa fa-edit"></i></button>
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

            <CreateProduct />
            <EditProduct />
        </>
    )
}

export default Product