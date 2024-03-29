import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = () => {
    return (
        <>
            <Sidebar />
            <div style={{ "marginLeft": "280px" }}>
                <Header />
                <div style={{"paddingTop": "80px"}}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout