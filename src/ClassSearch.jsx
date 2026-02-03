import { getStoryblokApi } from "@storyblok/react";
import React, { useEffect, useState, useRef, isValidElement, cloneElement } from "react";
import { Row, Col, Checkbox, Modal, Button, Input, Slider, Tooltip } from "antd";
import filter_data from "./AllclassesList.json";
import "./Allclasseslist.css";
import "./myclasses.module.css";
import "./classsearch.css";
import { UserAuth } from "./ContextApi/ContextApi";
import {
    CloseOutlined,
    DownOutlined,
    SearchOutlined
} from "@ant-design/icons";
import { Calendar, Views } from "react-big-calendar";

import { dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import classEvents from './data/classEvents';
import CalendarEventWrapper from "./CalendarEventWrapper";
import AllClassCalendarToolBar from "./AllClassCalendarToolBar";
import CustomEachEventWrapper from "./CustomEachEventWrapper";
import DayViewEventsData from "./DayViewEventsData";
import ClassSearchHeader from "./ClassSearchHeader";


const ClassSearch = () => {

    const [isTooltip, setIsToolTip] = useState("");
    const [isWidthLessThan768, setIsWidthLessThan768] = useState(
        window.innerWidth < 992
    );
    const [isApplyBtnHovered, setIsApplyBtnHovered] = useState(false);
    const [isClearAllBtnHovered, setIsClearAllBtnHovered] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    const [showMoreFormats, setShowMoreFormats] = useState(false);
    const [noOfUnitsModal, setNoOfUnitsModal] = useState(false);
    const [showMoreGeneralEducation, setShowMoreGeneralEducation] =
        useState(false);

    const getModalWidth = () => {
        if (window.innerWidth < 576) return "95%";
        if (window.innerWidth < 768) return "70%";
        if (window.innerWidth < 992) return "50%";
        return "40%";
    };

    const handleClearAllBtnMouseOver = () => {
        setIsClearAllBtnHovered(true);
    };
    const handleApplyBtnMouseOver = () => {
        setIsApplyBtnHovered(true);
    };
    const handleTimeApplyBtn = () => {
        setTimeModal(false);
        setHandleTimeBtnClick(!handleTimeBtnClick);
    };
    const handleClearAllBtnMouseOut = () => {
        setIsClearAllBtnHovered(false);
    };
    const handleClearAll = (e) => {
        setSelectDay([]);
        document.querySelectorAll(".filterCheckbox").forEach((checkbox) => {
            checkbox.checked = false;
        });
    };
    const locales = {
        "en-US": enUS,
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })
    const handleApplyBtnMouseOut = () => {
        setSearchAllCount((prevCount) => prevCount + 1);
        setIsApplyBtnHovered(false);
    };

    const [collapsedSections, setCollapsedSections] = useState({
        term: false,
        instructor: false,
        days: false,
        time: false,
        format: false,
        classStatus: false,
        classLevel: false,
        numberUnits: false,
        curatedClass: false,
        generalEducation: false,
        schoolAndDepartment: false,
        conflictOptions: false,
        campusLocation: false,
        gradingBasis: false,
    });
    const areAllCollapsed = Object.values(collapsedSections).every(val => val === false);
    const [showMoreDays, setShowMoreDays] = useState(false);
    const [timeModal, setTimeModal] = useState(false);
    const modalStartTimeRef = useRef(null);

    const closeButtonStartTimeRef = useRef(null);

    useEffect(() => {
        if (timeModal && modalStartTimeRef.current) {
            modalStartTimeRef.current.setAttribute("aria-hidden", "true");
            setTimeout(() => {
                modalStartTimeRef.current.removeAttribute("aria-hidden");
                closeButtonStartTimeRef.current?.focus();
            }, 500);
        }
    }, [timeModal]);
    const contextData = UserAuth();
    const {
        focusedEventIdRef,
        viewCalendarMode,

    } = UserAuth();

    const instructorData = contextData?.instructorData;
    const myClassApiData = contextData?.myClassApiData;

    const myclassesFilteredDataEnroll = contextData?.myclassesFilteredDataEnroll;
    const myClassesPlannedData = contextData?.myClassesPlannedData;
    const myScheduleFilteredData = contextData?.myScheduleFilteredData;
    const myScheduleStatusFilteredData =
        contextData?.myScheduleStatusFilteredData;
    const handleInstructorData = contextData?.handleInstructorData;
    const setInstructorData = contextData?.setInstructorData;
    const setSelectDay = contextData?.setSelectDay;
    const handleFormatSelect = contextData?.handleFormatSelect;
    const handleClearAllFormat = contextData?.handleClearAll;
    const handleClassStatus = contextData?.handleClassStatus;
    const handleClassLevel = contextData?.handleClassLevel;
    const handleCurated = contextData?.handleCurated;
    const handleGradingBasis = contextData?.handleGradingBasis;
    const handleEducation = contextData?.handleEducation;
    const handleClearEducation = contextData?.handleClearEducation;
    const handleSchoolAndDept = contextData?.handleSchoolAndDept;
    const handleInstCheckboxChange = contextData?.handleInstCheckboxChange;
    const selectedItems = contextData?.selectedItems;
    const filteredSuggestions = contextData?.filteredSuggestions || [];
    const mon = contextData?.mon;
    const tue = contextData?.tue;
    const wed = contextData?.wed;
    const thur = contextData?.thur;
    const fri = contextData?.fri;
    const sat = contextData?.sat;
    const sun = contextData?.sun;
    const setMon = contextData?.setMon;
    const setTue = contextData?.setTue;
    const setWed = contextData?.setWed;
    const setThur = contextData?.setThur;
    const setFri = contextData?.setFri;
    const setSat = contextData?.setSat;
    const setSun = contextData?.setSun;
    const setCourseFormat = contextData?.setCourseFormat;
    const setFormatAtt = contextData?.setFormatAtt;
    const setGeneralEducationAtt = contextData?.setGeneralEducationAtt;
    const setEducation = contextData?.setEducation;
    const time = contextData?.time;
    const handleTime = contextData?.handleTime;
    const numUnits = contextData?.numUnits;
    const handleNumUnits = contextData?.handleNumUnits;
    const handleClearAllFilters = contextData?.handleClearAllFilters;
    const handleclearDays = contextData?.handleclearDays;
    const handleMonSelect = contextData?.handleMonSelect;
    const handleTueSelect = contextData?.handleTueSelect;
    const handleWedSelect = contextData?.handleWedSelect;
    const handleThuSelect = contextData?.handleThuSelect;
    const handleFriSelect = contextData?.handleFriSelect;
    const handleSatSelect = contextData?.handleSatSelect;
    const handleSunSelect = contextData?.handleSunSelect;
    const allAttCounts = contextData?.allAttCounts;
    const handleTimeBtnClick = contextData?.handleTimeBtnClick;
    const setHandleTimeBtnClick = contextData?.setHandleTimeBtnClick;
    const handelUnitsBtnClick = contextData?.handelUnitsBtnClick;
    const setHandleUnitsBtnClick = contextData?.setHandleUnitsBtnClick;
    const isHamburgerOpen = contextData?.isHamburgerOpen;
    const setIsHamburgerOpen = contextData?.setIsHamburgerOpen;
    const isMobileView = contextData?.isMobileView;
    const isTabView = contextData?.isTabView;
    const isCalenderModalOpen = contextData?.isCalenderModalOpen;
    const setIsCalenderModalOpen = contextData?.setIsCalenderModalOpen;
    const zeroValue = contextData?.zeroValue;
    const classLevelAtt = contextData?.classLevelAtt;
    const classStatusAtt = contextData?.classStatusAtt;
    const schoolAtt = contextData?.schoolAtt;
    const formatAtt = contextData?.formatAtt;
    const curatedAtt = contextData?.curatedAtt;
    const gradingBasis = contextData?.gradingBasis;
    const generalEducationAtt = contextData?.generalEducationAtt;
    const missingMyClassData = contextData?.missingMyClassData;
    const setDisplayCalendar = contextData?.setDisplayCalendar;
    const displayCalendar = contextData?.displayCalendar;
    const calssSearchApiData = contextData?.calssSearchApiData;
    const setSearchAllCount = contextData?.setSearchAllCount;
    const hamburgerButtonRef = contextData?.hamburgerButtonRef;
    const closeButtonRef = contextData?.closeButtonRef;
    const isOpenForUseEffect = contextData?.isOpenForUseEffect;
    const setGlobalModalOpen = contextData?.setGlobalModalOpen;
    const setIsOpenForUseEffect = contextData?.setIsOpenForUseEffect;
    const setNumUnits = contextData?.setNumUnits;
    const setTime = contextData?.setTime;
    const calanderButtonRef = useRef(null);
    const setShowPopover = contextData?.setShowPopover;
    const showPopover = contextData?.showPopover;
    const consentConflictValue = contextData?.consentConflictValue;
    const setConsetnConflictValue = contextData?.setConsetnConflictValue;
    const handleConsentConflcit = contextData?.handleConsentConflcit;
    const areAllChildrenChecked = contextData?.areAllChildrenChecked;
    const setSelectedCampus = contextData?.setSelectedCampus;
    const selectedCampus = contextData?.selectedCampus;
    const campusFilter = contextData?.campusFilter;
    const gradingBasisFilter = contextData?.gradingBasisFilter;
    const isChildChecked = contextData?.isChildChecked;
    const getLocationCount = contextData?.getLocationCount;
    const blok=contextData?.blok;
    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef?.current) {
            const sliderHandles =
                sliderRef?.current?.querySelectorAll(".ant-slider-handle");

            sliderHandles?.forEach((handle, index) => {
                if (numUnits[index] !== undefined) {
                    handle?.setAttribute("aria-valuetext", `${numUnits[index]} units`);
                    if (index === 0) {
                        handle?.setAttribute("aria-label", "Minimum");
                    }
                    if (numUnits[index] === 18) {
                        handle?.setAttribute("aria-label", "Maximum");
                    }
                }
            });
        }
    }, [numUnits, sliderRef.current]);
    function convertTo12HourFormat(hour) {
        let period = hour >= 12 ? "pm" : "am";
        let hour12 = hour % 12 || 12;
        return `${hour12} ${period}`;
    }
    const handleExpandCollapseAll = () => {
        setCollapsedSections((prev) => {
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = areAllCollapsed ? true : false;
                return acc;
            }, {});
            return newState;
        });
        setIsWidthLessThan768()
    };

    useEffect(() => {
        if (Object?.entries(filteredSuggestions)?.length > 0) {
            setStatusMessage(
                `${Object?.entries(filteredSuggestions)?.length} results available below.`
            );
        } else {
            setStatusMessage("");
        }
    }, [filteredSuggestions]);
    const toolNumeberOfGenralEdcTipRef = useRef(null);
    useEffect(() => {
        // When tooltip becomes visible, focus the tooltip
        if (
            isTooltip === "Number of Units" &&
            toolNumeberOfGenralEdcTipRef.current
        ) {
            toolNumeberOfGenralEdcTipRef.current.focus();
        }
    }, [isTooltip]);
    const handleNumUnitsApplyBtn = () => {
        setNoOfUnitsModal(false);
        setHandleUnitsBtnClick(!handelUnitsBtnClick);
    };
    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target)) {
                setShowPopover(null); // Close popover when clicked outside
            }
        };

        const handleFocusOutside = (e) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target)) {
                setShowPopover(null); // Close popover on focus change outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("focusin", handleFocusOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("focusin", handleFocusOutside);
        };
    }, [setShowPopover]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        if (!focusedEventIdRef.current) return;

        const id = focusedEventIdRef.current;

        requestAnimationFrame(() => {
            const el = document.querySelector(
                `[data-event-id="${id}"]`
            );

            if (el) {
                el.focus();
            }

            focusedEventIdRef.current = null;
        });
    }, [selectedEvent, viewCalendarMode]);

    const minTime = new Date();
    minTime.setHours(8, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(21, 0, 0);

    const sliderTooltip = (value) => {
        return `${value} unit`;
    };
    const times = {
        7: "7am",
        21: "9pm",
    };
    const units = {
        0: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    0
                </span>
            </div>
        ),
        1: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    1
                </span>
            </div>
        ),
        2: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    2
                </span>
            </div>
        ),
        3: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    3
                </span>
            </div>
        ),
        4: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    4
                </span>
            </div>
        ),
        5: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    5
                </span>
            </div>
        ),
        6: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    6
                </span>
            </div>
        ),
        7: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    7
                </span>
            </div>
        ),
        8: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    8
                </span>
            </div>
        ),
        9: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    9
                </span>
            </div>
        ),
        10: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    10
                </span>
            </div>
        ),
        11: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    11
                </span>
            </div>
        ),
        12: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    12
                </span>
            </div>
        ),
        13: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    13
                </span>
            </div>
        ),
        14: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    14
                </span>
            </div>
        ),
        15: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    15
                </span>
            </div>
        ),
        16: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    16
                </span>
            </div>
        ),
        17: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    17
                </span>
            </div>
        ),
        18: (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "8px", fontWeight: "400", color: "#C0C0BF" }}>
                    |
                </span>
                <span style={{ fontSize: "12px", fontWeight: "400", color: "#C0C0BF" }}>
                    18
                </span>
            </div>
        ),
    };

    const formatter = (value) => {
        const hours = value % 24;
        const period = hours >= 12 ? "pm" : "am";
        const adjustedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${adjustedHours} ${period}`;
    };
    const timeRef = useRef(null);

    useEffect(() => {
        const formatTime = (value) => {
            const suffix = value >= 12 ? "PM" : "AM";
            const hour = value > 12 ? value - 12 : value;
            return `${hour} ${suffix}`;
        };
        if (timeRef.current) {
            const sliderHandles =
                timeRef.current.querySelectorAll(".ant-slider-handle");
            sliderHandles.forEach((handle, index) => {
                if (time[index] !== undefined) {
                    handle.setAttribute("aria-valuetext", formatTime(time[index]));
                    if (index === 0) {
                        handle?.setAttribute("aria-label", "Minimum");
                    }
                    if (time[index] === 21) {
                        handle?.setAttribute("aria-label", "Maximum");
                    }
                }
            });
        }
    }, [time, timeRef.current]);

    const modalRef = useRef(null);

    useEffect(() => {
        if (noOfUnitsModal && modalRef.current) {
            modalRef.current.setAttribute("aria-hidden", "true");
            setTimeout(() => {
                modalRef.current.removeAttribute("aria-hidden");
                closeModalButtonRef.current?.focus();
            }, 500);
        }
    }, [noOfUnitsModal]);
    const getSectionId = (sectionKey) => {
        const idMap = {
            'classStatus': 'classStatusRow',
            'days': 'daysRow',
            'instructor': 'instructorRow',
            'format': 'formatRow',
            'numberUnits': 'numberUnits',
            'time': 'timeRow',
            'campusLocation': 'classLevelRow',
            'classLevel': 'classLevelRow',
            'gradingBasis': 'classLevelRow',
            'curatedClass': 'curatedRow',
            'generalEducation': 'genEduRow',
            'schoolAndDepartment': 'schAndDeptRow',
            'conflictOptions': 'schAndDeptRow'
        };
        return idMap[sectionKey] || null;
    };
    const toggleSection = (section) => {
        setCollapsedSections((prevState) => {
            const newState = {
                ...prevState,
                [section]: !prevState[section],
            };

            // Scroll to section if it's being expanded
            if (newState[section]) {
                setTimeout(() => {
                    const sectionId = getSectionId(section);
                    const element = document.getElementById(sectionId);
                    const filterContainer = document.getElementById('filterOuterDiv');

                    if (element && filterContainer) {
                        const scrollTop = element.offsetTop - filterContainer.offsetTop;
                        filterContainer.scrollTo({
                            top: scrollTop,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }

            return newState;
        });
    };


    const toolNumeberOfUntisTipRef = useRef(null);
    useEffect(() => {
        // When tooltip becomes visible, focus the tooltip
        if (isTooltip === "Number of Units" && toolNumeberOfUntisTipRef.current) {
            toolNumeberOfUntisTipRef.current.focus();
        }
    }, [isTooltip]);

    const getGradingBasisCount = (value) => {
        const key = `by_gradingbasis_${value.toLowerCase()}`;
        return allAttCounts?.[key] ?? 0;
    };
    const tooltipRef = useRef(null);

    useEffect(() => {
        // When tooltip becomes visible, focus the tooltip
        if (isTooltip === "Curated Classes" && tooltipRef.current) {
            tooltipRef.current.focus();
        }
    }, [isTooltip]);
    const closeModalButtonRef = useRef(null);
    const CustomEventWrapper = ({ event, children }) => {
        const modifiedChild = isValidElement(children)
            ? cloneElement(children, {
                onClick: (e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    children.props.onClick?.(e);
                },
                onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();

                        // ✅ store focused event
                        focusedEventIdRef.current = event.id;

                        setSelectedEvent(event);

                        children.props.onKeyDown?.(e);
                    }
                },
            })
            : children;

        return (
            <>
                {modifiedChild}
                {/* {window.innerWidth >= 1024 ? (
                    <DayViewEventsData daysEventsData={event} />
                ) : (
                    selectedEvent?.id === event.id && (
                        <DayViewEventsData daysEventsData={event} />
                    )
                )} */}
            </>
        );
    };

    // ✅ loading state
    if (!blok) {
        return <div>Loading...</div>;
    }

    const filterByBlock = blok.searchFilters?.find(
        (item) => item.component === "searchfilters"
    );

    const clearAllBlock = blok.searchFilters?.find(
        (item) => item.component === "clearallfilters"
    );

    const expandAllBlock = blok.searchFilters?.find(
        (item) => item.component === "epxandall"
    );
    const classStatus = blok.searchFilters?.find(
        (item) => item.component === "classstatus"
    );
    const classdescription = blok.searchFilters?.find(
        (item) => item.component === "classsearchdesc"
    );
    const collapsedBlok = blok.searchFilters?.find(
        (item) => item.component === "collapseAll"
    );
    const classstatusToolTip = blok.searchFilters?.find(
        (item) => item.component === "classstatustooltip"
    );
    const Days = blok.searchFilters?.find(
        (item) => item.component === "Days"
    );
    const daysTooltip = blok.searchFilters?.find(
        (item) => item.component === "DaysTooltip"
    );
    const Instructor = blok.searchFilters?.find(
        (item) => item.component === "Instructor"
    );
    const instructorTooltip = blok.searchFilters?.find(
        (item) => item.component === "InstructorToolTip"
    );
    const Format = blok.searchFilters?.find(
        (item) => item.component === "Format"
    );
    const FormatToolTip = blok.searchFilters?.find(
        (item) => item.component === "FormatToolTip"
    );

    const NumberofUnits = blok.searchFilters?.find(
        (item) => item.component === "Number of Units"
    );
    const NumberofUnitsTooltip = blok.searchFilters?.find(
        (item) => item.component === "Number of units ToolTip"
    );
    const Time = blok.searchFilters?.find(
        (item) => item.component === "Time"
    );

    const TimeToolTip = blok.searchFilters?.find(
        (item) => item.component === "TimeToolTip"
    );
    const classlevel = blok.searchFilters?.find(
        (item) => item.component === "classlevel"
    );
    const classLevelToolTip = blok.searchFilters?.find(
        (item) => item.component === "classleveltooltip"
    )
    const gradingBasisTitle = blok.searchFilters?.find(
        (item) => item.component === "GradingBasis"
    );
    const curatedClasses = blok.searchFilters?.find(
        (item) => item.component === "Curated Classes"
    );

    const curatedClassesTooltip = blok.searchFilters?.find(
        (item) => item.component === "Curated Classes Tooltip"
    );
    const generalEducation = blok.searchFilters?.find(
        (item) => item.component === "General Education"
    );
    const generalEducationToolTip = blok.searchFilters?.find(
        (item) => item.component === "General Education ToolTip"
    );

    const schools = blok.searchFilters?.find(
        (item) => item.component === "Schools"
    );
    const schoolToolTip = blok.searchFilters?.find(
        (item) => item.component === "SchoolsToolTip"
    );
    const otherFilters = blok.searchFilters?.find(
        (item) => item.component === "Other Filters"
    );
    const applyButton = blok.searchFilters?.find(
        (item) => item.component === "Apply"
    );
    const clearAllButton = blok.searchFilters?.find(
        (item) => item.component === "clearall"
    );
    const showmore = blok.searchFilters?.find(
        (item) => item.component === "showmore"
    );
    const viewmyschedule = blok.searchFilters?.find(
        (item) => item.component === "viewmyschedule"
    );
    const donwarrow = blok.searchFilters?.find(
        (item) => item.component === "DownArrow"
    );
    return (

        <div className="classSearchPage">
            <div style={{
                width: '100%', display: 'flex'
            }}>
                <h2 style={{
                    marginBottom: '30px', backgroundColor: '#651c32', padding: '5px 1vw 5px 0.78125vw', borderRadius: '0.6295907660020986vh 0.3125vw 0 0', cursor: 'pointer',
                    flex: "0 0 calc(32% - 35px)",   // fixed in flex layout
                    width: "calc(32% - 30px)",
                    minWidth: "calc(32% - 30px)",
                    maxWidth: "calc(32% - 35px)",
                    boxSizing: "border-box",

                }} className="filterSidebar">
                    <Row
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#651c32",
                            width: "100%",
                            borderRadius: "0.6295907660020986vh 0.3125vw 0 0",
                            // boxShadow: "0px 0px 0.4197271773347324vh 0px #00000040",
                            // padding: "10px 1.4vw 10px 0.78125vw",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setDisplayCalendar(displayCalendar ? false : true);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                setDisplayCalendar(displayCalendar ? false : true);
                            }
                        }}
                        aria-expanded={displayCalendar ? true : false}
                        tabIndex="0"
                        role="button"
                        aria-label={
                            displayCalendar ? "My Schedule" : "View My Schedule"
                        }
                    >
                        <Col xxl={23} xl={23} lg={23} md={20} xs={23}>
                            <h2
                                style={{
                                    fontSize: "23px",
                                    fontWeight: "700",
                                    color: "#ffffff",
                                    margin: "0",

                                }}
                            // aria-expanded={displayCalendar ? true : false}
                            >
                                {displayCalendar ? viewmyschedule?.myschedule : viewmyschedule?.viewmyschedule}
                            </h2>

                        </Col>
                        <Col span={1}>
                            <img
                                src={displayCalendar ? donwarrow?.upArrow?.filename : donwarrow?.downArrow?.filename}
                                alt={
                                    displayCalendar ? "My Schedule" : "View My Schedule"
                                }
                                style={{
                                    height: "16px",
                                    cursor: "pointer",
                                }}
                            />
                        </Col>
                        {displayCalendar ? (
                            <div style={{ width: "100%" }}>
                                <Row
                                    style={{
                                        background: "#FFFFFF",
                                        width: "100%",
                                        margin: "2.0986358866736623vh 0 0 0",
                                        padding: "3.147953830010493vh 3.125vw 0 2.0833333333333335vw",
                                        // boxShadow: "0px 0px 0.4197271773347324vh 0px #00000040",
                                    }}
                                >
                                    {/* <Row style={{ height: "81.84679958027283vh", width: "100%" }} ref={calendarRef}>
                                        <Calendar
                                            className="scheduled-calendar"
                                            style={{ width: "100%" }}
                                            views={{ work_week: true }}
                                            popup={false}
                                            // onView={(view) => setCurrentView(view)}
                                            localizer={localizer}
                                            defaultDate={new Date()}
                                            defaultView={Views.WORK_WEEK}
                                            events={classEvents}
                                            step={60}
                                            timeslots={1}
                                            min={minTime}
                                            max={maxTime}
                                            components={{
                                                event: CalendarEventWrapper,
                                                toolbar: AllClassCalendarToolBar,
                                                eventContainerWrapper: CustomEventWrapper,
                                                eventWrapper: CustomEachEventWrapper,
                                                // header: (label, date) =>
                                                //   currentView === Views.WEEK ? (
                                                //     <CustomWeekHeader prop={{ label }} date={date} />
                                                //   ) : null,
                                                // week: {
                                                //   header: ({ label }) => <div className="rbc-header"></div>,
                                                // },
                                            }}
                                            formats={{
                                                timeGutterFormat: (date, culture, localizer) =>
                                                    localizer.format(date, "h a", culture),
                                                dayFormat: (date, culture, localizer) =>
                                                    localizer.format(date, "dd", culture),
                                                dateFormat: (date, culture, localizer) =>
                                                    localizer.format(date, "D", culture),
                                            }}
                                            drilldownView={null}
                                        // ariaRole="grid"
                                        />
                                    </Row> */}
                                    {/* <h3 className="visually-hidden">Legend</h3>
                                    <ul
                                        style={{
                                            display: "flex",
                                            width: "100%",
                                            flexDirection: isMobileView ? "row" : "row",
                                            alignItems: isMobileView && "center",
                                            gap: '10px',
                                            padding: '15px'
                                        }}
                                    >
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.4197271773347324vh 0.20833333333333334vw",
                                            }}
                                        >
                                            <img
                                                // tabIndex="0"
                                                // role="presentation"
                                                style={{ height: "1.888772298006296vh" }}
                                                // src={EnrollStatusIcon}
                                                alt="Green Checkmark within a circle indicating status as Enrolled"
                                            />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#272E5C",
                                                    margin: "0",
                                                }}
                                            >
                                                Enrolled
                                            </span>
                                        </li>
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.4197271773347324vh 0.20833333333333334vw",
                                            }}
                                        >
                                            <img
                                                // tabIndex="0"
                                                // role="presentation"
                                                style={{ height: "1.888772298006296vh" }}
                                                // src={WaitlistedIcon}
                                                alt="Raised hand icon indicating status as Waitlisted"
                                            />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#272E5C",
                                                    margin: "0",
                                                }}
                                            >
                                                Waitlisted
                                            </span>
                                        </li>
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.4197271773347324vh 0.20833333333333334vw",
                                            }}
                                        >
                                            <img
                                                // tabIndex="0"
                                                // role="presentation"
                                                style={{ height: "1.888772298006296vh" }}
                                                // src={NotePad_Icon}
                                                alt="Clipboard icon with a checkmark indicating status as Planned"
                                            />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#272E5C",
                                                    margin: "0",
                                                }}
                                            >
                                                Planned
                                            </span>
                                        </li>
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.4197271773347324vh 0.20833333333333334vw",
                                            }}
                                        >
                                            <img
                                                // tabIndex="0"
                                                // role="presentation"
                                                style={{ height: "1.888772298006296vh" }}
                                                // src={conflictIcon}
                                                alt="Clock icon indicating status as Conflict"
                                            />
                                            <span
                                                style={{
                                                    fontSize: "14px",
                                                    fontWeight: "600",
                                                    color: "#272E5C",
                                                    margin: "0",
                                                }}
                                            >
                                                Conflict
                                            </span>
                                        </li>
                                    </ul> */}
                                </Row>
                            </div>
                        ) : (
                            ""
                        )}
                    </Row>
                </h2>
            </div>

            <div className="classSearchLayout">


                {/* LEFT FILTER SIDEBAR */}
                <div className="filterSidebar" style={{ height: '60vh', overflowY: 'auto' }} >
                    <div className="filterHeader">

                        <h3 className="filterHeading">
                            {filterByBlock?.Title}
                        </h3>
                        <span className="clearAll">
                            {clearAllBlock?.Title}
                        </span>
                    </div>
                    <div className="expandAll">
                        <span onClick={handleExpandCollapseAll}>
                            {areAllCollapsed ? expandAllBlock?.Title : collapsedBlok?.Title}
                        </span>
                    </div>

                    <Row
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("classStatus");
                            }
                        }}

                        id="classStatusRow"
                        onClick={() => {
                            toggleSection("classStatus");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}

                        role="heading"
                        aria-level={3}
                    >
                        <div style={{ display: "flex", gap: '10px' }}>
                            <span
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.classStatus === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                <span>{classStatus?.Title}</span>
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Class Status")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Class Status");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Class Status");
                                            }
                                        }}
                                        onBlur={() => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Class Status"
                                            // aria-describedby="Class-Status"
                                            aria-expanded={
                                                isTooltip === "Class Status" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Class Status" && (
                                            <div
                                                id="Class-Status"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "2px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>
                                                    {classstatusToolTip.Title}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            className="deskTopPlusMinus"
                            {...(isWidthLessThan768 ? {} : { role: "button" })}
                            // {...(isWidthLessThan768 ? {} : { tabIndex: "0" })}
                            // onKeyDown={(e) => {
                            //     if (e.key === "Enter" || e.key === " ") {
                            //         toggleSection("classStatus");
                            //     }
                            // }}

                            // onClick={() => {
                            //     toggleSection("classStatus");
                            // }}
                            aria-hidden="true"
                        >
                            {collapsedSections?.classStatus ? "-" : "+"}
                        </span>
                    </Row>
                    {
                        collapsedSections?.classStatus && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {filter_data &&
                                    filter_data.class_status_filters.map((item) => {
                                        const displayValue = allAttCounts?.[
                                            `by_${item?.value
                                                .toLowerCase()
                                                .replaceAll(" ", "")}`
                                        ]
                                            ? "flex"
                                            : "flex";
                                        return (
                                            <Col
                                                key={item.key}
                                                style={{ display: displayValue }}
                                            >
                                                <Checkbox
                                                    className="class-status-filter-checkbox"
                                                    key={item.key}
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "400",
                                                    }}
                                                    onChange={(e) => handleClassStatus(e)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter" || e.key === " ") {
                                                            e.preventDefault(); // Prevent scrolling on Space key
                                                            handleClassStatus({
                                                                target: {
                                                                    checked: !classStatusAtt[item.value],
                                                                    value: item.value,
                                                                },
                                                            });
                                                        }
                                                    }}
                                                    checked={classStatusAtt?.[item?.value]}
                                                    value={item.value}
                                                >
                                                    {item.value + " "}(
                                                    {
                                                        allAttCounts?.[
                                                        `by_${item?.value
                                                            .toLowerCase()
                                                            .replaceAll(" ", "")}`
                                                        ]
                                                    }
                                                    )
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}
                            </Row>
                        )
                    }

                    <Row
                        // role={isMobileView ? "button" : "heading"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("days");
                            }
                        }}
                        id="daysRow"
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        onClick={() => {
                            toggleSection("days");
                        }}
                        role="heading"
                        aria-level={3}
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections.days === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {Days.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            // margin: "0px 3px -25px",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Days")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Days");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Days");

                                            }
                                        }}
                                        onBlur={(e) => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Days"
                                            aria-expanded={
                                                isTooltip === "Days" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                // display: "inline-flex",
                                                // alignItems: "center",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Days" && (
                                            <div
                                                id="Days"
                                                role="tooltip"
                                                // tabIndex={0}
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "100%",
                                                    transform: "translateX(-30%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "2px",
                                                    width: "200px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>{daysTooltip?.DaysToolTip}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            className="deskTopPlusMinus"
                            aria-hidden="true"
                        >
                            {collapsedSections?.days ? "-" : "+"}
                        </span>
                    </Row>

                    {
                        collapsedSections.days && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    margin: "1.0493179433368311vh 0 0 0",
                                    gap: "1.0493179433368311vh 0.5208333333333334vw",
                                    // width: "100%",
                                }}
                            >
                                <Col
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        margin: "1.0493179433368311vh 0 0 0",
                                        gap: "0.6vh 0.5208333333333334vw",
                                        width: "100%",
                                    }}
                                >
                                    <Checkbox
                                        className="days-filter-checkbox filterCheckbox"
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "400",
                                            display: allAttCounts?.by_day_mon ? "flex" : "flex",
                                        }}
                                        value="Monday"
                                        checked={mon}
                                        aria-labelledby="selectedDay"
                                        aria-checked={mon}
                                        onChange={(e) => handleMonSelect(e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                handleMonSelect({
                                                    target: { checked: !mon, value: "Monday" },
                                                });
                                            }
                                        }}
                                    >
                                        Monday ({allAttCounts?.by_day_mon || zeroValue})
                                    </Checkbox>
                                    <Checkbox
                                        className="days-filter-checkbox filterCheckbox"
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "400",
                                            display: allAttCounts?.by_day_tues
                                                ? "flex"
                                                : "flex",
                                        }}
                                        value="Tuesday"
                                        checked={tue}
                                        aria-labelledby="selectedDay"
                                        aria-checked={tue}
                                        onChange={(e) => handleTueSelect(e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                handleTueSelect({
                                                    target: { checked: !tue, value: "Tuesday" },
                                                });
                                            }
                                        }}
                                    >
                                        Tuesday ({allAttCounts?.by_day_tues || zeroValue})
                                    </Checkbox>
                                    <Checkbox
                                        className="days-filter-checkbox filterCheckbox"
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "400",
                                            display: allAttCounts?.by_day_wed ? "flex" : "flex",
                                        }}
                                        value="Wednesday"
                                        checked={wed}
                                        aria-labelledby="selectedDay"
                                        aria-checked={wed}
                                        onChange={(e) => handleWedSelect(e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                handleWedSelect({
                                                    target: { checked: !wed, value: "Wednesday" },
                                                });
                                            }
                                        }}
                                    >
                                        Wednesday ({allAttCounts?.by_day_wed || zeroValue})
                                    </Checkbox>
                                    <Checkbox
                                        className="days-filter-checkbox filterCheckbox"
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "400",
                                            display: allAttCounts?.by_day_thurs
                                                ? "flex"
                                                : "flex",
                                        }}
                                        value="Thursday"
                                        checked={thur}
                                        aria-labelledby="selectedDay"
                                        aria-checked={thur}
                                        onChange={(e) => handleThuSelect(e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                handleThuSelect({
                                                    target: { checked: !thur, value: "Thursday" },
                                                });
                                            }
                                        }}
                                    >
                                        Thursday ({allAttCounts?.by_day_thurs || zeroValue})
                                    </Checkbox>
                                    <Checkbox
                                        className="days-filter-checkbox filterCheckbox"
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: "400",
                                            display: allAttCounts?.by_day_fri ? "flex" : "flex",
                                        }}
                                        value="Friday"
                                        checked={fri}
                                        aria-labelledby="selectedDay"
                                        aria-checked={fri}
                                        onChange={(e) => handleFriSelect(e)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                handleFriSelect({
                                                    target: { checked: !fri, value: "Friday" },
                                                });
                                            }
                                        }}
                                    >
                                        Friday ({allAttCounts?.by_day_fri || zeroValue})
                                    </Checkbox>
                                </Col>
                                <u
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#007C92",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setShowMoreDays(true);
                                        setGlobalModalOpen(true);
                                        setIsOpenForUseEffect(true);
                                    }}
                                    tabIndex="0"
                                    aria-label="Show more days"
                                    role="button"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setShowMoreDays(true);
                                            setGlobalModalOpen(true);
                                            setIsOpenForUseEffect(true);
                                        }
                                    }}
                                >
                                    {showmore?.Title}
                                </u>
                                {/* Days Modal */}
                                <Modal
                                    centered
                                    width={() => getModalWidth()}
                                    open={showMoreDays}
                                    closable={false}
                                    footer={false}
                                    keyboard={true}
                                    onCancel={() => {
                                        setShowMoreDays(false);
                                    }} style={{
                                        borderRadius: "5px",
                                    }}

                                    afterOpenChange={(open) => {
                                        if (open) {
                                            const modals = document.querySelectorAll(".ant-modal");

                                            modals.forEach((modal) => {
                                                const style = window.getComputedStyle(modal);
                                                if (style.display !== "none") {
                                                    modal.setAttribute("aria-label", "Days");

                                                    const ariaHiddenDivs = modal.querySelectorAll('div[aria-hidden="true"]');
                                                    ariaHiddenDivs.forEach((div) => {
                                                        if (div.childNodes.length === 0 && div.offsetWidth === 0 && div.offsetHeight === 0) {
                                                            div.remove();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }}

                                >
                                    <div
                                    >
                                        <Row
                                            style={{ display: "flex", justifyContent: "end" }}
                                        >
                                            <CloseOutlined
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        setShowMoreDays(false);

                                                    }
                                                }}
                                                aria-label="close"
                                                role="button"
                                                onClick={() => {
                                                    setShowMoreDays(false);

                                                }}
                                            />
                                        </Row>
                                        <Row className="dayModalInnerDiv" >
                                            <Row style={{ width: "100%" }} >
                                                <span className="dayModalText">Days</span>
                                            </Row>

                                            <Row className="dayModalBody" >
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Monday"
                                                        checked={mon}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={mon}
                                                        onChange={(e) => handleMonSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleMonSelect({
                                                                    target: {
                                                                        checked: !mon,
                                                                        value: "Monday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_mon
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Monday (
                                                        {allAttCounts?.by_day_mon || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Tuesday"
                                                        checked={tue}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={mon}
                                                        onChange={(e) => handleTueSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleTueSelect({
                                                                    target: {
                                                                        checked: !tue,
                                                                        value: "Tuesday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_tues
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Tuesday (
                                                        {allAttCounts?.by_day_tues || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Wednesday"
                                                        checked={wed}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={wed}
                                                        onChange={(e) => handleWedSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleWedSelect({
                                                                    target: {
                                                                        checked: !wed,
                                                                        value: "Wednesday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_wed
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Wednesday (
                                                        {allAttCounts?.by_day_wed || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Thursday"
                                                        checked={thur}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={thur}
                                                        onChange={(e) => handleThuSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleThuSelect({
                                                                    target: {
                                                                        checked: !thur,
                                                                        value: "Thursday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_thurs
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Thursday (
                                                        {allAttCounts?.by_day_thurs || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Friday"
                                                        checked={fri}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={fri}
                                                        onChange={(e) => handleFriSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleFriSelect({
                                                                    target: {
                                                                        checked: !fri,
                                                                        value: "Friday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_fri
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Friday (
                                                        {allAttCounts?.by_day_fri || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Saturday"
                                                        checked={sat}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={sat}
                                                        onChange={(e) => handleSatSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleSatSelect({
                                                                    target: {
                                                                        checked: !sat,
                                                                        value: "Saturday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_sat
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Saturday (
                                                        {allAttCounts?.by_day_sat || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                                <Col className="dayModalBodyCol">
                                                    <Checkbox
                                                        className="days-filter-checkbox filterCheckbox dayModalInnerText"
                                                        value="Sunday"
                                                        checked={sun}
                                                        aria-labelledby="selectedDay"
                                                        aria-checked={sun}
                                                        onChange={(e) => handleSunSelect(e)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter" || e.key === " ") {
                                                                e.preventDefault(); // Prevent scrolling when pressing Space
                                                                handleSunSelect({
                                                                    target: {
                                                                        checked: !sat,
                                                                        value: "Sunday",
                                                                    },
                                                                });
                                                            }
                                                        }}
                                                        style={{
                                                            display: allAttCounts?.by_day_sun
                                                                ? "flex"
                                                                : "flex",
                                                        }}
                                                    >
                                                        Sunday (
                                                        {allAttCounts?.by_day_sun || zeroValue})
                                                    </Checkbox>
                                                </Col>
                                            </Row>
                                            <Row className="dayModalFooter" >
                                                <Button
                                                    style={{
                                                        backgroundColor: !isApplyBtnHovered
                                                            ? "#006B81"
                                                            : "#620059",
                                                        color: "#FFFFFF",
                                                        borderRadius: "6px",
                                                        border: !isApplyBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                    }}
                                                    className="dayModalFooterBtn"
                                                    onMouseOver={handleApplyBtnMouseOver}
                                                    onMouseOut={handleApplyBtnMouseOut}
                                                    onClick={() => {
                                                        setShowMoreDays(false);
                                                        setGlobalModalOpen(false);
                                                        setIsOpenForUseEffect(false);
                                                    }}
                                                >
                                                    {applyButton?.Title}
                                                </Button>
                                                <Button
                                                    style={{
                                                        border: !isClearAllBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: !isClearAllBtnHovered
                                                            ? "#007C92"
                                                            : "#620059",
                                                    }}
                                                    className="dayModalFooterBtn"
                                                    onMouseOver={handleClearAllBtnMouseOver}
                                                    onMouseOut={handleClearAllBtnMouseOut}
                                                    onClick={(e) => {
                                                        handleClearAll(e);
                                                        handleclearDays();
                                                    }}
                                                >
                                                    {clearAllButton?.Title}
                                                </Button>
                                            </Row>
                                        </Row>
                                    </div>
                                </Modal>
                            </Row>
                        )
                    }

                    <Row
                        id="instructorRow"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("instructor");
                            }
                        }}

                        onClick={() => {
                            toggleSection("instructor");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}

                        role="heading"
                        aria-level="3"
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span

                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.instructor === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {Instructor?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Instructor")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Instructor");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Instructor");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Instructor"
                                            aria-expanded={
                                                isTooltip === "Instructor" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",

                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Instructor" && (
                                            <div
                                                id="Instructor-info"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "2px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>
                                                    {instructorTooltip?.InstructorToolTip}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }

                        </div>
                        <span
                            className="deskTopPlusMinus"

                            aria-hidden="true"
                        >
                            {collapsedSections?.instructor ? "-" : "+"}
                        </span>
                    </Row>
                    {
                        collapsedSections?.instructor && (

                            <>
                                <Row
                                    className="row-focus-wrapper"
                                    style={{
                                        width: "100%",
                                        margin: "1.5739769150052465vh 0 0 0",
                                    }}
                                >
                                    <Input
                                        className="instructor-search-bar"
                                        style={{
                                            width: "244px",
                                            height: "36px",
                                            fontSize: "17px",
                                        }}
                                        placeholder="Search"
                                        value={instructorData}
                                        onChange={handleInstructorData}
                                        aria-label="Search instructors"

                                        suffix={
                                            <SearchOutlined
                                                style={{
                                                    fontSize: "20px",
                                                }}
                                            />
                                        }
                                    />
                                </Row>

                                <div
                                    aria-live="polite"
                                    aria-atomic="true"
                                    className="sr-only"
                                >
                                    {statusMessage}
                                </div>
                                <Row
                                    style={{
                                        width: "100%",
                                        margin: "1.5739769150052465vh 0 0 0",
                                    }}
                                >
                                    {Object?.entries(filteredSuggestions)?.length > 0 && (
                                        <div
                                            className="suggestions"
                                            onMouseDown={(e) => e.preventDefault()}
                                            role="group"
                                            aria-label="Instructor filters"
                                        >
                                            {Object?.entries(filteredSuggestions)?.map(
                                                ([instructor, value], index) => (
                                                    <div
                                                        key={index}
                                                        className="suggestion-item"
                                                        onClick={(e) =>
                                                            handleInstCheckboxChange(e, instructor)
                                                        }
                                                    >
                                                        <label
                                                            htmlFor={`inst-${index}`}
                                                            id={`label-inst-${index}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedItems.includes(
                                                                    instructor
                                                                )}
                                                                id={`inst-${index}`}
                                                                aria-checked={selectedItems.includes(
                                                                    instructor
                                                                )}
                                                            />
                                                            {instructor} {" (" + value + ")"}
                                                        </label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </Row>
                            </>
                        )
                    }

                    <Row
                        id="formatRow"
                        // role={isMobileView ? "button" : "heading"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("format");
                            }
                        }}
                        onClick={() => {
                            toggleSection("format");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        role="heading"
                        aria-level="3"
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.format === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {Format?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Format")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Format");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Format");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Format"
                                            aria-expanded={
                                                isTooltip === "Format" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Format" && (
                                            <div
                                                id="Format-info"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-30%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>{FormatToolTip?.FormatToolTip}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            className="deskTopPlusMinus"
                            aria-hidden="true"
                        >
                            {collapsedSections?.format ? "-" : "+"}
                        </span>
                    </Row>
                    {
                        collapsedSections?.format && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {filter_data &&
                                    filter_data.format_filters.map((item) => {
                                        const displayValue = allAttCounts?.[
                                            `by_${item?.value
                                                .toLowerCase()
                                                .replaceAll(" ", "")}`
                                        ]
                                            ? "flex"
                                            : "flex";
                                        return (
                                            <Col
                                                key={item.key}
                                                style={{ display: displayValue }}
                                            >
                                                <Checkbox
                                                    className="format-filter-checkbox"
                                                    key={item.key}
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "400",
                                                    }}
                                                    value={item.value}
                                                    checked={formatAtt?.[item?.value]}
                                                    onChange={(e) => handleFormatSelect(e)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                            e.preventDefault();
                                                            const syntheticEvent = {
                                                                target: {
                                                                    value: item.value,
                                                                    checked: !formatAtt?.[item.value],
                                                                },
                                                            };
                                                            handleFormatSelect(syntheticEvent);
                                                        }
                                                    }}
                                                >
                                                    {item.value} (
                                                    {allAttCounts?.[
                                                        `by_${item?.value
                                                            .toLowerCase()
                                                            .replaceAll(" ", "")}`
                                                    ] || zeroValue}
                                                    )
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}
                                <u
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#007C92",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setShowMoreFormats(true);
                                        setGlobalModalOpen(true);
                                        setIsOpenForUseEffect(true);
                                    }}
                                    tabIndex="0"
                                    aria-label="Show more format"
                                    role="button"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setShowMoreFormats(true);
                                            setGlobalModalOpen(true);
                                            setIsOpenForUseEffect(true);
                                        }
                                    }}
                                >
                                    {showmore?.Title}
                                </u>
                                {/* Format Modal */}
                                <Modal
                                    width={() => getModalWidth()}
                                    centered
                                    open={showMoreFormats}
                                    closable={false}
                                    footer={false}
                                    style={{
                                        borderRadius: "5px",
                                    }}
                                    keyboard={true}
                                    onCancel={() => {
                                        // setCourseFormat([]);
                                        // setFormatAtt({});
                                        setShowMoreFormats(false);

                                    }}
                                    afterOpenChange={(open) => {
                                        if (open && showMoreFormats) {
                                            const modals = document.querySelectorAll(".ant-modal");

                                            modals.forEach((modal) => {
                                                const style = window.getComputedStyle(modal);
                                                if (style.display !== "none") {
                                                    modal.setAttribute("aria-label", "Format");

                                                    const ariaHiddenDivs = modal.querySelectorAll('div[aria-hidden="true"]');
                                                    ariaHiddenDivs.forEach((div) => {
                                                        if (div.childNodes.length === 0 && div.offsetWidth === 0 && div.offsetHeight === 0) {
                                                            div.remove();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }}
                                >
                                    <div>
                                        <Row
                                            style={{ display: "flex", justifyContent: "end" }}
                                        >
                                            <CloseOutlined
                                                tabIndex={0}
                                                aria-label="close"
                                                role="button"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        setShowMoreFormats(false);
                                                        setGlobalModalOpen(false);
                                                        setIsOpenForUseEffect(false);
                                                    }
                                                }}
                                                onClick={() => {
                                                    setShowMoreFormats(false);
                                                    setGlobalModalOpen(false);
                                                    setIsOpenForUseEffect(false);
                                                }}
                                                style={{ fontSize: "18px", color: "#016895" }}
                                            />
                                        </Row>
                                        <Row
                                            className="formatModalBodyOuter"
                                        >
                                            <Row style={{ width: "100%" }}>
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                        fontWeight: "700",
                                                        color: "#272E5C",
                                                    }}
                                                >
                                                    Format
                                                </span>
                                            </Row>

                                            <Row
                                                className="formatModalInnerBody"
                                            >
                                                {filter_data &&
                                                    filter_data.formats_filters.map((item) => {
                                                        const displayValue = allAttCounts?.[
                                                            `by_${item?.value
                                                                .toLowerCase()
                                                                .replaceAll(" ", "")}`
                                                        ]
                                                            ? "flex"
                                                            : "flex";
                                                        return (
                                                            <Col
                                                                className="formatModalElement"
                                                                key={item.key}
                                                                style={{ display: displayValue }}
                                                            >
                                                                <Checkbox
                                                                    className="format-filter-checkbox formatModalCheckbox"
                                                                    key={item.key}
                                                                    value={item.value}
                                                                    checked={formatAtt?.[item?.value]}
                                                                    onChange={(e) => handleFormatSelect(e)}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter' || e.key === ' ') {
                                                                            e.preventDefault();
                                                                            const syntheticEvent = {
                                                                                target: {
                                                                                    value: item.value,
                                                                                    checked: !formatAtt?.[item.value],
                                                                                },
                                                                            };
                                                                            handleFormatSelect(syntheticEvent);
                                                                        }
                                                                    }}
                                                                >
                                                                    {item.value} (
                                                                    {allAttCounts?.[
                                                                        `by_${item?.value
                                                                            .toLowerCase()
                                                                            .replaceAll(" ", "")}`
                                                                    ] || zeroValue}
                                                                    )
                                                                </Checkbox>
                                                            </Col>
                                                        );
                                                    })}
                                            </Row>
                                            <Row
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    width: "100%",
                                                    gap: "15px",
                                                    marginTop: "20px",
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor: !isApplyBtnHovered
                                                            ? "#006B81"
                                                            : "#620059",
                                                        border: !isApplyBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: "#FFFFFF",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onClick={() => {
                                                        setShowMoreFormats(false);
                                                        setGlobalModalOpen(false);
                                                        setIsOpenForUseEffect(false);
                                                    }}
                                                    onMouseOver={handleApplyBtnMouseOver}
                                                    onMouseOut={handleApplyBtnMouseOut}
                                                >
                                                    {applyButton?.Title}
                                                </Button>
                                                <Button
                                                    style={{
                                                        border: !isClearAllBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: !isClearAllBtnHovered
                                                            ? "#007C92"
                                                            : "#620059",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onMouseOver={handleClearAllBtnMouseOver}
                                                    onMouseOut={handleClearAllBtnMouseOut}
                                                    onClick={() => {
                                                        handleClearAllFormat();
                                                    }}
                                                >
                                                    {clearAllButton?.Title}
                                                </Button>
                                            </Row>
                                        </Row>
                                    </div>
                                </Modal>
                            </Row>
                        )
                    }

                    <Row
                        id="numberUnits"
                        // role={isMobileView ? "button" : "heading"}
                        // aria-level={3}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("numberUnits");
                            }
                        }}

                        onClick={() => {
                            toggleSection("numberUnits");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: "space-between"
                        }}
                        // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                        // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                        role="heading"
                        aria-level="3"
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                // {...(window.innerWidth < 993 && {
                                //     tabIndex: "0",
                                //     "aria-expanded":
                                //         collapsedSections?.numberUnits === true ? "true" : "false",
                                // })}
                                // role={isWidthLessThan768 ? "button" : 'heading'}
                                // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.numberUnits === true ? "true" : "false"}

                                // onKeyDown={(e) => {
                                //   if (e.key === "Enter" || e.key === " ") {
                                //     toggleSection("numberUnits");
                                //   }
                                // }}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {NumberofUnits?.NumberofUnits}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            top: "4px",
                                        }}
                                        ref={toolNumeberOfUntisTipRef}
                                        onMouseEnter={() => setIsToolTip("Number of Units")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Number of Units");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Number of Units");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            if (
                                                !e.currentTarget.contains(e.relatedTarget) &&
                                                !tooltipRef.current?.contains(e.relatedTarget)
                                            ) {
                                                setIsToolTip(null);
                                            }
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Number of Units"
                                            aria-expanded={
                                                isTooltip === "Number of Units" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",

                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Number of Units" && (
                                            <div
                                                id="Number-of-Units-info"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "2px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <span>
                                                    {NumberofUnitsTooltip?.NumberofUnitsToolTip}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            className="deskTopPlusMinus"
                            aria-hidden="true"
                        >
                            {collapsedSections?.numberUnits ? "-" : "+"}
                        </span>
                    </Row>

                    {
                        collapsedSections?.numberUnits && (
                            <Row
                                style={{
                                    width: "100%",
                                    margin: "15px 0 0 0",
                                }}
                            >
                                <Button
                                    className="time-dropdown-btn"
                                    style={{ fontSize: "17px", border: '1px solid black' }}
                                    onClick={() => {
                                        setNoOfUnitsModal(true);
                                    }}
                                >
                                    {numUnits[0] == 0 && numUnits[1] == 18
                                        ? "0 - 18 units"
                                        : `${numUnits[0]} - ${numUnits[1]} units`}
                                    <DownOutlined style={{ fontSize: "15px" }} />
                                </Button>
                                {/* Number of Units Modal */}
                                <Modal
                                    centered
                                    width={"411px"}
                                    open={noOfUnitsModal}
                                    closable={false}
                                    footer={false}
                                    keyboard={true}
                                    onCancel={() => {
                                        // setNumUnits([0, 18]);
                                        setNoOfUnitsModal(false);
                                    }}
                                    style={{
                                        borderRadius: "5px",
                                    }}
                                    modalRender={(node) => (
                                        <div ref={modalRef} aria-live="off">
                                            {node}
                                        </div>
                                    )}
                                    afterOpenChange={(open) => {
                                        if (open && noOfUnitsModal) {
                                            const modals = document.querySelectorAll(".ant-modal");

                                            modals.forEach((modal) => {
                                                const style = window.getComputedStyle(modal);
                                                if (style.display !== "none") {
                                                    modal.setAttribute("aria-label", "Number of units");

                                                    const ariaHiddenDivs = modal.querySelectorAll('div[aria-hidden="true"]');
                                                    ariaHiddenDivs.forEach((div) => {
                                                        if (div.childNodes.length === 0 && div.offsetWidth === 0 && div.offsetHeight === 0) {
                                                            div.remove();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }}
                                // getContainer={false}
                                >
                                    <div>
                                        <Row
                                            style={{ display: "flex", justifyContent: "end" }}
                                        >
                                            <CloseOutlined
                                                ref={closeModalButtonRef}
                                                tabIndex={0}
                                                aria-label="close"
                                                role="button"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        setNoOfUnitsModal(false);
                                                    }
                                                }}
                                                onClick={() => setNoOfUnitsModal(false)}
                                                style={{ fontSize: "18px", color: "#016895" }}
                                            />
                                        </Row>
                                        <Row className="numUnitsOuterDiv">
                                            <Row style={{ width: "100%" }}>
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                        fontWeight: "700",
                                                        color: "#272E5C",
                                                    }}
                                                >
                                                    {NumberofUnits?.NumberofUnits}
                                                </span>
                                            </Row>
                                            {numUnits[0] == 0 && numUnits[1] == 18 ? (
                                                <Row
                                                    style={{
                                                        width: "100%",
                                                        padding: "40px 0 40px 0",
                                                    }}
                                                >
                                                    <div
                                                        style={{ width: "100%" }}
                                                        ref={sliderRef}
                                                    >
                                                        <Slider
                                                            // aria-valuemax={}
                                                            style={{ width: "100%" }}
                                                            min={0}
                                                            max={18}
                                                            step={1}
                                                            value={numUnits}
                                                            onChange={handleNumUnits}
                                                            tooltip={{ formatter: sliderTooltip }}
                                                            marks={units}
                                                            range={{
                                                                draggableTrack: true,
                                                            }}
                                                            defaultValue={[7, 12]}
                                                            role="slider"
                                                            aria-label="Number of units selector"
                                                        />
                                                    </div>
                                                </Row>
                                            ) : (
                                                <Row
                                                    style={{
                                                        width: "100%",
                                                        padding: "40px 0 40px 0",
                                                    }}
                                                >
                                                    <div style={{ width: "100%" }} ref={sliderRef}>
                                                        <Slider
                                                            style={{ width: "100%" }}
                                                            class="numberOfUnitsSlider"
                                                            min={0}
                                                            max={18}
                                                            step={1}
                                                            value={numUnits}
                                                            onChange={handleNumUnits}
                                                            tooltip={{ formatter: sliderTooltip }}
                                                            marks={units}
                                                            range={{
                                                                draggableTrack: true,
                                                            }}
                                                            defaultValue={[7, 12]}
                                                            aria-label="Number of units selector"
                                                        />
                                                    </div>
                                                </Row>
                                            )}
                                            <Row
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    width: "100%",
                                                    gap: "15px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor: !isApplyBtnHovered
                                                            ? "#006B81"
                                                            : "#620059",
                                                        border: !isApplyBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: "#FFFFFF",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onClick={() => handleNumUnitsApplyBtn()}
                                                    onMouseOver={handleApplyBtnMouseOver}
                                                    onMouseOut={handleApplyBtnMouseOut}
                                                >
                                                    {applyButton?.Title}
                                                </Button>
                                                <Button
                                                    style={{
                                                        border: !isClearAllBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: !isClearAllBtnHovered
                                                            ? "#007C92"
                                                            : "#620059",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onClick={() => {
                                                        setNumUnits([0, 18])
                                                    }}
                                                    onMouseOver={handleClearAllBtnMouseOver}
                                                    onMouseOut={handleClearAllBtnMouseOut}
                                                >
                                                    {clearAllButton?.Title}
                                                </Button>
                                            </Row>
                                        </Row>
                                    </div>
                                </Modal>
                            </Row>
                        )
                    }
                    <Row
                        id="timeRow"
                        // aria-level={3}
                        // role={isMobileView ? "button" : "heading"}

                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("time");
                            }
                        }}
                        onClick={() => {
                            toggleSection("time");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        role="heading"
                        aria-level="3"
                    // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                    // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                // {...(window.innerWidth < 993 && {
                                //     tabIndex: "0",
                                //     "aria-expanded":
                                //         collapsedSections?.time === true ? "true" : "false",
                                // })}
                                // role={isWidthLessThan768 ? "button" : 'heading'}
                                // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.time === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter" || e.key === " ") {
                            //     toggleSection("time");
                            //   }
                            // }}
                            >
                                {Time?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    < div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            // margin: "0px 3px -25px",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Start Time")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Start Time");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Start Time");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Start Time"
                                            // aria-describedby="Start-Time-info"
                                            aria-expanded={
                                                isTooltip === "Start Time" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                // display: "inline-flex",
                                                // alignItems: "center",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Start Time" && (
                                            <div
                                                id="Start-Time-info"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "8px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>
                                                    {TimeToolTip?.TimeToolTip}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>

                        <span
                            // onClick={() => toggleSection("time")}
                            className="deskTopPlusMinus"
                            // tabIndex="0"
                            // aria-label="Close time"
                            // role="button"
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter" || e.key === " ") {
                            //     toggleSection("time");
                            //   }
                            // }}
                            aria-hidden="true"
                        >
                            {collapsedSections?.time ? "-" : "+"}
                        </span>
                    </Row>

                    {
                        collapsedSections?.time && (
                            <Row
                                style={{
                                    width: "100%",
                                    margin: "15px 0 0 0",
                                }}
                            >
                                <Button
                                    className="time-dropdown-btn"
                                    aria-label={
                                        time[0] === 7 && time[1] === 21
                                            ? "Change start time, currently 7 am - 9 pm"
                                            : `Change time, currently ${convertTo12HourFormat(
                                                time[0]
                                            )} - ${convertTo12HourFormat(time[1])}`
                                    }
                                    onClick={() => {
                                        setTimeModal(true);
                                    }}
                                    style={{ fontSize: "17px", border: '1px solid black' }}
                                >
                                    {time[0] === 7 && time[1] === 21
                                        ? `7 am - 9 pm`
                                        : `${convertTo12HourFormat(
                                            time[0]
                                        )} - ${convertTo12HourFormat(time[1])}`}
                                    <DownOutlined style={{ fontSize: "18px" }} />
                                </Button>
                                {/* Time Modal */}
                                <Modal
                                    centered
                                    width={"411px"}
                                    open={timeModal}
                                    closable={false}
                                    footer={false}
                                    keyboard={true}
                                    onCancel={() => {
                                        // setTime([7, 21]);
                                        setTimeModal(false);
                                    }}
                                    style={{
                                        borderRadius: "5px",
                                    }}
                                    modalRender={(node) => (
                                        <div ref={modalStartTimeRef} aria-live="off">
                                            {node}
                                        </div>
                                    )}
                                    afterOpenChange={(open) => {
                                        if (open && timeModal) {
                                            const modals = document.querySelectorAll(".ant-modal");

                                            modals.forEach((modal) => {
                                                const style = window.getComputedStyle(modal);
                                                if (style.display !== "none") {
                                                    modal.setAttribute("aria-label", "Start Time");

                                                    const ariaHiddenDivs = modal.querySelectorAll('div[aria-hidden="true"]');
                                                    ariaHiddenDivs.forEach((div) => {
                                                        if (div.childNodes.length === 0 && div.offsetWidth === 0 && div.offsetHeight === 0) {
                                                            div.remove();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }}
                                >
                                    <div
                                    >
                                        <Row
                                            style={{ display: "flex", justifyContent: "end" }}
                                        >
                                            <CloseOutlined
                                                ref={closeButtonStartTimeRef}
                                                tabIndex={0}
                                                aria-label="close"
                                                role="button"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        setTimeModal(false);
                                                    }
                                                }}
                                                onClick={() => setTimeModal(false)}
                                                style={{ fontSize: "18px", color: "#016895" }}
                                            />
                                        </Row>
                                        <Row
                                            style={{ width: "350px", margin: "5px 0 0 0" }}
                                        >
                                            <Row style={{ width: "100%" }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                        fontWeight: "700",
                                                        color: "#272E5C",
                                                    }}
                                                >
                                                    Select time
                                                </span>
                                            </Row>
                                            {time[0] == 7 && time[1] == 21 ? (
                                                <Row
                                                    style={{
                                                        width: "100%",
                                                        padding: "40px 0 40px 0",
                                                    }}
                                                >
                                                    <div
                                                        style={{ width: "100%" }}
                                                        ref={timeRef}
                                                    >
                                                        <Slider
                                                            style={{ width: "100%" }}
                                                            range={{
                                                                draggableTrack: true,
                                                            }}
                                                            marks={times}
                                                            defaultValue={[7, 21]}
                                                            value={time}
                                                            onChange={handleTime}
                                                            min={7}
                                                            max={21}
                                                            tipFormatter={formatter}
                                                            tooltip={{
                                                                formatter: (value) => (
                                                                    <Tooltip
                                                                        style={{ backgroundColor: "#FFFFFF" }}
                                                                        title={formatter(value)}
                                                                    >
                                                                        {formatter(value)}
                                                                    </Tooltip>
                                                                ),
                                                            }}
                                                            aria-label="Time selector"
                                                        />
                                                    </div>
                                                </Row>
                                            ) : (
                                                <Row
                                                    style={{
                                                        width: "100%",
                                                        padding: "40px 0 40px 0",
                                                    }}
                                                >
                                                    <div
                                                        style={{ width: "100%" }}
                                                        ref={timeRef}
                                                    >
                                                        <Slider
                                                            style={{ width: "100%" }}
                                                            range={{
                                                                draggableTrack: true,
                                                            }}
                                                            marks={times}
                                                            defaultValue={[7, 21]}
                                                            value={time}
                                                            onChange={handleTime}
                                                            min={7}
                                                            max={21}
                                                            tipFormatter={formatter}
                                                            tooltip={{
                                                                formatter: (value) => (
                                                                    <Tooltip
                                                                        style={{ backgroundColor: "#FFFFFF" }}
                                                                        title={formatter(value)}
                                                                    >
                                                                        {formatter(value)}
                                                                    </Tooltip>
                                                                ),
                                                            }}
                                                            aria-label="Time selector"
                                                        />
                                                    </div>
                                                </Row>
                                            )}
                                            <Row
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                    width: "100%",
                                                    gap: "15px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor: !isApplyBtnHovered
                                                            ? "#006B81"
                                                            : "#620059",
                                                        border: !isApplyBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: "#FFFFFF",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onMouseOver={handleApplyBtnMouseOver}
                                                    onMouseOut={handleApplyBtnMouseOut}
                                                    onClick={() => handleTimeApplyBtn()}
                                                >
                                                    {applyButton?.Title}
                                                </Button>
                                                <Button
                                                    style={{
                                                        border: !isClearAllBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: !isClearAllBtnHovered
                                                            ? "#007C92"
                                                            : "#620059",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onClick={() => {
                                                        setTime([7, 21])
                                                    }}
                                                    onMouseOver={handleClearAllBtnMouseOver}
                                                    onMouseOut={handleClearAllBtnMouseOut}
                                                >
                                                    {clearAllButton?.Title}
                                                </Button>
                                            </Row>
                                        </Row>
                                    </div>
                                </Modal>
                            </Row>
                        )
                    }

                    <Row
                        id="classLevelRow"
                        // aria-level={3}
                        // role={isMobileView ? "button" : "heading"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("classLevel");
                            }
                        }}

                        onClick={() => {
                            toggleSection("classLevel");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        role="heading"
                        aria-level="3"
                    // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                    // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                // {...(window.innerWidth < 993 && {
                                //     tabIndex: "0",
                                //     "aria-expanded":
                                //         collapsedSections?.classLevel === true ? "true" : "false",
                                // })}
                                // role={isWidthLessThan768 ? "button" : 'heading'}
                                // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.classLevel === true ? "true" : "false"}                                            // onKeyDown={(e) => {
                                //   if (e.key === "Enter" || e.key === " ") {
                                //     toggleSection("classLevel");
                                //   }
                                // }}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {classlevel?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            // margin: "0px 3px -25px",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Class Level")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Class Level");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Class Level");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Class Level"
                                            // aria-describedby="Class-Level-info"
                                            aria-expanded={
                                                isTooltip === "Class Level" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                // display: "inline-flex",
                                                // alignItems: "center",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Class Level" && (
                                            <div
                                                id="Class-Level-info"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "8px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>
                                                    {classLevelToolTip?.classLevelToolTip}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            // onClick={() => toggleSection("classLevel")}
                            className="deskTopPlusMinus"
                            // tabIndex="0"
                            // aria-label="Close class Level list"
                            // role="button"
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter" || e.key === " ") {
                            //     toggleSection("classLevel");
                            //   }
                            // }}
                            aria-hidden="true"
                        >
                            {collapsedSections?.classLevel ? "-" : "+"}
                        </span>
                    </Row>

                    {
                        collapsedSections?.classLevel && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {filter_data &&
                                    filter_data.class_level_filters.map((item) => {
                                        const displayValue = allAttCounts?.[
                                            `by_${item?.value
                                                .toLowerCase()
                                                .replaceAll(" ", "")}`
                                        ]
                                            ? "flex"
                                            : "flex";
                                        return (
                                            <Col
                                                key={item.key}
                                                style={{ display: displayValue }}
                                            >
                                                <Checkbox
                                                    className="class-level-filter-checkbox"
                                                    key={item.key}
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "400",
                                                    }}
                                                    onChange={(e) => handleClassLevel(e)}
                                                    value={item.value}
                                                    checked={classLevelAtt?.[item?.value]}
                                                >
                                                    {item.value + " "}(
                                                    {allAttCounts?.[
                                                        `by_${item?.value
                                                            .toLowerCase()
                                                            .replaceAll(" ", "")}`
                                                    ] || zeroValue}
                                                    )
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}
                            </Row>
                        )
                    }
                    {
                        <Row
                            id="classLevelRow"
                            // aria-level={3}
                            // role={isMobileView ? "button" : "heading"}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    toggleSection("gradingBasis");
                                }
                            }}

                            onClick={() => {
                                toggleSection("gradingBasis");
                            }}
                            style={{
                                cursor: "pointer",
                                justifyContent: 'space-between'
                            }}
                            role="heading"
                            aria-level="3"
                        // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                        // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                        >
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span
                                    // {...(window.innerWidth < 993 && {
                                    //     tabIndex: "0",
                                    //     "aria-expanded":
                                    //         collapsedSections?.classLevel === true ? "true" : "false",
                                    // })}
                                    // role={isWidthLessThan768 ? "button" : 'heading'}
                                    // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                    role="button"
                                    tabIndex="0"
                                    aria-expanded={collapsedSections?.gradingBasis === true ? "true" : "false"}                                            // onKeyDown={(e) => {
                                    //   if (e.key === "Enter" || e.key === " ") {
                                    //     toggleSection("classLevel");
                                    //   }
                                    // }}
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "700",
                                        color: "#272E5C",
                                    }}
                                >
                                    {gradingBasisTitle?.Title}
                                </span>
                            </div>
                            <span
                                // onClick={() => toggleSection("classLevel")}
                                className="deskTopPlusMinus"
                                // tabIndex="0"
                                // aria-label="Close class Level list"
                                // role="button"
                                // onKeyDown={(e) => {
                                //   if (e.key === "Enter" || e.key === " ") {
                                //     toggleSection("classLevel");
                                //   }
                                // }}
                                aria-hidden="true"
                            >
                                {collapsedSections?.gradingBasis ? "-" : "+"}
                            </span>
                        </Row>
                    }

                    {
                        collapsedSections?.gradingBasis && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {gradingBasisFilter?.map((value) => {
                                    const count = getGradingBasisCount(value);

                                    return (
                                        <Col key={value} style={{ display: "flex" }}>
                                            <Checkbox
                                                className="curated-classes-filter-checkbox"
                                                style={{ fontSize: "17px", fontWeight: "400" }}
                                                value={value}
                                                checked={gradingBasis.includes(value)}
                                                onChange={handleGradingBasis}
                                            >
                                                {value} ({count})
                                            </Checkbox>
                                        </Col>
                                    );
                                })}

                            </Row>
                        )
                    }
                    <Row
                        id="curatedRow"
                        // aria-level={3}
                        // role={isMobileView ? "button" : "heading"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("curatedClass");
                            }
                        }}

                        onClick={() => {
                            toggleSection("curatedClass");

                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                        // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                        role="heading"
                        aria-level="3"
                    >

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                // role={isWidthLessThan768 ? "button" : 'heading'}
                                // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                // {...(window.innerWidth < 993 && {
                                //     tabIndex: "0",
                                //     "aria-expanded":
                                //         collapsedSections?.curatedClass === true ? "true" : "false",
                                // })}
                                tabIndex="0"
                                role="button"
                                aria-expanded={collapsedSections?.curatedClass === true ? "true" : "false"}
                                // onKeyDown={(e) => {
                                //   if (e.key === "Enter" || e.key === " ") {
                                //     toggleSection("curatedClass");
                                //   }
                                // }}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {curatedClasses?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            // margin: "0px 3px -25px",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Curated Classes")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Curated Classes");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("Curated Classes");
                                            }
                                        }}
                                        // tabIndex={0}
                                        onBlur={(e) => {
                                            if (
                                                !e.currentTarget.contains(e.relatedTarget) &&
                                                !tooltipRef.current?.contains(e.relatedTarget)
                                            ) {
                                                setIsToolTip(null);
                                            }
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Curated Classes"
                                            // aria-describedby="Curated-Classes-info"
                                            aria-expanded={
                                                isTooltip === "Curated Classes" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                // display: "inline-flex",
                                                // alignItems: "center",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Curated Classes" && (
                                            <div
                                                id="Curated-Classes-info"
                                                role="tooltip"
                                                ref={tooltipRef}
                                                // tabIndex={-1}
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "8px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <div>
                                                    <p>
                                                        {curatedClassesTooltip?.CuratedClassesToolTip}
                                                    </p>
                                                    {/* <p>
                                                        <a
                                                            href="https://advising.stanford.edu/current-students/choosing-courses/frosh-friendly"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                color: "#1890ff",
                                                                textDecoration: "underline",
                                                            }}
                                                        >
                                                            Frosh-friendly classes
                                                        </a>{" "}
                                                        are selected by departments as excellent
                                                        beginner opportunities to learn more about a
                                                        field, department, or program.
                                                    </p>
                                                    <p>
                                                        <a
                                                            href="https://advising.stanford.edu/current-students/choosing-courses/wonders"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                color: "#1890ff",
                                                                textDecoration: "underline",
                                                            }}
                                                        >
                                                            One-Unit Wonders and Terrific Twos
                                                        </a>{" "}
                                                        are classes that offer one or two units of
                                                        credit and provide learning opportunities that
                                                        include introductions to a field, speaker
                                                        series, and a variety of activities.
                                                    </p> */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }

                        </div>

                        <span
                            // onClick={() => toggleSection("curatedClass")}
                            className="deskTopPlusMinus"
                            // tabIndex="0"
                            // aria-label="Close curated Class list"
                            // role="button"
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter" || e.key === " ") {
                            //     toggleSection("curatedClass");
                            //   }
                            // }}
                            aria-hidden="true"
                        >
                            {collapsedSections?.curatedClass ? "-" : "+"}
                        </span>

                    </Row>
                    {
                        collapsedSections?.curatedClass && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {filter_data &&
                                    filter_data.curated_classes_filters.map((item) => {
                                        const displayValue = allAttCounts?.[
                                            `by_${item?.value
                                                .toLowerCase()
                                                .replaceAll(" ", "")}`
                                        ]
                                            ? "flex"
                                            : "flex";
                                        return (
                                            <Col
                                                key={item.key}
                                                style={{ display: displayValue }}
                                            >
                                                <Checkbox
                                                    className="curated-classes-filter-checkbox"
                                                    key={item.key}
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "400",
                                                    }}
                                                    onChange={(e) => handleCurated(e)}
                                                    value={item.value}
                                                    checked={curatedAtt?.[item?.value]}
                                                >
                                                    {item.value} (
                                                    {allAttCounts?.[
                                                        `by_${item?.value
                                                            .toLowerCase()
                                                            .replaceAll(" ", "")}`
                                                    ] || zeroValue}
                                                    )
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}

                            </Row>
                        )
                    }
                    <Row
                        id="genEduRow"
                        // aria-level={3}
                        // role={isMobileView ? "button" : "heading"}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("generalEducation");
                            }
                        }}

                        onClick={() => {
                            toggleSection("generalEducation");

                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: "space-between"
                        }}
                        // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                        // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                        role="heading"
                        aria-level="3"
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                // {...(window.innerWidth < 993 && {
                                //     tabIndex: "0",
                                //     "aria-expanded":
                                //         collapsedSections?.generalEducation === true
                                //             ? "true"
                                //             : "false",
                                // })}
                                // role={isWidthLessThan768 ? "button" : 'heading'}
                                // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.generalEducation === true ? "true" : "false"}
                                // onKeyDown={(e) => {
                                //   if (e.key === "Enter" || e.key === " ") {
                                //     toggleSection("generalEducation");
                                //   }
                                // }}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {generalEducation?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            // margin: "0px 3px -25px",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("General Education")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setIsToolTip("General Education");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation();
                                                setIsToolTip("General Education");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            // Close tooltip if focus moves outside
                                            if (
                                                !e.currentTarget.contains(e.relatedTarget) &&
                                                !tooltipRef.current?.contains(e.relatedTarget)
                                            ) {
                                                setIsToolTip(null);
                                            }
                                        }}
                                    >
                                        <button
                                            aria-label="More information about General Education"
                                            // aria-describedby="General-Education-info"
                                            aria-expanded={
                                                isTooltip === "General Education" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                // display: "inline-flex",
                                                // alignItems: "center",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "General Education" && (
                                            <div
                                                id="General-Education-info"
                                                role="tooltip"
                                                ref={toolNumeberOfGenralEdcTipRef}
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "8px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <div>
                                                    <p>
                                                        {generalEducationToolTip?.GeneralEducationToolTip}
                                                    </p>
                                                    {/* <p>
                                                        Go to the Stanford Bulletin{" "}
                                                        <a
                                                            href="https://bulletin.stanford.edu/"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                color: "#1890ff",
                                                                textDecoration: "underline",
                                                            }}
                                                        >
                                                            to learn more about the General Education
                                                            requirements
                                                        </a>
                                                        .
                                                    </p> */}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            // onClick={() => toggleSection("generalEducation")}
                            className="deskTopPlusMinus"
                            // tabIndex="0"
                            // aria-label="Close general Education list"
                            // role="button"
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter" || e.key === " ") {
                            //     toggleSection("generalEducation");
                            //   }
                            // }}
                            aria-hidden="true"
                        >
                            {collapsedSections?.generalEducation ? "-" : "+"}
                        </span>
                    </Row>
                    {
                        collapsedSections?.generalEducation && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {filter_data &&
                                    filter_data.general_education_filters.map((item) => {
                                        const displayValue = allAttCounts?.[
                                            `by_${item?.value
                                                .toLowerCase()
                                                .replaceAll(" ", "")}`
                                        ]
                                            ? "flex"
                                            : "flex";
                                        return (
                                            <Col
                                                key={item.key}
                                                style={{ display: displayValue }}
                                            >
                                                <Checkbox
                                                    className="general-education-filter-checkbox"
                                                    key={item.key}
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "400",
                                                    }}
                                                    onChange={(e) => handleEducation(e)}
                                                    value={item.value}
                                                    checked={generalEducationAtt?.[item?.value]}
                                                >
                                                    {item.value} (
                                                    {allAttCounts?.[
                                                        `by_${item?.value
                                                            .toLowerCase()
                                                            .replaceAll(" ", "")}`
                                                    ] || zeroValue}
                                                    )
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}
                                <u
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "600",
                                        color: "#007C92",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        setShowMoreGeneralEducation(true);
                                        setGlobalModalOpen(true);
                                        setIsOpenForUseEffect(true);
                                    }}
                                    tabIndex="0"
                                    aria-label="Show more General Education"
                                    role="button"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            setShowMoreGeneralEducation(true);
                                            setGlobalModalOpen(true);
                                            setIsOpenForUseEffect(true);
                                        }
                                    }}
                                >
                                    {showmore?.Title}
                                </u>
                                {/* General Education Modal */}
                                <Modal
                                    centered
                                    width={() => getModalWidth()}
                                    open={showMoreGeneralEducation}
                                    closable={false}
                                    keyboard={true}
                                    onCancel={() => {
                                        // setEducation([]);
                                        // setGeneralEducationAtt({});
                                        setShowMoreGeneralEducation(false);
                                    }}
                                    footer={false}
                                    style={{
                                        borderRadius: "5px",
                                    }}
                                    afterOpenChange={(open) => {
                                        if (open && showMoreGeneralEducation) {
                                            const modals = document.querySelectorAll(".ant-modal");

                                            modals.forEach((modal) => {
                                                const style = window.getComputedStyle(modal);
                                                if (style.display !== "none") {
                                                    modal.setAttribute("aria-label", "General Education");

                                                    const ariaHiddenDivs = modal.querySelectorAll('div[aria-hidden="true"]');
                                                    ariaHiddenDivs.forEach((div) => {
                                                        if (div.childNodes.length === 0 && div.offsetWidth === 0 && div.offsetHeight === 0) {
                                                            div.remove();
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }}
                                >
                                    <div
                                    >
                                        <Row
                                            style={{ display: "flex", justifyContent: "end" }}
                                        >
                                            <CloseOutlined
                                                tabIndex={0}
                                                aria-label="close"
                                                role="button"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        setShowMoreGeneralEducation(false);
                                                        setGlobalModalOpen(false);
                                                        setIsOpenForUseEffect(false);
                                                    }
                                                }}
                                                onClick={() => {
                                                    setShowMoreGeneralEducation(false);
                                                    setGlobalModalOpen(false);
                                                    setIsOpenForUseEffect(false);
                                                }}
                                                style={{ fontSize: "18px", color: "#016895" }}
                                            />
                                        </Row>
                                        <Row
                                            className="general_education_modal_outer"
                                        >
                                            <Row style={{ width: "100%" }}>
                                                <span
                                                    style={{
                                                        fontSize: "18px",
                                                        fontWeight: "700",
                                                        color: "#272E5C",
                                                    }}
                                                >
                                                    {generalEducation?.Title}
                                                </span>
                                            </Row>
                                            <Row
                                                className="general_education_modal_body"
                                            >
                                                {filter_data &&
                                                    filter_data?.more_general_education?.map(
                                                        (item) => {
                                                            const displayValue = allAttCounts?.[
                                                                `by_${item?.value
                                                                    .toLowerCase()
                                                                    .replaceAll(" ", "")}`
                                                            ]
                                                                ? "flex"
                                                                : "flex";
                                                            return (
                                                                <Col
                                                                    className="general_education_modal_body_inner"
                                                                    key={item.key}
                                                                    style={{ display: displayValue }}
                                                                >
                                                                    <Checkbox
                                                                        className="general-education-filter-checkbox general_education_modal_body_inner_p"
                                                                        key={item.key}
                                                                        onChange={(e) => handleEducation(e)}
                                                                        onKeyDown={(e) => {
                                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                                e.preventDefault();
                                                                                const syntheticEvent = {
                                                                                    target: {
                                                                                        value: item.value,
                                                                                        checked: !generalEducationAtt?.[item.value],
                                                                                    },
                                                                                };
                                                                                handleEducation(syntheticEvent);
                                                                            }
                                                                        }}
                                                                        value={item.value}
                                                                        checked={
                                                                            generalEducationAtt?.[item?.value]
                                                                        }
                                                                    >
                                                                        {item.value} (
                                                                        {allAttCounts?.[
                                                                            `by_${item?.value
                                                                                .toLowerCase()
                                                                                .replaceAll(" ", "")}`
                                                                        ] || zeroValue}
                                                                        )
                                                                    </Checkbox>
                                                                </Col>
                                                            );
                                                        }
                                                    )}
                                            </Row>
                                            <Row
                                                className="general_education_modal_footer"
                                            >
                                                <Button
                                                    style={{
                                                        backgroundColor: !isApplyBtnHovered
                                                            ? "#006B81"
                                                            : "#620059",
                                                        border: !isApplyBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: "#FFFFFF",
                                                        borderRadius: "6px",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onClick={() => {
                                                        setShowMoreGeneralEducation(false);
                                                        setGlobalModalOpen(false);
                                                        setIsOpenForUseEffect(false);
                                                    }}
                                                    onMouseOver={handleApplyBtnMouseOver}
                                                    onMouseOut={handleApplyBtnMouseOut}
                                                >
                                                    {applyButton?.Title}
                                                </Button>
                                                <Button
                                                    style={{
                                                        border: !isClearAllBtnHovered
                                                            ? "1px solid #006B81"
                                                            : "1px solid #620059",
                                                        color: !isClearAllBtnHovered
                                                            ? "#007C92"
                                                            : "#620059",
                                                        fontSize: "14px",
                                                        fontWeight: "700",
                                                    }}
                                                    onMouseOver={handleClearAllBtnMouseOver}
                                                    onMouseOut={handleClearAllBtnMouseOut}
                                                    onClick={() => handleClearEducation()}
                                                >
                                                    {clearAllButton?.Title}
                                                </Button>
                                            </Row>
                                        </Row>
                                    </div>
                                </Modal>
                            </Row>
                        )
                    }
                    <Row
                        id="schAndDeptRow"
                        // aria-level={3}
                        // role={isMobileView ? "button" : "heading"}

                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("schoolAndDepartment");
                            }
                        }}
                        onClick={() => {
                            toggleSection("schoolAndDepartment");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        role="heading"
                        aria-level="3"
                    // {...(isWidthLessThan768 ? { role: "heading" } : {})}
                    // {...(isWidthLessThan768 ? { "aria-level": 3 } : {})}
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                // {...(window.innerWidth < 993 && {
                                //     tabIndex: "0",
                                //     "aria-expanded":
                                //         collapsedSections?.schoolAndDepartment === true
                                //             ? "true"
                                //             : "false",
                                // })}
                                // role={isWidthLessThan768 ? "button" : 'heading'}
                                // {...(isWidthLessThan768 ? {} : { "aria-level": 3 })}
                                // onKeyDown={(e) => {
                                //   if (e.key === "Enter" || e.key === " ") {
                                //     toggleSection("schoolAndDepartment");
                                //   }
                                // }}
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.schoolAndDepartment === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {schools?.Title}
                            </span>
                            {
                                !isWidthLessThan768 && (
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "inline-block",
                                            // margin: "0px 3px -25px",
                                            top: "4px",
                                        }}
                                        onMouseEnter={() => setIsToolTip("Schools")}
                                        onMouseLeave={() => setIsToolTip(false)}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsToolTip("Schools");
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation()
                                                setIsToolTip("Schools");
                                            }
                                        }}
                                        onBlur={(e) => {
                                            setIsToolTip(null);
                                        }}
                                    >
                                        <button
                                            aria-label="More information about Schools"
                                            // aria-describedby="Schools-info"
                                            aria-expanded={
                                                isTooltip === "Schools" ? "true" : "false"
                                            }
                                            style={{
                                                background: "none",
                                                border: "none",
                                                padding: 0,
                                                cursor: "pointer",
                                                // display: "inline-flex",
                                                // alignItems: "center",
                                                height: "10px",
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="30"
                                                height="29"
                                                viewBox="0 0 22 25"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M16.0636 8.42777C16.0636 12.7285 12.5771 16.2149 8.27641 16.2149C3.97568 16.2149 0.489258 12.7285 0.489258 8.42777C0.489258 4.12705 3.97568 0.640625 8.27641 0.640625C12.5771 0.640625 16.0636 4.12705 16.0636 8.42777ZM9.2498 4.5342C9.2498 5.07179 8.814 5.50759 8.27641 5.50759C7.73882 5.50759 7.30301 5.07179 7.30301 4.5342C7.30301 3.99661 7.73882 3.56081 8.27641 3.56081C8.814 3.56081 9.2498 3.99661 9.2498 4.5342ZM7.30301 7.45438C6.76542 7.45438 6.32962 7.89018 6.32962 8.42777C6.32962 8.96536 6.76542 9.40117 7.30301 9.40117V12.3213C7.30301 12.8589 7.73882 13.2947 8.27641 13.2947H9.2498C9.78739 13.2947 10.2232 12.8589 10.2232 12.3213C10.2232 11.7838 9.78739 11.348 9.2498 11.348V8.42777C9.2498 7.89018 8.814 7.45438 8.27641 7.45438H7.30301Z"
                                                    fill="#2E2D29"
                                                />
                                            </svg>
                                        </button>

                                        {isTooltip === "Schools" && (
                                            <div
                                                id="Schools-info"
                                                role="tooltip"
                                                style={{
                                                    position: "absolute",
                                                    bottom: "100%",
                                                    left: "50%",
                                                    transform: "translateX(-30%)",
                                                    background: "#f4f4f4",
                                                    color: "var(--primaryBlue)",
                                                    padding: "10px",
                                                    border: "4px solid #f4f4f4",
                                                    borderRadius: "4px",
                                                    // marginBottom: "8px",
                                                    width: "250px",
                                                    zIndex: 100,
                                                    boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                            >
                                                <p>{schoolToolTip?.SchoolsToolTip}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <span
                            // onClick={() => toggleSection("schoolAndDepartment")}
                            className="deskTopPlusMinus"
                            // tabIndex="0"
                            // aria-label="Close schools list"
                            // role="button"
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter" || e.key === " ") {
                            //     toggleSection("schoolAndDepartment");
                            //   }
                            // }}
                            aria-hidden="true"
                        >
                            {collapsedSections?.schoolAndDepartment ? "-" : "+"}
                        </span>
                    </Row>
                    {
                        collapsedSections?.schoolAndDepartment && (
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    margin: "10px 0 0 0",
                                    gap: "10px",
                                }}
                            >
                                {filter_data &&
                                    filter_data.schools_dep_filters.map((item) => {
                                        const displayValue = allAttCounts?.[
                                            `by_${item?.value
                                                .toLowerCase()
                                                .replaceAll(" ", "")}`
                                        ]
                                            ? "flex"
                                            : "flex";
                                        return (
                                            <Col
                                                key={item.key}
                                                style={{ display: displayValue }}
                                            >
                                                <Checkbox
                                                    className="schools-dep-filter-checkbox"
                                                    key={item.key}
                                                    value={item.value}
                                                    style={{
                                                        fontSize: "17px",
                                                        fontWeight: "400",
                                                    }}
                                                    onChange={(e) => handleSchoolAndDept(e)}
                                                    checked={schoolAtt?.[item?.value]}
                                                >
                                                    {item.schools_dep} (
                                                    {allAttCounts?.[
                                                        `by_${item?.value
                                                            .toLowerCase()
                                                            .replaceAll(" ", "")}`
                                                    ] || zeroValue}
                                                    )
                                                </Checkbox>
                                            </Col>
                                        );
                                    })}
                            </Row>
                        )
                    }
                    <Row
                        id="schAndDeptRow"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                toggleSection("conflictOptions");
                            }
                        }}
                        onClick={() => {
                            toggleSection("conflictOptions");
                        }}
                        style={{
                            cursor: "pointer",
                            justifyContent: 'space-between'
                        }}
                        role="heading"
                        aria-level="3"
                    >
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <span
                                role="button"
                                tabIndex="0"
                                aria-expanded={collapsedSections?.conflictOptions === true ? "true" : "false"}
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                }}
                            >
                                {otherFilters?.Title}
                            </span>
                        </div>
                        <span
                            className="deskTopPlusMinus"
                            aria-hidden="true"
                        >
                            {collapsedSections?.conflictOptions ? "-" : "+"}
                        </span>

                    </Row>
                    {collapsedSections?.conflictOptions && (
                        <Row
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                margin: "10px 0 0 0",
                                gap: "10px",
                            }}
                        >
                            {filter_data &&
                                filter_data.conflict_options_filters.map((item) => {
                                    const displayValue = allAttCounts?.[
                                        `by_${item?.value
                                            .toLowerCase()
                                            .replaceAll(" ", "")}`
                                    ]
                                        ? "flex"
                                        : "flex";
                                    return (
                                        <Col
                                            key={item.key}
                                            style={{ display: displayValue }}
                                        >
                                            <Checkbox
                                                className="schools-dep-filter-checkbox"
                                                key={item.key}
                                                value={item.value}
                                                style={{
                                                    fontSize: "17px",
                                                    fontWeight: "400",
                                                }}
                                                onChange={(e) => handleConsentConflcit(e, item)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        handleConsentConflcit(
                                                            { target: { checked: !consentConflictValue?.some(x => x?.value === item?.value) } },
                                                            item
                                                        );
                                                    }
                                                }}
                                                checked={consentConflictValue.some((x) => x?.value === item?.value)}

                                            >
                                                {item.conflict_option}
                                                {item.value === "NO_CONSENT" && (
                                                    <>
                                                        {" "}(
                                                        {allAttCounts?.[
                                                            `by_${item.value.toLowerCase()}`
                                                        ] || zeroValue}
                                                        )
                                                    </>
                                                )}
                                            </Checkbox>
                                        </Col>
                                    );
                                })}
                        </Row>
                    )}
                </div>

                <ClassSearchHeader
                    title={blok?.Title}
                    description={classdescription?.Title}
                />

            </div>
        </div>

    );
};

export default ClassSearch;
