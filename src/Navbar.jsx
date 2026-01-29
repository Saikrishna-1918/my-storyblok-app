import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = ({ blok }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleTabChange = (route) => {
        navigate(route);
    };

    return (
        <>
            <div className="top-nav-bar-main-div">
                <span className="nav-bar-navigate-text">
                    {blok.university_name}
                </span>
            </div>

            <div className="top-nav-bar-second-row">
                <div className="top-nav-bar-first-row">
                    <span className="stanford-logo-text-tag">
                        {blok.logo}
                    </span>
                    <div className="top-nav-bar-first-row-line"></div>
                    <span className="nav-bar-navigate-second-text">
                        {blok.app_title}
                    </span>
                </div>

                <div className="tabs">
                    {blok.tabs?.map(
                        (tab) =>
                            tab.visible && (
                                <span
                                    key={tab._uid}
                                    onClick={() => handleTabChange(tab.route)}
                                    style={{
                                        cursor: "pointer",
                                        marginRight: "16px",
                                        fontWeight:
                                            location.pathname === tab.route ? "bold" : "normal",
                                    }}
                                >
                                    {tab.label}
                                </span>
                            )
                    )}

                    {blok.logout_icon?.filename && (
                        <img
                            src={blok.logout_icon.filename}
                            alt="Logout"
                            style={{ height: "20px", cursor: "pointer" }}
                        />
                    )}
                </div>
            </div>

            {
                blok.stanford_banner?.filename &&
                location.pathname !== "/class-search" && (
                    <img
                        src={blok.stanford_banner.filename}
                        alt="stanford_banner"
                        className="stanford_banner"
                    />
                )
            }

        </>
    );
};

export default NavBar;
