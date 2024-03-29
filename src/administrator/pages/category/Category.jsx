import Pagination from '../../../common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPage } from '../../../features/categorySlice';
import { API_URL } from '../../../constants';
import CreateCategory from './CreateCategory';
import EditCategory from './EditCategory';

const Category = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.category)

    const handleSetPage = (page) => {
        dispatch(setPage(page));
    };

    return (
        <>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className='card-title mt-2'>Category</h5>
                        <button className='btn btn-md btn-primary' data-bs-toggle="modal" data-bs-target="#create-category-model"><i className="fa fa-plus"></i> create category</button>
                    </div>
                    <div className="card-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selector.categories.length > 0 ? selector.categories.map((category, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{category.name}</td>
                                        <td><img src={`${API_URL}/${category.image}`} alt={category.name} height={50} width={50} /></td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#update-category-model" onClick={() => dispatch(setCategory(category))}><i className="fa fa-edit"></i></button>
                                        </td>
                                    </tr>
                                )) :
                                    <tr>
                                        <td colSpan={4}>No data found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                        <Pagination total={selector.totalRecords ? selector.totalRecords : 1} current={selector.page} length={selector.perPage} setPage={handleSetPage} />
                    </div>
                </div>
            </div>

            <CreateCategory />
            <EditCategory />
        </>
    )
}

export default Category