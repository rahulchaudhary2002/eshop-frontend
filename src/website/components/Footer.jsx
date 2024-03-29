import React from 'react'
import '../assets/css/footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className="footer mt-3">
                <div className="container">
                    <div className="footer-top">
                        <div className="row g-3">
                            <div className="col-md-4 footer-top-brand">
                                <div className="footer-logo">
                                    <Link className='text-dark text-decoration-none' to="#" title="Logo"><img src="/logo.png" alt="Logo" /></Link>
                                </div>
                                <span className="mt-2">Address: Kathmandu, Nepal</span>
                                <span className="mt-2">Phone: +977 980000000000</span>
                                <span className="mt-2">Email: info@e-shop.com</span>
                            </div>
                            <div className="col-md-3">
                                <strong>Quick Links</strong>
                                <div className="footer-top-quick-links d-flex flex-column">
                                    <Link className='text-dark text-decoration-none' to="/" title="Home">Home</Link>
                                    <Link className='text-dark text-decoration-none' to="/product" title="Shop">Shop</Link>
                                    <Link className='text-dark text-decoration-none' to="/" title="Blog">Blog</Link>
                                    <Link className='text-dark text-decoration-none' to="/" title="Contact">Contact</Link>
                                    <Link className='text-dark text-decoration-none' to="/" title="About Us">About Us</Link>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <strong>Join Our Newsletter Now</strong>
                                <div className="mt-2">Get E-mail updates about our latest shop and special offers.</div>
                                <div className="footer-top-newsletter mt-4">
                                    <form action="#">
                                        <input type="text" placeholder="Enter your mail" />
                                        <button className="btn btn-primary" type="submit">Subscribe</button>
                                    </form>
                                </div>
                                <div className="footer-top-social mt-4">
                                    <Link className='text-dark text-decoration-none' to="#" title="Facebook"><i className="fa-brands fa-facebook-f"></i></Link>
                                    <Link className='text-dark text-decoration-none' to="#" title="Instagram"><i className="fa-brands fa-instagram"></i></Link>
                                    <Link className='text-dark text-decoration-none' to="#" title="Twitter"><i className="fa-brands fa-twitter"></i></Link>
                                    <Link className='text-dark text-decoration-none' to="#" title="Youtube"><i className="fa-brands fa-youtube"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="row">
                            <div className="col-md-12">
                                <span>&copy; e-Shop 2022 All rights reserved</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer