import { getStoryblokApi } from "@storyblok/react";
import React, { useEffect, useState } from "react";
import "./myclasses.css";
import "./classsearch.css";

const ClassSearch = () => {
    const [blok, setBlok] = useState(null);
    const storyblokApi = getStoryblokApi();
    console.log('searchblok,', blok);
    const [isTooltip, setIsToolTip] = useState("");

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

    const handleExpandCollapseAll = () => {
        setCollapsedSections((prev) => {
            const newState = Object.keys(prev).reduce((acc, key) => {
                acc[key] = areAllCollapsed ? true : false;
                return acc;
            }, {});
            return newState;
        });
    };
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
    useEffect(() => {
        storyblokApi
            .get("cdn/stories/home", { version: "published" })
            .then(({ data }) => {
                const body = data?.story?.content?.body || [];

                const classSearchBlock = body.find(
                    (b) => b.component === "ClassSearch"
                );

                setBlok(classSearchBlock || null);
            })
            .catch((err) => console.error(err));
    }, [storyblokApi]);

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
    return (

        <div className="classSearchPage">
            <div className="classSearchLayout">

                {/* LEFT FILTER SIDEBAR */}
                <div className="filterSidebar">
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
                    <div className="classstatus" >
                        <div 
                        style={{display:'flex',alignItems:'center',gap:'10px'}}
                        onClick={() => {
                            toggleSection("classStatus");
                            
                        }}>
                            <span>{classStatus?.Title}</span>

                            {/* 🔹 RELATIVE WRAPPER */}
                            <div
                                style={{
                                    position: "relative",
                                    display: "inline-block",
                                    top: "8px",
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
                                onBlur={() => setIsToolTip(null)}
                            >
                                <button
                                    aria-label="More information about Class Status"
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        cursor: "pointer",
                                        height: "15px",
                                    }}
                                >
                                    {/* ICON */}
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

                                {/* ✅ TOOLTIP (NOW CORRECTLY POSITIONED) */}
                                {isTooltip === "Class Status" && (
                                    <div
                                        id="Class-Status"
                                        role="tooltip"
                                        style={{
                                            position: "absolute",
                                            bottom: "100%",              // ⬅️ above icon
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            background: "#f4f4f4",
                                            color: "var(--primaryBlue)",
                                            padding: "10px",
                                            borderRadius: "4px",
                                            width: "250px",
                                            zIndex: 9999,
                                            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <p className="classstatusfont">
                                            Select this filter to limit results to classes
                                            with available seats or a waitlist, and exclude
                                            those at capacity.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                        <span
                            className="deskTopPlusMinus"
                            aria-hidden="true"
                        >
                            {collapsedSections?.classStatus ? "-" : "+"}
                        </span>
                    </div>

                </div>

                {/* RIGHT CONTENT */}
                <div >
                    <div className="classSearchContent">
                        <h1 className="classSearchTitle">{blok?.Title}</h1>
                        <p className="classSearchDesc">
                            {classdescription?.Title}
                        </p>

                    </div>
                </div>

            </div>
        </div>

    );
};

export default ClassSearch;
