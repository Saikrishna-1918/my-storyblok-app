import { Col } from 'antd';
import './Navbar.css';

const NavBar = ({ blok }) => {

    return (
        <>
            <div className="top-nav-bar-main-div" >
                <span className="nav-bar-navigate-text" >{blok.university_name}</span>

            </div>

            <div className='top-nav-bar-second-row '>
                <div className='top-nav-bar-first-row'>
                    <span className="stanford-logo-text-tag">
                        {blok.logo}
                    </span>
                    <div className='top-nav-bar-first-row-line'></div>
                    <span className="nav-bar-navigate-second-text" >
                        {blok.app_title}
                    </span>

                </div>

                {
                    blok.tabs?.map((tab) => (
                        <div className='tabs'>

                            <a href="my-classes">{tab.label}</a>
                            <a href="my-calendar">{tab.route}</a>
                            <a href="class-search">{tab.visible} </a>
                        </div>
                    ))
                }
            </div>

        </>

    );
};

export default NavBar;
