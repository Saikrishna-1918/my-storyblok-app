import React, { useEffect, useState } from "react";
// import "./AllClassCalendarToolBar.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserAuth } from "./ContextApi/ContextApi";

const AllClassCalendarToolBar = (props) => {
  const {
    myClassApiData,
    getSelectedCourseData,
    setSeasonTermDisplay,
    myScheduleFilteredData,
  } = UserAuth();
  const default_seasons_term = myClassApiData && myClassApiData?.Terms;
  const localStorageTermsData = localStorage.getItem("term_data");
  const [currentIndex, setCurrentIndex] = useState(0);

  const parselocalStorageTermsData = JSON?.parse(localStorageTermsData);

  const totalUnits = myScheduleFilteredData
    ?.filter((item) => item.EnrollmentStatus !== "D") // Exclude items with EnrollmentStatus "D"
    ?.reduce((sum, item) => {
      return (
        sum +
        (item.Units !== undefined
          ? item.Units
          : item.UnitsTaken !== undefined
          ? item.UnitsTaken
          : 0)
      );
    }, 0);

  useEffect(() => {
    const defaultIndex = parselocalStorageTermsData?.findIndex(
      (term) => term?.Term === myClassApiData?.Terms?.DefaultTerm
    );
    if (defaultIndex !== -1) {
      setCurrentIndex(defaultIndex);
    }
  }, [parselocalStorageTermsData, myClassApiData?.Terms?.DefaultTerm]);

  return (
    <div className="rbc-toolbar" style={{ width: "100%" }}>
      <div
        className="custom-navigation"
        style={{
          width: "100%",
          gap: "5px",
          display: "flex",
          justifyContent: "center",
          padding: "15px 0 0 0",
        }}
      >
        {/* <button
          type="button"
          style={{
            width: "55px",
            height: "35px",
            boxShadow: "0px 0px 4px 0px #00000040",
          }}
        >
          <LeftOutlined onClick={() => handleLeftArrowClick()} />
        </button> */}
        {/* <button
          type="button"
          style={{
            width: "255px",
            height: "35px",
            boxShadow: "0px 0px 4px 0px #00000040",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "600" }}>
            {parselocalStorageTermsData[currentIndex]?.TermDescr}
          </span>
        </button> */}
        {/* <button
          type="button"
          style={{
            width: "55px",
            height: "35px",
            boxShadow: "0px 0px 4px 0px #00000040",
          }}
        >
          <RightOutlined onClick={() => handleRightArrowClick()} />
        </button> */}
        <h3 style={{ fontSize: "18px", fontWeight: "700" }}>
          {parselocalStorageTermsData[currentIndex]?.TermDescr}
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "end",
          padding: "15px 22px 0 0",
        }}
      >
        <span className="term">
          Total Units: <span className="units">{totalUnits}</span>
        </span>
      </div>
    </div>
  );
};

export default AllClassCalendarToolBar;
