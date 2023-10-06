import * as React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function NavBar (){

    return(
        <div className='' > 
            <div id="js-preloader" className="js-preloader header-navbar">
                <div className="preloader-inner">
                    <span className="dot"></span>
                    <div className="dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div> 
 
            <header className="header-area header-sticky header-navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav"> 
                                <Link to="/" className="logo">
                                    <img src="https://www.prgx.com/wp-content/uploads/2023/02/PRGX-Logo-PNG.svg" alt="" />
                                </Link> 
                            
                                <ul className="">
                                    <li className='li-nav' ><Link to="/" className="">Posts</Link></li>
                                    <li className='li-nav' ><Link to="/newPosts">Nuevos Posts</Link></li>
                                </ul>   
                                {/* <a className='menu-trigger' href="#">
                                    <span>Menu</span>
                                </a>  */}
                            </nav>
                        </div>
                    </div>
                </div>
            </header> 
        </div>
    )
}