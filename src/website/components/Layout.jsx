import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <div className="container mt-3">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout