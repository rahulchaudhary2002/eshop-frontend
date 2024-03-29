import Pagination from '../../../common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setPage } from '../../../features/userSlice';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

const User = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state.user)

    const handleSetPage = (page) => {
        dispatch(setPage(page));
    };

    return (
        <>
            <div className='container-fluid'>
                <div className="card">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className='card-title mt-2'>User</h5>
                        <button className='btn btn-md btn-primary' data-bs-toggle="modal" data-bs-target="#create-user-model"><i className="fa fa-plus"></i> create user</button>
                    </div>
                    <div className="card-body">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>SN</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selector.users.length > 0 ? selector.users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.isActive ?
                                            <span className={`badge bg-success`}>Active</span>
                                            : <span className={`badge bg-danger`}>Inactive</span>}
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#update-user-model" onClick={() => dispatch(setUser(user))}><i className="fa fa-edit"></i></button>
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

            <CreateUser />
            <EditUser />
        </>
    )
}

export default User