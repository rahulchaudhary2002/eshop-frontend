import React, { useState } from 'react'
import '../assets/css/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import jsCookie from "js-cookie"
import { logout } from '../../api/AuthApi'
import { toast } from 'react-toastify'
import { setCurrentUser } from '../../features/authSlice'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const selector = useSelector(state => state.auth)
    const [search, setSearch] = useState('')

    const handleLogout = async (e) => {
        e.preventDefault();

        const res = await logout()

        if (res.status === 200) {
            jsCookie.remove('accessToken')
            jsCookie.remove('refreshToken')
            dispatch(setCurrentUser({}))
            toast.success(res.message)
            navigate('/')
        }
        else {
            toast.error(res.error)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        return navigate(`/product?search=${search}`)
    }

    return (
        <>
            <header className="header">
                <div className="header-top">
                    <div className="container d-flex justify-content-between align-items-center flex-wrap">
                        <div></div>
                        <div className="header-top-quick-link">
                            {Object.keys(selector.user).length === 0 ?
                                <>
                                    <Link to="./login" title="Login" className='text-dark text-decoration-none'>Login</Link>
                                    <Link to="./register" title="Register" className='text-dark text-decoration-none'>Register</Link>
                                </> :
                                <>
                                    <div className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><span className="ml-3">{selector.user?.name}</span>
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                            <Link className="dropdown-item" to="/order">Track Your Order</Link>
                                            <Link className="dropdown-item" to="/change-password">Change Password</Link>
                                            <Link className="dropdown-item" to="/logout" onClick={handleLogout}>Logout</Link>
                                        </div>
                                    </div>
                                </>}
                        </div>
                    </div>
                </div>
                <div className="header-main">
                    <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div className="header-main-logo">
                            <Link to="/" title="Logo" className='text-dark text-decoration-none'><img src="/logo.png" alt="Logo" /></Link>
                        </div>
                        <form className='d-flex align-items-center w-50' action="/" onSubmit={handleSearch}>
                            <input className='w-75' type="text" placeholder="What do you need?" name='search' onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-primary"><i className="fa fa-search"></i></button>
                        </form>
                        <Link to={'/cart'} title="Shopping Cart" className="text-dark text-decoration-none header-main-cart position-relative"><i className="fa fa-shopping-bag"></i> <span className="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle"></span></Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header