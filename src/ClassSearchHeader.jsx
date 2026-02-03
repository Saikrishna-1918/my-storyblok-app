
import { useEffect, useRef, useState } from "react";
import "./classsearch.css";
import { Button, Checkbox, Col, Dropdown, Input, Menu, Modal, Row, Space } from "antd";
import { CloseOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { UserAuth } from "./ContextApi/ContextApi";

import jsondata from "./data/TopNavBar.json";
const ClassSearchHeader = ({ title, description }) => {
    const { myClassApiData
    } = UserAuth();

    // ✅ cache last valid data
    const lastValidDataRef = useRef(null);



    useEffect(() => {
        if (myClassApiData) {
            lastValidDataRef.current = myClassApiData;
        }
    }, [myClassApiData]);

    const localStorageTermsData = localStorage.getItem("term_data");
    const [seasonsModal, setSeasonsModal] = useState(false);
    const [isApplyBtnHovered, setIsApplyBtnHovered] = useState(false);
    const [isClearAllBtnHovered, setIsClearAllBtnHovered] = useState(false);
    const [isSubDropDownOpen, setIsSubDropDownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const seasons_data = myClassApiData && myClassApiData?.Terms?.Term;
    const default_seasons_term = myClassApiData && myClassApiData?.Terms;
    const [announceValue, setAnnounceValue] = useState("");
    // const [hasDecremented, setHasDecremented] = useState(false);

    const [width470, setWidth470] = useState();
    const [isMobileView, setMobileView] = useState(false);
    const dropdownRef = useRef(null);
    const filterRef = useRef(null);

    const isMObileViewClick = () => {
        setMobileView(true);
        setTimeout(() => {
            filterRef.current?.focus(); // Focus on the span
        }, 0);
    };

    const handleMobileClose = () => {
        setMobileView(false);
        setSubjectClick();
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMobileView(false);
            }
        };

        if (isMobileView) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileView]);

    const updateWidth470Position = () => {
        if (window.innerWidth < 470) {
            setWidth470(true);
        } else {
            setWidth470(false);
        }
    };
    useEffect(() => {
        updateWidth470Position();
        window.addEventListener("resize", updateWidth470Position);
        return () => window.removeEventListener("resize", updateWidth470Position);
    }, []);
    const handleApplyBtnMouseOver = () => {
        setIsApplyBtnHovered(true);
    };
    const handleApplyBtnMouseOut = () => {
        setIsApplyBtnHovered(false);
    };
    const handleClearAllBtnMouseOver = () => {
        setIsClearAllBtnHovered(true);
    };
    const handleClearAllBtnMouseOut = () => {
        setIsClearAllBtnHovered(false);
    };
    const handleTab = () => {
        setTab(!tab);
    };
    const handleList = () => {
        setTab(!tab);
    };
    const {
        setSelectedFilters,
        selectedItems,
        setSelectedItems,
        setMon,
        setTue,
        setWed,
        setThur,
        setFri,
        setSat,
        setSun,
        courseFormat,
        setCourseFormat,
        classStatus,
        setClassStatus,
        classLevel,
        setClassLevel,
        curated,
        setCurated,
        education,
        setEducation,
        schoolAndDept,
        setSchoolAndDept,
        subject,
        setSubject,
        time,
        setTime,
        numUnits,
        setNumUnits,
        setSearchData,
        handleClearAllFilters,
        getSelectedCourseData,
        seasonsModalValue,
        setSeasonsModalValue,
        mon,
        tue,
        wed,
        thur,
        fri,
        sat,
        sun,
        allAttCounts,
        setIsHamburgerOpen,
        subjectClick,
        setSubjectClick,
        setSubjectId,
        mainSubject,
        setMainSubject,
        setMainSubjectId,
        zeroValue,
        setClassLevelAtt,
        setClassStatusAtt,
        setSchoolAtt,
        setFormatAtt,
        setCuratedAtt,
        setGeneralEducationAtt,
        setClassSearchModalValue,
        handelUnitsBtnClick,
        setHandleUnitsBtnClick,
        handleTimeBtnClick,
        setHandleTimeBtnClick,
        isSmallScreen,
        season_term_display,
        setSeasonTermDisplay,
        searchData,
        searchCount,
        setSkipApiCall,
        myclassesFilteredDataEnroll,
        myClassesPlannedData,
        setSearchAllCount,
        setInstructorData,
        hamburgerButtonRef,
        closeButtonRef,
        skipRef,
        isOpenForUseEffect,
        getHolidayCalendarData,
        selectedOptions,
        setSelectedOptions,
        selectedSubjects,
        setSelectedSubjects,
        setSubjectsFilter,
        gradingBasis,
        setGradingBasis,
        consentConflictValue,
        setConsentConflictValue,
        isApplyClicked,
        setIsApplyClicked,
        setSchedulePayload,
        selectedCampus,
        setSelectedCampus,
        blok
    } = UserAuth();
    const applyButton = blok.searchFilters?.find(
        (item) => item.component === "Apply"
    );
    const clearAllButton = blok.searchFilters?.find(
        (item) => item.component === "clearall"
    );
    const selectTerm = blok.searchFilters?.find(
        (item) => item.component === "Select term"
    );
    const isSmallScreenSubject =
        window.innerWidth <= 1500;
    const isCountsLoaded =
        allAttCounts && Object.keys(allAttCounts).length > 0;
    const handleSubjectClick = (data, key) => {
        if (data === "Arts & Humanities") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }// Ensure the submenu opens
        } else if (data === "Engineering") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }
        } else if (data === "Languages") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }
        } else if (data === "Math & Sciences") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }
        } else if (data === "Professional") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }
        } else if (data === "Social Sciences") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }
        } else if (data === "Well Being") {
            setSubjectClick(data);
            if (!isKeyboardUser) { setIsDropdownOpen(true); }
        }
    };
    const handleHamBurgerBtn = () => {
        setIsHamburgerOpen(true);
    };

    const handleSeasonFilterApplyBtn = () => {
        setSeasonsModal(false);
        let onlyClassCall = "SkipCall";

        setSkipApiCall(true);
        getSelectedCourseData(seasonsModalValue, onlyClassCall);
        setClassSearchModalValue(seasonsModalValue);
    };
    const handleInstructorBtnClick = (i) => {
        if (selectedItems?.length === 1) {
            setInstructorData();
        }
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const updatedData = selectedItems.filter((item, x) => x !== i);
        setSelectedItems(updatedData);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleMonBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setMon(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleTueBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setTue(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleWedBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setWed(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleThurBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setThur(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleRemoveParent = (parent) => {
        setSelectedCampus((prev) => {
            const updated = { ...prev };
            delete updated[parent];
            return updated;
        });
    };
    const handleRemoveChild = (parent, child) => {
        setSelectedCampus((prev) => {
            const updated = { ...prev };
            const remaining = (updated[parent] || []).filter((c) => c !== child);

            if (remaining.length > 0) {
                updated[parent] = remaining;
            } else {
                delete updated[parent];
            }

            return updated;
        });
    };



    const handleFriBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setFri(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleSatBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setSat(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleSunBtnClick = () => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        setSun(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleFormatBtnClick = (i) => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const filterData = courseFormat?.filter((format, x) => x === i);
        setFormatAtt((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = courseFormat?.filter((format, x) => x !== i);
        setCourseFormat(updatedData);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleClassStatusBtnClick = (i) => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const filterData = classStatus?.filter((classSt, x) => x === i);
        setClassStatusAtt((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = classStatus?.filter((classSt, x) => x !== i);
        setClassStatus(updatedData);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleClassLevelBtnClick = (i) => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const filterData = classLevel?.filter((level, x) => x === i);
        setClassLevelAtt((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = classLevel?.filter((level, x) => x !== i);
        setClassLevel(updatedData);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleCuratedBtnClick = (i) => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const filterData = curated?.filter((cur, x) => x === i);
        setCuratedAtt((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = curated?.filter((cur, x) => x !== i);
        setCurated(updatedData);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleEduBtnClick = (i) => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const filterData = education?.filter((edu, x) => x === i);
        setGeneralEducationAtt((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = education?.filter((edu, x) => x !== i);
        setEducation(updatedData);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleSchDeptBtnClick = (i) => {
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        const filterData = schoolAndDept?.filter((sd, x) => x === i);
        setSchoolAtt((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = schoolAndDept?.filter((sd, x) => x !== i);
        setSchoolAndDept(updatedData);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleGradingBsis = (i) => {
        const filterData = gradingBasis?.filter((sd, x) => x === i);
        setGradingBasis((prev) => ({
            ...prev,
            [filterData[0]]: false,
        }));
        const updatedData = gradingBasis?.filter((sd, x) => x !== i);
        setGradingBasis(updatedData);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleRemoveConsentConflict = (value) => {
        setConsentConflictValue(prev =>
            prev.filter(item => item.value !== value)
        );

        // Clear payload ONLY if needed
        if (value !== "NO_CONSENT") {
            setSchedulePayload({});
        }
    };


    const handleSubjectBtnClick = (mainSubjectId, subjectId) => {

        // setSubject("");
        // setMainSubjectId("");
        // setMainSubject("");
        // setSubjectId("");
        setSelectedSubjects(prev => {
            const main = prev[mainSubjectId];

            const updatedSubjects = main.subjects.filter(s => s.id !== subjectId);

            return {
                ...prev,
                [mainSubjectId]: {
                    ...main,
                    subjects: updatedSubjects
                }
            };
        });

        setSelectedOptions(prev => {
            const existing = prev[mainSubjectId];
            if (!existing) return prev;

            const updated = existing.filter(id => id !== subjectId);

            // if empty -> remove the key
            if (updated.length === 0) {
                const newState = { ...prev };
                delete newState[mainSubjectId];
                return newState;
            }

            return {
                ...prev,
                [mainSubjectId]: updated
            };
        });

        setSubjectsFilter((previous) => !previous);
    };
    const handleStartTimeClick = () => {
        setTime([7, time[1]]);
        setHandleTimeBtnClick(!handleTimeBtnClick);
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };
    const handleEndTimeClick = () => {
        setTime([time[0], 21]);
        setHandleTimeBtnClick(!handleTimeBtnClick);
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleStartUnitClick = () => {
        setNumUnits([0, numUnits[1]]);
        setHandleUnitsBtnClick(!handelUnitsBtnClick);
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    const handleEndUnitClick = () => {
        setNumUnits([numUnits[0], 18]);
        setHandleUnitsBtnClick(!handelUnitsBtnClick);
        setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    // const decrementCountOnce = () => {
    //   if (!hasDecremented) {
    //     setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    //     setHasDecremented(true);
    //   }
    // };

    const toggleDropdown = () => {
        setIsSubDropDownOpen(!isSubDropDownOpen);
        setSubjectClick(null);
    };

    const handleMenuClick1 = (item) => {
        setSubject(item?.value);
        setSubjectId(item?.id);
        setMainSubject(item?.subjectName);
        setMainSubjectId(item?.subjectId);
        setIsSubDropDownOpen(false);
        setMobileView(false);
        setSubjectClick();
        if (isMobileView) {
            setSubjectClick();
        }
    };

    const handleSubjectApplyClick = () => {
        // setIsApplyClicked(true);
        setIsDropdownOpen(false);
        setIsSubDropDownOpen(false);
        setOpenDropdownKey(null);
        // setSubjectsFilter(previous => !previous);
    };

    const handleClearAllClick = () => {
        setIsDropdownOpen(false);
        setIsSubDropDownOpen(false);
        setSelectedOptions({});
        setSelectedSubjects({});
        setOpenDropdownKey(null);
        if (isApplyClicked) {
            setSubjectsFilter(previous => !previous);
            setIsApplyClicked(false);
        }
    };

    const handleCheckboxChange = (
        mainSubjectId,
        subjectId,
        subject,
        mainSubject,
        checked
    ) => {

        setSelectedOptions(prev => {
            const existing = prev[mainSubjectId] || [];

            let updated;
            if (checked) {
                updated = [...new Set([...existing, subjectId])];
            } else {
                updated = existing.filter(id => id !== subjectId);
            }

            if (updated.length === 0) {
                const newState = { ...prev };
                delete newState[mainSubjectId];
                return newState;
            }

            return {
                ...prev,
                [mainSubjectId]: updated
            };
        });

        setSelectedSubjects(prev => {
            const existingMain = prev[mainSubjectId] || {
                mainSubjectId,
                mainSubject,
                subjects: []
            };

            let updatedSubjects;

            if (checked) {
                updatedSubjects = [
                    ...existingMain.subjects.filter(s => s.id !== subjectId),
                    { id: subjectId, name: subject }
                ];
            } else {
                updatedSubjects = existingMain.subjects.filter(
                    s => s.id !== subjectId
                );
            }

            if (updatedSubjects.length === 0) {
                const newState = { ...prev };
                delete newState[mainSubjectId];
                return newState;
            }

            return {
                ...prev,
                [mainSubjectId]: {
                    mainSubjectId,
                    mainSubject,
                    subjects: updatedSubjects
                }
            };
        });

        setIsApplyClicked(true);
        setSubjectsFilter(previous => !previous);
    };


    useEffect(() => {
        if (isMobileView) {
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = "auto"; // Restore scrolling
        }
        return () => {
            document.body.style.overflow = "auto"; // Cleanup when modal is closed
        };
    }, [isMobileView]);

    const [isKeyboardUser, setIsKeyboardUser] = useState(false);

    // Detect keyboard vs mouse usage
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Tab" || e.key === "Enter" || e.key === " ") {
                setIsKeyboardUser(true);
            }
        };

        const handleMouseDown = () => {
            setIsKeyboardUser(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);
    const isEscapePressed = useRef(false); // Track Escape key press

    const handleDropdownVisibility = (visible) => {
        setIsSubDropDownOpen(visible);

        if (visible) {
            setTimeout(() => {
                const menuItems =
                    menuRef.current?.menu?.list?.querySelectorAll('[role="menuitem"]');

                if (!menuItems?.length) return;

                menuItems[0].focus();
                setSubjectClick(menuItems[0].ariaLabel);
                // console.log(menuItems[0]);

            }, 100);
        }
    };

    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const submenuRef = useRef(null);

    // useEffect(() => {
    //     if (isSubDropDownOpen) {
    //         setTimeout(() => {
    //             const menuItems = Array.from(
    //                 menuRef.current?.menu?.list?.querySelectorAll("[role='menuitem']")
    //             );

    //             if (menuItems.length === 0) return;

    //             // Find the selected item
    //             const selectedItem = menuItems.find(
    //                 (item) => item.innerText.trim() === subjectClick
    //             );

    //             const focusTarget = selectedItem || menuItems[0];
    //             focusTarget?.focus();

    //             setSubjectClick(focusTarget.innerText);
    //         }, 0);
    //     }
    // }, [isSubDropDownOpen]);

    useEffect(() => {
        if (!isSubDropDownOpen) {
            setIsDropdownOpen(false);
            setSubjectClick(null);
        }
    }, [isSubDropDownOpen]);

    const [openDropdownKey, setOpenDropdownKey] = useState(null);

    useEffect(() => {
        if (isDropdownOpen && subjectClick) {
            setTimeout(() => {
                // Map subject names to their CSS class selectors
                const subjectClassMap = {
                    "Arts & Humanities": ".artHumanities",
                    "Engineering": ".engineering",
                    "Languages": ".language",
                    "Math & Sciences": ".mathScience",
                    "Professional": ".professional",
                    "Social Sciences": ".scocialScience",
                    "Well Being": ".wellBeing"
                };

                const selector = subjectClassMap[subjectClick];
                const firstItem = selector
                    ? submenuRef.current?.menu?.list?.querySelector(selector)
                    : submenuRef.current?.menu?.list?.querySelector(".artHumanities") ||
                    submenuRef.current?.menu?.list?.querySelector(".engineering") ||
                    submenuRef.current?.menu?.list?.querySelector(".language") ||
                    submenuRef.current?.menu?.list?.querySelector(".mathScience") ||
                    submenuRef.current?.menu?.list?.querySelector(".professional") ||
                    submenuRef.current?.menu?.list?.querySelector(".scocialScience") ||
                    submenuRef.current?.menu?.list?.querySelector(".wellBeing");

                if (firstItem) {
                    firstItem.focus();
                }
            }, 200);
        }
    }, [isDropdownOpen, subjectClick]);

    // const handleMenuKeyDown = (event) => {
    //   if (
    //     // event.target.classList.contains("subSubjectTextclass") ||
    //     event.target.classList.contains("artHumanities") ||
    //     event.target.classList.contains("engineering") ||
    //     event.target.classList.contains("language") ||
    //     event.target.classList.contains("mathScience") ||
    //     event.target.classList.contains("professional") ||
    //     event.target.classList.contains("scocialScience") ||
    //     event.target.classList.contains("wellBeing")
    //   )
    //     return;
    //   let menuItems = Array.from(
    //     menuRef.current.menu.list.querySelectorAll("[role='menuitem']") || []
    //   );
    //   console.log(menuItems)
    //   const currentIndex = menuItems.indexOf(document.activeElement);
    //   setIsDropdownOpen(false);
    //   if (event.key === "ArrowDown") {
    //     event.preventDefault();
    //     const nextIndex = (currentIndex + 1) % menuItems.length;
    //     menuItems[nextIndex]?.focus();
    //     const selectedItem = document.activeElement.innerText;

    //     setSubjectClick(selectedItem);
    //   } else if (event.key === "ArrowUp") {
    //     event.preventDefault();
    //     const prevIndex =
    //       (currentIndex - 1 + menuItems.length) % menuItems.length;
    //     menuItems[prevIndex]?.focus();
    //     const selectedItem = document.activeElement.innerText;
    //     setSubjectClick(selectedItem);
    //   } else if (event.key === "Escape") {
    //     // setIsSubDropDownOpen(false);
    //     buttonRef.current?.focus();
    //     // menuItems = [];
    //     // console.log(menuItems)
    //   } else if (event.key === "Enter" || event.key === " ") {
    //     event.preventDefault();
    //     setIsDropdownOpen(true);
    //     menuItems[currentIndex]?.click();
    //     // menuItems = [];
    //   }
    // };

    const cachedMenuItemsRef = useRef([]);

    const handleMenuKeyDown = (event) => {
        if (
            event.target.classList.contains("artHumanities") ||
            event.target.classList.contains("engineering") ||
            event.target.classList.contains("language") ||
            event.target.classList.contains("mathScience") ||
            event.target.classList.contains("professional") ||
            event.target.classList.contains("scocialScience") ||
            event.target.classList.contains("wellBeing")
        )
            return;

        if (cachedMenuItemsRef.current.length === 0) {
            cachedMenuItemsRef.current = Array.from(
                menuRef.current.menu.list.querySelectorAll("[role='menuitem']") || []
            );
        }

        const menuItems = cachedMenuItemsRef.current;
        const currentIndex = menuItems.indexOf(document.activeElement);
        setIsDropdownOpen(false);

        if (event.key === "ArrowDown") {
            event.preventDefault();
            const nextIndex = (currentIndex + 1) % menuItems.length;

            const nextItem = menuItems[nextIndex];
            nextItem?.focus();

            const nextLabel = nextItem?.innerText.split("\n")[0].trim();
            setSubjectClick(nextLabel);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();

            const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;

            const prevItem = menuItems[prevIndex];
            prevItem?.focus();

            const prevLabel = prevItem?.innerText.split("\n")[0].trim();
            setSubjectClick(prevLabel);
        }
        else if (event.key === "Escape") {
            setIsDropdownOpen(false);
            buttonRef.current?.focus();
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsDropdownOpen(true);
            // menuItems[currentIndex]?.click();
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            setIsDropdownOpen(true);
            // menuItems[currentIndex]?.click();
        }
    }

    // const handleMenuKeyDown = (event) => {
    //   if (
    //     event.target.classList.contains("artHumanities") ||
    //     event.target.classList.contains("engineering") ||
    //     event.target.classList.contains("language") ||
    //     event.target.classList.contains("mathScience") ||
    //     event.target.classList.contains("professional") ||
    //     event.target.classList.contains("scocialScience") ||
    //     event.target.classList.contains("wellBeing")
    //   )
    //     return;

    //   const menuItems = Array.from(
    //     (menuRef.current?.menu?.list?.querySelectorAll("[role='menuitem']")) || []
    //   );

    //   if (!menuItems.length) return;

    //   const currentIndex = menuItems.indexOf(document.activeElement);

    //   if (event.key === "ArrowDown") {
    //     event.preventDefault();
    //     const nextIndex = (currentIndex + 1) % menuItems.length;
    //     menuItems[nextIndex]?.focus();
    //     const selectedItem = menuItems[nextIndex]?.innerText;
    //     setSubjectClick(selectedItem);
    //   } else if (event.key === "ArrowUp") {
    //     event.preventDefault();
    //     const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    //     menuItems[prevIndex]?.focus();
    //     const selectedItem = menuItems[prevIndex]?.innerText;
    //     setSubjectClick(selectedItem);
    //   } else if (event.key === "Escape") {
    //     setIsDropdownOpen(false);
    //     setTimeout(() => {
    //       buttonRef.current?.focus();
    //     }, 0);
    //   } else if (event.key === "Enter" || event.key === " ") {
    //     event.preventDefault();
    //     menuItems[currentIndex]?.click();
    //     setIsDropdownOpen(false);
    //     setTimeout(() => {
    //       buttonRef.current?.focus();
    //     }, 0);
    //   }
    // };

    // const handleMenuKeyDown = (event) => {
    //   if (
    //     event.target.classList.contains("artHumanities") ||
    //     event.target.classList.contains("engineering") ||
    //     event.target.classList.contains("language") ||
    //     event.target.classList.contains("mathScience") ||
    //     event.target.classList.contains("professional") ||
    //     event.target.classList.contains("socialScience") ||
    //     event.target.classList.contains("wellBeing")
    //   )
    //     return;

    //   if (!menuRef.current) {
    //     console.warn("menuRef.current is null!");
    //     return;
    //   }

    //   let menuItems = Array.from(
    //     menuRef.current.menu.list.querySelectorAll("[role='menuitem']")
    //   );

    //   console.log(menuItems)

    //   if (!menuItems.length) {
    //     console.warn("No menu items found!");
    //     return;
    //   }

    //   let currentIndex = menuItems.indexOf(document.activeElement);
    //   console.log(currentIndex)

    //   if (event.key === "ArrowDown") {
    //     // console.log(event.key)
    //     // console.log(menuItems.length)
    //     event.preventDefault();
    //     const nextIndex = (currentIndex + 1) % menuItems.length;
    //     // console.log(nextIndex)
    //     menuItems[nextIndex]?.focus();
    //     setSubjectClick(menuItems[nextIndex]?.innerText);
    //   } else if (event.key === "ArrowUp") {
    //     event.preventDefault();
    //     const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    //     menuItems[prevIndex]?.focus();
    //     setSubjectClick(menuItems[prevIndex]?.innerText);
    //   } else if (event.key === "Escape") {
    //     setIsDropdownOpen(false);
    //     buttonRef.current?.focus();
    //   } else if (event.key === "Enter" || event.key === " ") {
    //     event.preventDefault();
    //     setIsDropdownOpen(true);
    //     if (currentIndex >= 0) {
    //       menuItems[currentIndex]?.click();
    //     }
    //   }
    // };
    const handleSubMenuKeyDown = (event) => {
        const artHumanitiesItems = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".artHumanities") || []
        );

        const engineeringItems = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".engineering") || []
        );
        const languageIteams = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".language") || []
        );
        const mathScienceIteams = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".mathScience") || []
        );
        const professionalItems = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".professional") || []
        );
        const scocialScienceItems = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".scocialScience") || []
        );
        const wellBeingItems = Array.from(
            submenuRef.current?.menu?.list?.querySelectorAll(".wellBeing") || []
        );

        let menuItems = [];

        if (artHumanitiesItems.length > 0) {
            menuItems = artHumanitiesItems;
        } else if (engineeringItems.length > 0) {
            menuItems = engineeringItems;
        } else if (languageIteams.length > 0) {
            menuItems = languageIteams;
        } else if (mathScienceIteams.length > 0) {
            menuItems = mathScienceIteams;
        } else if (professionalItems?.length > 0) {
            menuItems = professionalItems;
        } else if (scocialScienceItems?.length > 0) {
            menuItems = scocialScienceItems;
        } else if (wellBeingItems.length > 0) {
            menuItems = wellBeingItems;
        }

        const currentIndex = menuItems.indexOf(document.activeElement);
        setIsDropdownOpen(true);
        if (event.key === "ArrowDown") {
            // event.preventDefault();
            const nextIndex = (currentIndex + 1) % menuItems.length;
            menuItems[nextIndex]?.focus();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            const prevIndex =
                (currentIndex - 1 + menuItems.length) % menuItems.length;
            menuItems[prevIndex]?.focus();
        } else if (event.key === "Escape" || event.key === "ArrowLeft") {

            // event.preventDefault();

            const currentFocusedElement = document.activeElement;
            setIsDropdownOpen(false);
            setTimeout(() => {
                if (menuRef.current?.menu?.list) {
                    setIsSubDropDownOpen(true);

                    const mainMenuItems = Array.from(
                        menuRef.current.menu.list.querySelectorAll("[role='menuitem']")
                    );

                    // Extract only the main menu items text
                    const mainMenuTexts = mainMenuItems.map((item) =>
                        item.innerText.split("\n")[0].trim()
                    );

                    // Find index of the currently selected subject in the menu
                    const matchingIndex = mainMenuTexts.indexOf(subjectClick);

                    if (matchingIndex !== -1) {
                        mainMenuItems[matchingIndex]?.focus();
                    } else {
                        mainMenuItems[0]?.focus();
                    }
                }
            }, 0);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            // Find and toggle the checkbox within the current menu item
            const currentItem = menuItems[currentIndex];
            const checkbox = currentItem?.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.click();
            }
            // Keep dropdown open for multi-select, don't close on selection
        }

    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const dropdownSpans = document.querySelectorAll(
                '.dropdown-trigger[aria-label]'
            );
            dropdownSpans.forEach((span) => {
                span.removeAttribute('aria-label');
            });
        }, 50); // Delay to allow DOM to update

        return () => clearTimeout(timeout); // Cleanup on unmount
    }, [subjectClick, jsondata, isDropdownOpen]);

    // useEffect(() => {
    //   const outerUl = document.querySelector(
    //     'ul.ant-dropdown-menu.ant-dropdown-menu-root.ant-dropdown-menu-vertical.ant-dropdown-menu-light.css-dev-only-do-not-override-kghr11'
    //   );

    //   if (outerUl && outerUl.tagName === "UL") {
    //     const div = document.createElement("div");

    //     [...outerUl.attributes].forEach((attr) => {
    //       div.setAttribute(attr.name, attr.value);
    //     });

    //     while (outerUl.firstChild) {
    //       div.appendChild(outerUl.firstChild);
    //     }

    //     outerUl.parentNode.replaceChild(div, outerUl);
    //   }
    // }, [subjectClick, jsondata, isDropdownOpen]);


    const menu1 = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            <Row className="subSubjectInnerDiv">
                {jsondata?.sub_subjects?.map((item) => (
                    <Row
                        className="subSubjectElement"
                        key={item.key}
                        onClick={(e) => handleMenuClick1(item)}
                    >
                        <span
                            style={{
                                fontSize: "16px",
                                fontWeight: "400",
                                color: "#272E5C",
                                padding: "5px 0 5px 0",
                            }}
                            className="dropdown-trigger subSubjectTextclass"
                            id="subSubjectText"
                            tabIndex={0}
                            role="menuitem"
                            aria-label={`${item.value} submenu`}
                        >
                            {item.value}
                        </span>
                    </Row>
                ))}
            </Row>
        </Menu>
    );
    const menu_art_and_humanities = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            {jsondata.sub_subjects_art_humanities
                ?.slice()
                ?.sort((a, b) => a.value.localeCompare(b.value))
                ?.map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement testclass"
                            // onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            // tabindex="0"
                            className="dropdown-trigger artHumanities subSubjectElement testclass"
                            id="subSubjectText"
                            tabIndex={0}
                            aria-label={`${item.value} submenu`}

                        >
                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            >
                                <Checkbox
                                    checked={selectedOptions[item.subjectId]?.includes(item.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
        </Menu>
    );
    const menu_engineering = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            {jsondata?.sub_subjects_engineering
                ?.slice()
                .sort((a, b) => a.value.localeCompare(b.value))
                .map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement"
                            // onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            tabIndex={0}
                            className="dropdown-trigger engineering subSubjectElement"
                            id="subSubjectText"
                            aria-label={`${item.value}`}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            >
                                <Checkbox
                                    checked={selectedOptions[item?.subjectId]?.includes(item?.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item?.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
        </Menu>
    );
    const menu_language = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            {jsondata.sub_subjects_languages
                ?.slice()
                ?.sort((a, b) => a.value.localeCompare(b.value))
                ?.map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement"
                            // onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            tabIndex={0}
                            className="dropdown-trigger language subSubjectElement"
                            id="subSubjectText"
                            aria-label={`${item.value}`}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            >
                                <Checkbox
                                    checked={selectedOptions[item.subjectId]?.includes(item.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
            {/* </Row> */}
        </Menu>
    );
    const menu_math_sciences = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            {jsondata.sub_subjects_math_and_sciences
                ?.slice()
                ?.sort((a, b) => a.value.localeCompare(b.value))
                ?.map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement"
                            // onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            tabindex={0}
                            className="dropdown-trigger mathScience subSubjectElement"
                            id="subSubjectText"
                            aria-label={`${item.value}`}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            >
                                <Checkbox
                                    checked={selectedOptions[item.subjectId]?.includes(item.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
            {/* </Row> */}
        </Menu>
    );
    const menu_professional = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            {jsondata.sub_subjects_professional
                ?.slice()
                ?.sort((a, b) => a.value.localeCompare(b.value))
                ?.map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement"
                            onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            tabindex={0}
                            className="dropdown-trigger professional subSubjectElement"
                            id="subSubjectText"
                            aria-label={`${item.value}`}
                        >
                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            >
                                <Checkbox
                                    checked={selectedOptions[item.subjectId]?.includes(item.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
            {/* </Row> */}
        </Menu>
    );
    const menu_social_sciences = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
        >
            {jsondata.sub_subjects_social_sciences
                ?.slice()
                ?.sort((a, b) => a.value.localeCompare(b.value))
                ?.map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement"
                            // onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            tabindex={0}
                            className="dropdown-trigger scocialScience subSubjectElement"
                            id="subSubjectText"
                            aria-label={`${item.value}`}

                        >

                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            // tabIndex={0}
                            >
                                <Checkbox
                                    checked={selectedOptions[item.subjectId]?.includes(item.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
            {/* </Row> */}
        </Menu>
    );
    const menu_well_being = (
        <Menu
            id="subSubjectOuterDiv"
            ref={submenuRef}
            onKeyDown={handleSubMenuKeyDown}
            role="menu"
            style={{ width: "500px" }}
        >
            {jsondata.sub_subjects_well_being
                ?.slice()
                ?.sort((a, b) => a.value.localeCompare(b.value))
                ?.map((item) => {
                    const key = `by_subject_${(item?.id)
                        .toLowerCase()
                        .replaceAll(" ", "")}`;
                    const hasData = allAttCounts?.[key];

                    if (isCountsLoaded && !hasData) return null;

                    return (
                        <li
                            // className="subSubjectElement"
                            // onClick={(e) => handleMenuClick1(item)}
                            key={item.key}
                            role="menuitem"
                            tabIndex={0}
                            className="dropdown-trigger wellBeing subSubjectElement"
                            id="subSubjectText"
                            aria-label={`${item.value}`}

                        >
                            <span
                                style={{
                                    display: "flex",
                                    gap: "5px",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "#272E5C",
                                    padding: "5px 0 5px 0",
                                }}
                                onClick={() =>
                                    handleCheckboxChange(
                                        item.subjectId,
                                        item.id,
                                        item.value,
                                        item.subjectName,
                                        !(
                                            selectedOptions[item.subjectId]?.includes(item.id) || false
                                        ))
                                }

                            // tabIndex={0}
                            >
                                <Checkbox
                                    checked={selectedOptions[item.subjectId]?.includes(item.id) || false}
                                    onClick={(e) => e.stopPropagation()}
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onChange={(e) =>
                                        handleCheckboxChange(item.subjectId, item.id, item.value, item.subjectName, e.target.checked)
                                    }
                                />
                                {item.value} (
                                {allAttCounts?.[`by_subject_${(item?.id).toLowerCase()}`] ||
                                    zeroValue}
                                )
                            </span>
                        </li>
                    );
                })}
            {/* </Row> */}
        </Menu>
    );

    const menu = (
        <Menu
            // onClick={handleMenuClick}
            style={{ width: "207px" }}
            ref={menuRef}
            role="menu"
            onKeyDown={handleMenuKeyDown}
        >
            {jsondata &&
                jsondata.subjects.map((item) => (
                    <span
                        style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#272E5C",
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            width: "100%",
                            padding: "15px 0 0px 10px",
                            gap: "2px"
                        }}
                        className="selectSubjectMenu"
                        role="menuitem"
                        aria-haspopup="true"
                        aria-controls="subject-menu"
                        aria-label={`${item.subject}`}
                        key={item.key}
                        tabIndex={0}
                    >
                        <Dropdown
                            open={isDropdownOpen}
                            onOpenChange={(open) => {
                                if (open) {
                                    setIsDropdownOpen(false);
                                }
                            }}
                            // visible={subjectOpen}
                            // onVisibleChange={(flag) => {
                            //   setSubjectOpen(flag);
                            // }}
                            trigger={isKeyboardUser ? [] : ["click"]}
                            getPopupContainer={(trigger) => trigger.parentNode}
                            overlayStyle={{
                                top: width470 ? "225px" : "45px",
                                right: "auto",
                                bottom: "auto",
                                left: width470 ? "10px" : "160px",
                            }}
                            dropdownRender={(menu) => {
                                const menuContent = menu?.props?.children;

                                return (
                                    <div
                                        style={{
                                            width: "100%",
                                            background: "#fff",
                                            borderRadius: "6px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                padding: "10px 12px 6px 12px",
                                                // borderBottom: "1px solid #f0f0f0",
                                            }}
                                        >
                                            <CloseOutlined
                                                // className="fa-solid fa-circle-xmark"
                                                // style={{
                                                //   fontSize: "18px",
                                                //   cursor: "pointer",
                                                // }}
                                                onClick={() => {
                                                    setIsDropdownOpen(false);
                                                    setIsSubDropDownOpen(false);
                                                    setOpenDropdownKey(null);
                                                }}
                                                role="button"
                                                tabIndex={0}
                                                aria-label="Close menu"
                                            ></CloseOutlined>
                                        </div>

                                        {/* Actual dropdown content below */}
                                        <div style={{
                                            maxHeight: isSmallScreenSubject ? "60vh" : "auto", overflow: "auto",
                                            padding: "8px", display: "grid", gridTemplateColumns: "repeat(2, 1fr)"
                                        }}
                                        >
                                            {menuContent}
                                        </div>
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                padding: "10px 12px 6px 12px",
                                                // borderTop: "1px solid #f0f0f0",
                                                gap: "10px"
                                            }}
                                        >
                                            <button className="selectSubjectButton"
                                                onClick={handleSubjectApplyClick}
                                            >
                                                {applyButton?.Title}
                                            </button>
                                            <button className="selectSubjectButton"
                                                onClick={handleClearAllClick} >
                                                {clearAllButton?.Title}
                                            </button>
                                        </div>
                                    </div>
                                );
                            }}
                            overlay={
                                subjectClick === "Arts & Humanities"
                                    ? menu_art_and_humanities
                                    : menu1 && subjectClick === "Engineering"
                                        ? menu_engineering
                                        : menu1 && subjectClick === "Languages"
                                            ? menu_language
                                            : menu1 && subjectClick === "Math & Sciences"
                                                ? menu_math_sciences
                                                : menu1 && subjectClick === "Professional"
                                                    ? menu_professional
                                                    : menu1 && subjectClick === "Social Sciences"
                                                        ? menu_social_sciences
                                                        : menu1 && subjectClick === "Well Being"
                                                            ? menu_well_being
                                                            : null
                            }
                        >
                            <Space
                                key={item.key}
                                style={{
                                    backgroundColor: subjectClick === item.subject ? "#C0E4EA" : "initial",
                                    width: "100%",
                                    height: "50%",
                                }}
                                onClick={(e) => {
                                    if (isKeyboardUser) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                    handleSubjectClick(item.subject);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsDropdownOpen(true);
                                        handleSubjectClick(item.subject);
                                    }
                                }}
                            >
                                {item.subject}
                                <DownOutlined style={{ fontSize: "13px" }} />
                            </Space>
                        </Dropdown>
                    </span>
                ))}
        </Menu>
    );

    // useEffect(() => {
    //     const buttons = document.querySelectorAll(`#${style.winterBtn}`);
    //     buttons.forEach((btn) => {
    //         btn.addEventListener("click", () => btn.focus());
    //     });

    //     return () => {
    //         buttons.forEach((btn) => {
    //             btn.removeEventListener("click", () => btn.focus());
    //         });
    //     };
    // }, []);

    const radioRefs = useRef([]);

    useEffect(() => {
        if (radioRefs.current.length > 0) {
            radioRefs.current[0]?.focus();
        }
    }, []);

    useEffect(() => {
        if (seasonsModal) {
            const intervalId = setInterval(() => {
                const modalElement = document.querySelector(".ant-modal");
                if (modalElement) {
                    modalElement.setAttribute("aria-label", "Select term");
                    clearInterval(intervalId); // Stop checking once it’s applied
                }
            }, 50);

            return () => clearInterval(intervalId);
        }
    }, [seasonsModal]);

    useEffect(() => {
        if (seasonsModal) {
            const intervalId = setInterval(() => {
                const modalElement = document.querySelector(".ant-modal");
                if (modalElement) {
                    const closeIcon = modalElement.querySelector('span[role="img"][aria-label="close"]');
                    if (closeIcon) {
                        closeIcon.setAttribute("role", "button");
                        clearInterval(intervalId); // ✅ Stop once done
                    }
                }
            }, 50);

            return () => clearInterval(intervalId);
        }
    }, [seasonsModal]);
    useEffect(() => {
        if (seasonsModal) {
            const intervalId = setInterval(() => {
                const modalElement = document.querySelector(".ant-modal");
                if (modalElement) {
                    modalElement.setAttribute("aria-label", "Select term");

                    // Remove the first aria-hidden="true" element inside the modal
                    const ariaHiddenDiv = modalElement.querySelector('div[aria-hidden="true"]');
                    if (ariaHiddenDiv) {
                        ariaHiddenDiv.removeAttribute("aria-hidden");
                    }

                    clearInterval(intervalId); // Stop checking
                }
            }, 50);

            return () => clearInterval(intervalId);
        }
    }, [seasonsModal]);

    // useEffect(() => {
    //   const timeout = setTimeout(() => {
    //     const modal = document.querySelector('.ant-modal[role="dialog"]');
    //     if (modal) {
    //       const tabDiv = modal.querySelector('div[tabindex="0"]');
    //       if (tabDiv && tabDiv.parentElement === modal) {
    //         tabDiv.remove();
    //       }
    //     }
    //   }, 100);

    //   return () => clearTimeout(timeout);
    // }, [seasonsModal]);


    const modalRef = useRef(null)
    useEffect(() => {
        if (seasonsModal && modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTabKey = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        // tab
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleTabKey);

            firstElement?.focus();

            return () => {
                document.removeEventListener('keydown', handleTabKey);
            };
        }
    }, [seasonsModal]);

    return (
        <div>
            <div className="classSearchContent">
                <div className="classSearchHeaderDiv">

                    <h1 className="classSearchTitle">{title}</h1>
                    <Button
                        // id={style.seasonBtn}
                        onClick={() => {
                            setSeasonsModal(true);
                        }}

                    >
                        {default_seasons_term &&
                            default_seasons_term.DefaultTermDescr}
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
                                                                        setAnnounceValue(
                                                                            `Selected ${item.TermDescr}`
                                                                        );
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
                                            getHolidayCalendarData();
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
                <p className="classSearchDesc">{description}</p>
            </div>
            <Row style={{ width: "100%" }}>
                <Col
                    xxl={12}
                    xl={14}
                    lg={17}
                    md={20}
                    style={{ display: "flex", alignItems: "center" }}
                >
                    <Dropdown
                        overlay={menu}
                        trigger={["click"]}
                        visible={isSubDropDownOpen}
                        onVisibleChange={handleDropdownVisibility}
                    >
                        <Button
                            className="subjects-btn"
                            style={{ fontSize: "18px", padding: "10px 20px" }}
                            onClick={toggleDropdown}
                            aria-label="filter by subject"
                            aria-haspopup="true"
                            aria-controls="subject-menu"
                            aria-expanded={isSubDropDownOpen}
                        >
                            {"Select Subject"}
                            <img
                                // src={DownArrow}
                                alt=""
                                style={{ height: "0.7vh", marginTop: "0.3vh" }}
                            />
                        </Button>
                    </Dropdown>


                    <Input
                        className="search-bar-input"
                        placeholder="Search for classes by subject, course title, or instructor name "
                        onChange={(e) => setSearchData(e.target.value)}
                        value={searchData}
                    // suffix={<SearchOutlined id={style.searchIcon} />}
                    />
                    <div id="hamburger_icon_div">
                        <img
                            ref={hamburgerButtonRef} // Attach ref here
                            // src={hamburgerIcon}
                            alt="Open Filters Popup"
                            onClick={() => handleHamBurgerBtn()}
                            tabIndex="0"
                            role="button"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    handleHamBurgerBtn();
                                }
                            }}
                        />
                    </div>
                </Col>
                <Col xxl={12} id="clearAllFilters">
                    <span
                        style={{
                            fontSize: "14px",
                            fontWeight: "700",
                            color: "#006B81",
                            marginLeft: "10px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleClearAllFilters()}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                handleClearAllFilters();
                            }
                        }}
                        tabIndex="0"
                        role="button"
                        aria-label="Clear All Filters"
                    >
                        <u>Clear all filters</u>
                    </span>
                </Col>
            </Row>
        </div>
    );
};

export default ClassSearchHeader;
