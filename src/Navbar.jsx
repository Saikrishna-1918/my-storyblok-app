import { useEffect, useRef } from "react";
import { UserAuth } from "./ContextApi/ContextApi";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = ({ blok }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { myClassApiData } = UserAuth();

  const lastValidDataRef = useRef(null);

  useEffect(() => {
    if (myClassApiData) {
      lastValidDataRef.current = myClassApiData;
    }
  }, [myClassApiData]);

  const safeData = myClassApiData || lastValidDataRef.current;

  const handleTabChange = (route) => {
    navigate(route);
  };

  const currentRoute = location.pathname.replace("/", "");

  if (!safeData) {
    return null;
  }

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
                  className={`tab-item ${
                    currentRoute === tab.route ? "active" : ""
                  }`}
                >
                  {tab.label}
                </span>
              )
          )}

          {blok.logout_icon?.filename && (
            <img
              src={blok.logout_icon.filename}
              alt="Logout"
              style={{
                height: "20px",
                cursor: "pointer",
                marginRight: "40px",
              }}
            />
          )}
        </div>
      </div>

      {blok.stanford_banner?.filename &&
        location.pathname !== "/class-search" && (
          <div className="banner-container">
            <img
              src={blok.stanford_banner.filename}
              alt="stanford_banner"
              className="stanford_banner"
            />

            <span id="welcome_span_tag">
              Welcome <br />
              {safeData.StudentName}
            </span>

            <div id="announcementBox_C">
              <div id="announcementOuterBox_C">
                <h2>Announcements</h2>
                <div id="announcementInnerBox_C">
                  {safeData.Messages && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: safeData.Messages,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default NavBar;
