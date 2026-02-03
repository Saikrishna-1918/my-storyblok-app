import { useEffect, useRef, useState } from "react";
import "./mycalendar.css";
import { UserAuth } from "./ContextApi/ContextApi";
import { CloseOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";

import { Button, Modal, Row, Space } from "antd";

function MyCalendar() {
    const { calendarBlok, blok, myClassApiData, setSeasonTermDisplay, setSeasonsModalValue, handleClearAllFilters, seasonsModalValue } = UserAuth();
    const default_seasons_term = myClassApiData && myClassApiData?.Terms;
    const localStorageTermsData = localStorage.getItem("term_data");

    const lastValidDataRef = useRef(null);

    useEffect(() => {
        if (calendarBlok) {
            lastValidDataRef.current = calendarBlok;
        }
    }, [calendarBlok]);
    console.log('blok', blok);

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
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                padding: '20px 0 20px 0',
            }}
        >
            <div style={{ flex: 1 }} />
            <h1
                className="mycalendarFont"
                style={{ textAlign: "center", margin: 0 }}
            >
                {safeData.Title}
            </h1>

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

    );
}

export default MyCalendar;
