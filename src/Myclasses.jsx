import { useEffect, useRef, useState } from "react";
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import style from "../src/myclasses.module.css";
import "./myclassestablist.css";
import { UserAuth } from "./ContextApi/ContextApi";
import { CloseOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";

import { Button, Modal, Row, Space, Tabs } from "antd";
function Myclasses() {
    const { calendarBlok, blok, myClassApiData, setSeasonTermDisplay, setSeasonsModalValue, handleClearAllFilters, seasonsModalValue, classBlok, myClassesFilteredData, myclassesFilteredDataEnroll, myClassesPlannedData } = UserAuth();
    const default_seasons_term = myClassApiData && myClassApiData?.Terms;
    const localStorageTermsData = localStorage.getItem("term_data");

    const lastValidDataRef = useRef(null);
    const enrollData =
        myclassesFilteredDataEnroll?.flatMap(item =>
            item?.Career?.Terms?.Term?.Classes?.Class || []
        );
    console.log('myclassesFilteredDataEnroll', enrollData);

    useEffect(() => {
        if (calendarBlok) {
            lastValidDataRef.current = calendarBlok;
        }
    }, [calendarBlok]);
    const safeData = calendarBlok || lastValidDataRef.current;
    const [seasonsModal, setSeasonsModal] = useState(false);

    const handleSeasonFilterApplyBtn = () => {
        setSeasonsModal(false);

        // setSkipApiCall(true);
        // getSelectedCourseData(seasonsModalValue, onlyClassCall);
        // setClassSearchModalValue(seasonsModalValue);
    };
    if (!safeData) return null;
    const applyButton = blok.searchFilters?.find(
        (item) => item.component === "Apply"
    );
    const clearAllButton = blok.searchFilters?.find(
        (item) => item.component === "clearall"
    );
    const selectTerm = blok.searchFilters?.find(
        (item) => item.component === "Select term"
    );
    if (!classBlok) return <div>Loading My Classes...</div>;
    const items = [
        {
            key: "E",
            label: "Enrolled",

        },
        {
            key: "W",
            label: "Waitlisted",
        },
        {
            key: "P",
            label: "Planned",
        },
        {
            key: "A",
            label: "All",
        },
    ];
    return (
        <>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: '20px 0 20px 0',
                }}
            >
                <div style={{ flex: 1 }} />            <h1 className={style.myclassesFont}>{classBlok.Title}</h1>
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", marginRight: "40px" }}>
                    <Button
                        onClick={() => {
                            setSeasonsModal(true);
                        }}
                    >
                        {default_seasons_term?.DefaultTermDescr}
                        <DownOutlined style={{ fontSize: "0.9rem" }} />
                    </Button>
                    <Modal
                        centered
                        width={"300px"}
                        open={seasonsModal}
                        closable={false}
                        footer={false}
                        keyboard={true}
                        onCancel={() => {
                            setSeasonsModalValue();
                            setSeasonsModal(false);
                        }}
                        style={{
                            borderRadius: "5px",
                        }}
                        aria-hidden="true"
                        afterOpenChange={(open) => {
                            if (open) {
                                const modalElement = document.querySelector(".ant-modal");
                                if (modalElement) {
                                    modalElement.setAttribute("aria-label", "Select term");
                                    const ariaHiddenDiv = modalElement.querySelector('div[aria-hidden="true"]');
                                    if (ariaHiddenDiv) {
                                        ariaHiddenDiv.remove("aria-hidden");
                                    }
                                }
                            }
                        }
                        }
                    >
                        <div >
                            <Row style={{ display: "flex", justifyContent: "end" }}>
                                <CloseOutlined
                                    tabIndex="0"
                                    onClick={() => {
                                        setSeasonsModal(false);
                                        //  setSeasonsModalValue("");
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setSeasonsModal(false);
                                            //setSeasonsModalValue("");
                                        }
                                    }}
                                    style={{ fontSize: "18px", color: "#006B81" }}
                                />
                            </Row>
                            <Row style={{ width: "250px", margin: "5px 0 0 0" }}>
                                <Row style={{ width: "100%" }}>
                                    <h2
                                        className="termFocus"
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "700",
                                            color: "#272E5C",
                                            marginBottom: "0px",
                                        }}
                                    >
                                        {selectTerm?.Title}
                                    </h2>
                                </Row>
                                <Row style={{ marginTop: "16px" }}>
                                    <Space direction="vertical">
                                        {localStorageTermsData &&
                                            (() => {
                                                try {
                                                    const parsedData = JSON.parse(
                                                        localStorageTermsData
                                                    );
                                                    return parsedData.map((item) => (
                                                        <div key={item.Term}>
                                                            <label
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    fontSize: "17.03px",
                                                                    fontWeight: "400",
                                                                    color: "#272E5C",
                                                                    cursor: "pointer",
                                                                }}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    tabIndex={0}
                                                                    name="termSelection"
                                                                    value={item.Term}
                                                                    checked={seasonsModalValue === item.Term}
                                                                    onChange={() => {
                                                                        setSeasonsModalValue(item.Term);
                                                                        setSeasonTermDisplay(item.TermDescr);
                                                                    }}
                                                                    // onClick={() => {
                                                                    //     setSeasonTermDisplay(item.TermDescr);
                                                                    // }}
                                                                    style={{
                                                                        marginRight: "8px",
                                                                        cursor: "pointer",
                                                                    }}
                                                                />
                                                                {item.TermDescr}
                                                            </label>
                                                        </div>
                                                    ));
                                                } catch (e) {
                                                    console.error(
                                                        "Invalid JSON in localStorage for 'term_data':",
                                                        e
                                                    );
                                                    return null;
                                                }
                                            })()}
                                    </Space>
                                </Row>
                                <Row
                                    style={{
                                        display: "flex",
                                        justifyContent: "end",
                                        width: "100%",
                                        gap: "15px",
                                        marginTop: "16px",
                                    }}
                                >

                                    <Button
                                        style={{
                                            backgroundColor: "#651C32",
                                            border: "1px solid #651C32",
                                            color: "#FFFFFF",
                                            borderRadius: "6px",
                                            fontSize: "14px",
                                            fontWeight: "700",
                                        }}
                                        onClick={() => {
                                            handleSeasonFilterApplyBtn();
                                            handleClearAllFilters();
                                        }}
                                    >
                                        {applyButton?.Title}

                                    </Button>
                                    <Button
                                        style={{
                                            border: "1px solid #651C32",
                                            color: "#651C32",
                                            fontSize: "14px",
                                            fontWeight: "700",
                                        }}
                                        onClick={() => {
                                            setSeasonsModalValue("");
                                        }}
                                    >
                                        {clearAllButton?.Title}

                                    </Button>
                                </Row>
                            </Row>
                        </div>
                    </Modal>
                </div>
            </div>
            <div
                aria-label="My Classes Section"
                style={{ width: "100%" }}
                className="my-class-tab-list-main-div"
            >
                <Tabs
                    defaultActiveKey={items[1].key}
                    centered
                    // activeKey={enrollTab}
                    // onTabClick={handleTabClick}
                    items={items}
                    className="my-class-nav-bar"
                    destroyInactiveTabPane={true}
                />
            </div>
            {enrollData?.map((coursedata, index) => (
                <div
                    className="container-fluid"
                    id={style.outerDivList}
                >
                    <li
                        className="card w-100 mb-3"
                        id={style.outerDiv}
                        data-bs-toggle="collapse"

                    // aria-hidden={isFullyOpen || isOpenForUseEffect ? true : false}
                    // onClick={() => {
                    //     if (viewDetailsBoolean) {
                    //         setViewDetailsBoolean(false);
                    //     }
                    //     if (facilityMapId) {
                    //         setLocation(true);
                    //     }
                    //     if (isFullyOpen === true && location === true) {
                    //         setIsFullyOpen(false);
                    //     }
                    //     toggleDetails(
                    //         openIndexValue,
                    //         coursedata?.strm,
                    //         coursedata?.objectID,
                    //         coursedata?.subject,
                    //         coursedata?.catalogNbr,
                    //         coursedata?.classNbr
                    //     );
                    //     // if (
                    //     //   currentTab === "ENROLL" ||
                    //     //   currentTab === "WAITLISTED" ||
                    //     //   currentTab === "ALL" ||
                    //     //   currentTab === "PLANNED"
                    //     // ) {
                    //     // } else {
                    //     //   handleClassSearchViewDetail(
                    //     //     coursedata?.strm,
                    //     //     coursedata?.objectID,
                    //     //     coursedata?.subject,
                    //     //     coursedata?.catalogNbr,
                    //     //     coursedata?.classNbr
                    //     //   );
                    //     // }
                    // }}
                    // data-bs-target={`#collapseExample-${openIndexValue && openIndexValue}`}
                    // data-bs-target={`#${collapseId}`}
                    // aria-expanded="false"
                    // aria-controls={`collapseExample-${openIndexValue && openIndexValue}`}
                    // aria-controls={collapseId}
                    >
                        <div className="card-body" class="row">
                            <div
                                id={style.leftDiv}
                                class="container col col-xl-2 col-lg-2 col-md-2 col-sm-3 col-12"
                            >
                                <h3>
                                    {coursedata?.Subject} {coursedata?.CatalogNbr}
                                </h3>
                                <p>
                                    {coursedata?.ClassType && coursedata?.ClassType + ": "}
                                    {coursedata?.ClassSection}

                                </p>
                            </div>
                            <div
                                class="container col col-xl-10 col-lg-10 col-md-10 col-sm-9 col-12"
                                id={style.rightDiv}
                            >
                                <div class="row">
                                    <div class="col col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                                        <h4>
                                            {coursedata?.ClassDescr}
                                        </h4>
                                        {coursedata?.classTitle && (
                                            <h4 style={{ fontWeight: '400' }}>
                                                {coursedata?.classTitle}
                                            </h4>
                                        )
                                        }
                                    </div>
                                    <div
                                        id={style.seasonAndStatusDisplayDiv}
                                        class="col col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12"
                                    >
                                        <span id={style.winter}>
                                            {coursedata?.Descr && coursedata?.Descr}
                                        </span>
                                        <span
                                            id={
                                                coursedata?.EnrollStatusDescr === "Withdrawn" ||
                                                    coursedata?.EnrollStatusDescr === "Dropped"
                                                    ? style.withdrawnORDropped
                                                    : coursedata?.EnrollStatusDescr === "Enrolled" &&
                                                    style.open
                                            }
                                        >
                                            {" "}
                                            {coursedata?.EnrollmentStatus === "E" &&
                                                coursedata?.EnrollStatusDescr &&
                                                coursedata?.EnrollStatusDescr}
                                        </span>
                                        <span
                                            style={{
                                                display:
                                                    coursedata?.EnrollmentStatus === "W"
                                                        ? "block"
                                                        : "none",
                                            }}
                                            id={style.waitlist}
                                        >
                                            {" "}
                                            {coursedata?.EnrollmentStatus === "W" &&
                                                coursedata?.EnrollStatusDescr &&
                                                coursedata?.EnrollStatusDescr}{" "}
                                            {coursedata?.StudentPosition &&
                                                coursedata?.StudentPosition +
                                                "/" +
                                                coursedata?.cmbWaitCap}
                                        </span>
                                        <span id={style.winter}>{coursedata?.termOffered}</span>
                                        <span
                                            // id={style.open}
                                            id={
                                                coursedata?.matched_value === "Withdrawn" ||
                                                    coursedata?.matched_value === "Dropped"
                                                    ? style.withdrawnORDropped
                                                    : coursedata?.matched_value === "Enrolled" &&
                                                    style.open
                                            }
                                        >
                                            {" "}
                                            {coursedata?.matched_value}
                                        </span>
                                        <span
                                            style={{
                                                display: "flex",
                                                gap: "5px",
                                                alignItems: "center",
                                            }}
                                        >
                                            {/* {coursedata?.conflict ? (
                            <img
                              src={RedConflictIcon}
                              alt=""
                              style={{ height: "23px" }}
                            />
                          ) : (
                            ""
                          )} */}
                                            {coursedata?.flatAmount > 0 && (
                                                <img
                                                    // src={flatAmountIcon}
                                                    alt="Flat Amount"
                                                    style={{ height: "23px" }}
                                                />
                                            )}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </li>
                </div>
            ))}

        </>
    );
}

export default Myclasses;
