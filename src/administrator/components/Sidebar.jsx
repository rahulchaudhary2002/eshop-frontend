import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    let location = useLocation();
    const selector = useSelector(state => state.auth)

    return (
        <div className="d-flex flex-column flex-shrink-0 py-3 text-bg-dark" style={{ "width": "280px", "height": "100vh", "position": "fixed" }}>
            <Link to="/administrator" className="d-flex px-3 align-items-center">
                <img src="/logo.png" alt="Logo" height={30} />
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="/administrator" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator" ? "active" : ""}`}>
                        <i className="fa fa-dashboard"></i> Dashboard
                    </Link>
                </li>
                {selector.user?.role == 'admin' &&
                <li>
                    <Link to="/administrator/user" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator/user" ? "active" : ""}`}>
                        <i className="fa fa-users"></i> User
                    </Link>
                </li>
                }
                <li>
                    <Link to="/administrator/category" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator/category" ? "active" : ""}`}>
                        <i className="fa fa-list-alt"></i> Category
                    </Link>
                </li>
                <li>
                    <Link to="/administrator/product" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator/product" ? "active" : ""}`}>
                        <i className="fa fa-product-hunt"></i> Product
                    </Link>
                </li>
                <li>
                    <Link to="/administrator/order" className={`nav-link text-white d-flex align-items-center gap-3 ${location.pathname==="/administrator/order" ? "active" : ""}`}>
                        <i className="fa fa-truck-fast"></i> Order
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar