import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import allClassListJsonData from "../AllclassesList.json";
import ReactDOM from "react-dom";
import { Views } from "react-big-calendar";
// import class_search_api_data from "../data/course_data/classSearchAPIData";
import myClassData from "../data/newApiData";
import allApiData from "../data/allApiData";
// import ProxyResponse from "../data/course_data/ProxyResponse";
// import holiday_calendar from "../data/course_data/HolidayCalendar";
// import CampusData from "../data/course_data/Campus";
const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Enrolled");
  const [activeTabCode, setActiveTabCode] = useState("A");
  const [dashboardData, setDashboardData] = useState("Dashboard Data");
  const [searchData, setSearchData] = useState("");
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [isOpenForUseEffect, setIsOpenForUseEffect] = useState(false);
  const [globalModalOpen, setGlobalModalOpen] = useState(false);
  const [dayCalendarDetails, setdayCalendarDetails] = useState(false);
  const [datesDirection, setDatesDirection] = useState();
  const [termID, setTermId] = useState();
  const [popup, setPopUp] = useState(false);
  const [showPopover, setShowPopover] = useState(null);
  const [gradingBasis, setGradingBasis] = useState([]);
  const [consentConflictValue, setConsentConflictValue] = useState([]);

  const triggerRef = useRef(null);
  const inputRef = useRef(null);

  const skipRef = useRef(null);
  const calendarImgRef = useRef(null);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const focusedEventIdRef = useRef(null);


  const shouldRefocusPrev = useRef(false);
  const shouldRefocusNext = useRef(false);

  const [instructorData, setInstructorData] = useState();
  const [courseFormat, setCourseFormat] = useState([]);
  const [academicDept, setAcademicDept] = useState();
  const [adminTabActiveKey, setAdminTabActiveKey] = useState("Class Search");
  const [calssSearchApiData, setClassSearchApiData] = useState([]);
  const [myClassApiData, setMyClassApiData] = useState();
  const [MyclassApiDataResposneStatus, setMyclassApiDataResposneStatus] =
    useState();
  const [myClassAppointmentsData, setMyclassAppointmentsData] = useState();
  const [seasonsModalValue, setSeasonsModalValue] = useState();
  const [classSearchModalValue, setClassSearchModalValue] = useState();
  const [myClassesFilteredData, setMyClassesFilteredData] = useState();
  const [catchNoDataError, setCatchNoDataError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [myclassesFilteredDataEnroll, setMyclassFilteredDataEnroll] =
    useState();
  const [myClassesPlannedData, setMyClassesPlannedData] = useState();
  const [myScheduleFilteredData, setMyScheduleFilteredData] = useState();
  const [myScheduleStatusFilteredData, setMyScheduleStatusFilteredData] =
    useState();

  // const [currentDate, setCurrentDate] = useState();
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [seasonFilterApplyClick, setSeasonFilterApplyClick] = useState(false);
  const [globalTermId, setGlobalTermId] = useState("");
  const [enrollTab, setEnrollTab] = useState("E");
  const [daysEventsData, setDaysEventsData] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const calendarRef = useRef();
  const newDivRef = useRef(null);
  const [selected, setSelected] = useState("Month");
  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thur, setThur] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);
  const [season_term_display, setSeasonTermDisplay] = useState("");
  const [missingMyClassData, setMissingMyClassData] = useState();
  const [classLevelAtt, setClassLevelAtt] = useState();
  const [classStatusAtt, setClassStatusAtt] = useState();
  const [schoolAtt, setSchoolAtt] = useState();
  const [formatAtt, setFormatAtt] = useState();
  const [curatedAtt, setCuratedAtt] = useState();
  const [generalEducationAtt, setGeneralEducationAtt] = useState();
  const [tab, setTab] = useState(window?.innerWidth > 430 ? false : true);
  const [clearpagenumber, setClearPagenumber] = useState(1);
  const [withoutCourseDetails, setWithoutCourseApiDetails] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState([]);
  const [viewDetailsBoolean, setViewDetailsBoolean] = useState(false); // Basically it should be false, Due to commenting the code for loader I made it as true.
  const [currentPage, setCurrentPage] = useState(1);
  const [graduateOrUnderGrList, setGraduateOrUnderGrList] = useState([]);
  const hamburgerButtonRef = useRef(null); // Ref to focus the hamburger button
  const closeButtonRef = useRef(null);
  const [piwikLoaded, setPiwikLoaded] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState({});
  const [campusFilter, setCampusFilter] = useState();
  const [gradingBasisFilter, setGradingBasisFilter] = useState();
  const [cancelToken, setCancelToken] = useState(null);
  const fullCalendarRef = useRef(null); // Add this above the return
  const [currentEventDate, setCurrentEventDate] = useState();
  const [isApplyClicked, setIsApplyClicked] = useState(false);
  const default_seasons_term_Id =
    myClassApiData && myClassApiData?.Terms?.DefaultTerm;

  const getLocationDescrKey = (descr) =>
    `by_location_${descr?.toLowerCase()}`;
  const getLocationCount = (descr) =>
    allAttCounts?.[getLocationDescrKey(descr)] ?? 0;
  const isChildChecked = (parentName, locationDescr) => {
    return (
      selectedCampus[parentName]?.some(
        c => c.LOCATION_DESCR === locationDescr
      ) || false
    );
  };

  const areAllChildrenChecked = (children, parentName) => {
    const validChildren = children.filter(
      child => getLocationCount(child.LOCATION_DESCR) > 0
    );

    if (validChildren.length === 0) return false;

    return validChildren.every(child =>
      isChildChecked(parentName, child.LOCATION_DESCR)
    );
  };



  useEffect(() => {
    allClassListJsonData.class_level_filters?.forEach((data) =>
      setClassLevelAtt((prev) => ({
        ...prev,
        [data.value]: false,
      }))
    );
    allClassListJsonData.class_status_filters?.forEach((data) =>
      setClassStatusAtt((prev) => ({
        ...prev,
        [data.value]: false,
      }))
    );
    allClassListJsonData.schools_dep_filters?.forEach((data) =>
      setSchoolAtt((prev) => ({
        ...prev,
        [data.value]: false,
      }))
    );
    allClassListJsonData.formats_filters?.forEach((data) =>
      setFormatAtt((prev) => ({
        ...prev,
        [data.value]: false,
      }))
    );
    allClassListJsonData.curated_classes_more_filters?.forEach((data) =>
      setCuratedAtt((prev) => ({
        ...prev,
        [data.value]: false,
      }))
    );
    allClassListJsonData.more_general_education?.forEach((data) =>
      setGeneralEducationAtt((prev) => ({
        ...prev,
        [data.value]: false,
      }))
    );
  }, []);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedMyClassFilters, setSelectedMyClassFilters] = useState([]);
  const [winterIsChecked, setWinterIsChecked] = useState(false);
  const [autumnIsChecked, setAutumnIsChecked] = useState(false);
  const [navBarProxyApiCall, setNavBarProxyApiCall] = useState();
  const [selectDay, setSelectDay] = useState([]);
  const [classStatus, setClassStatus] = useState([]);
  const [classLevel, setClassLevel] = useState([]);
  const [grading, setGrading] = useState([]);
  const [curated, setCurated] = useState([]);
  const [education, setEducation] = useState([]);
  const [schoolAndDept, setSchoolAndDept] = useState([]);
  const [subject, setSubject] = useState();
  const [subjectId, setSubjectId] = useState();
  const [time, setTime] = useState([7, 21]);
  const [numUnits, setNumUnits] = useState([0, 18]);

  const [view, setView] = useState(false);
  const [viewCalendarMode, setviewCalendarMode] = useState(Views.WEEK);
  const targetTabRef = useRef(null);
  const targetListRef = useRef(null);
  const [isHandleSug, setIsHandleSug] = useState(false);
  const [allAttCounts, setAllAttCounts] = useState();
  const [selectedFiltersValue, setSelectedFiltersValue] = useState("");
  const [paramsValue, setParamsValue] = useState("");
  const [handleTimeBtnClick, setHandleTimeBtnClick] = useState(false);
  const [handelUnitsBtnClick, setHandleUnitsBtnClick] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [tabPosition, setTabPosition] = useState();
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTabView, setIsTabView] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCalenderModalOpen, setIsCalenderModalOpen] = useState(false);
  const [subjectClick, setSubjectClick] = useState();
  const [mainSubject, setMainSubject] = useState();
  const [mainSubjectId, setMainSubjectId] = useState();
  const [zeroValue, setZeroValue] = useState(0);
  const [width576, setWidth576] = useState();
  const [proxyApiResponse, setProxyApiResponse] = useState();
  const [stopProxyApiCall, setStopProxyApiCall] = useState("");
  const [searchCount, setSearchCount] = useState(0);
  const [skipApiCall, setSkipApiCall] = useState(false);
  const [popoverBlur, setPopoverBlur] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dayRef = useRef(null);
  const weekRef = useRef(null);
  const monthRef = useRef(null);
  const [sessionTimeOut, setSessionTimeOut] = useState('');
  const [instructorCheck, setInstructorCheck] = useState(false);
  const [subjectsFilter, setSubjectsFilter] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [schedulePayload, setSchedulePayload] = useState({});

  const eventRef = useRef(null);

  // useEffect(() => {

  //   if (!hasInteracted) return;
  //   if (viewCalendarMode === "day") {
  //     console.log('fasdadfsa');

  //     dayRef.current?.focus();
  //   } else if (viewCalendarMode === "week") {
  //     weekRef.current?.focus();
  //   } else if (viewCalendarMode === "month") {
  //     monthRef.current?.focus();
  //   }
  // }, [viewCalendarMode, hasInteracted]);

  let clearTimerRef = useRef();
  // let searchAllCount=0;
  const [searchAllCount, setSearchAllCount] = useState(0);
  let clearAllFilters = false;
  let count = 0;
  let searchFetched = false;
  const updateWidth576Position = () => {
    if (window.innerWidth <= 577) {
      setWidth576(true);
    } else {
      setWidth576(false);
    }
  };
  useEffect(() => {
    updateWidth576Position();
    window.addEventListener("resize", updateWidth576Position);
    return () => window.removeEventListener("resize", updateWidth576Position);
  }, []);
  const updateTabPosition = () => {
    if (window.innerWidth < 768) {
      setTabPosition("right");
      setIsMobileView(true);
    } else {
      setTabPosition("top");
      setIsMobileView(false);
    }
  };
  const updateTab_Position = () => {
    if (window.innerWidth < 992) {
      setIsTabView(true);
    } else setIsTabView(false);
  };
  useEffect(() => {
    updateTab_Position();
    window.addEventListener("resize", updateTab_Position);
    return () => window.removeEventListener("resize", updateTab_Position);
  }, []);
  const updateSmallScreen = () => {
    if (window.innerWidth < 576) {
      setIsSmallScreen(true);
    } else setIsSmallScreen(false);
  };
  useEffect(() => {
    updateSmallScreen();
    window.addEventListener("resize", updateSmallScreen);
    return () => window.removeEventListener("resize", updateSmallScreen);
  }, []);
  const handleInstCheckboxChange = (e, suggestion) => {
    e.stopPropagation(); // Prevent event from closing suggestions
    e.preventDefault();
    setSelectedItems((prevSelected) =>
      prevSelected.includes(suggestion)
        ? prevSelected.filter((item) => item !== suggestion)
        : [...prevSelected, suggestion]
    );
    setSearchAllCount((prevCount) =>
      selectedItems.includes(suggestion) ? prevCount - 1 : prevCount + 1
    );
  };
  const handleClickOutside = (e) => {
    if (!e.target.closest(".search-container")) {
      setFilteredSuggestions([]);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleTabClick = (key) => {
    const tabNames = { E: "Enrolled", W: "Waitlisted", P: "Planned", A: "All" };
    const selectedTab = tabNames[key];
    setActiveTab(selectedTab);
    setActiveTabCode(key);
    setEnrollTab(key);
  };
  const handleFormatSelect = (e) => {
    const { value, checked } = e.target;
    if (e.target.checked) {
      setCourseFormat((prevFormat) => [...prevFormat, value]);
      setFormatAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setCourseFormat((prevFormat) =>
        prevFormat.filter((filter) => filter !== value)
      );
      setFormatAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
  };
  const handleClearAll = () => {

    setFormatAtt((prev) => {
      const updatedFormatAtt = {};
      for (const key in prev) {
        updatedFormatAtt[key] = false; // Set each field to false
      }
      return updatedFormatAtt; // Return the updated object
    });
    setCourseFormat([]);
  };

  const handleClearEducation = () => {
    setGeneralEducationAtt((prev) => {
      const updatedAtt = {};
      for (const key in prev) {
        updatedAtt[key] = false; // Uncheck each checkbox
      }
      return updatedAtt;
    });

    setEducation([]); // Clear education data
  };
  const handleClassStatus = (e) => {
    const { value, checked } = e.target;
    if (e.target.checked) {
      setClassStatus((prevStatus) => [...prevStatus, value]);
      setClassStatusAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setClassStatus((prevStatus) =>
        prevStatus.filter((filter) => filter !== value)
      );
      setClassStatusAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
  };
  useEffect(() => {
    // console.log("****searachallcount", searchAllCount);
  }, [searchAllCount]);
  const handleClassLevel = (e) => {
    const { value, checked } = e.target;
    if (e.target.checked) {
      setClassLevel((prevClass) => [...prevClass, value]);
      setClassLevelAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setClassLevel((prevClass) =>
        prevClass.filter((filter) => filter !== value)
      );
      setClassLevelAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
  };

  const handleGradingBasis = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setGradingBasis((prev) => [...prev, value]);
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setGradingBasis((prev) => prev.filter((item) => item !== value));
    }
  };


  const handleCurated = (e) => {
    const { value, checked } = e.target;
    if (e.target.checked) {
      setCurated((prevCurated) => [...prevCurated, value]);
      setCuratedAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setCurated((prevCurated) =>
        prevCurated.filter((filter) => filter !== value)
      );
      setCuratedAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
    }
    //setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };
  const handleEducation = (e) => {
    const { value, checked } = e.target;
    if (e.target.checked) {
      setEducation((prevEducation) => [...prevEducation, value]);
      setGeneralEducationAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setEducation((prevEducation) =>
        prevEducation.filter((filter) => filter !== value)
      );
      setGeneralEducationAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
    }
    //setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };
  const handleSchoolAndDept = (e) => {
    const { value, checked } = e.target;
    if (e.target.checked) {
      setSchoolAndDept((prevSchoolAndDept) => [...prevSchoolAndDept, value]);
      setSchoolAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSchoolAndDept((prevSchoolAndDept) =>
        prevSchoolAndDept.filter((filter) => filter !== value)
      );
      setSchoolAtt((prev) => ({
        ...prev,
        [value]: checked,
      }));
    }
    //setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };
  const getDaysFromFlags = (meeting) => {
    const daysMap = {
      mon: meeting.Mon === "Y",
      tues: meeting.Tue === "Y",
      wed: meeting.Wed === "Y",
      thurs: meeting.Thu === "Y",
      fri: meeting.Fri === "Y",
      sat: meeting.Sat === "Y",
      sun: meeting.Sun === "Y",
    };

    return Object.keys(daysMap)
      .filter(day => daysMap[day])
      .join(", ");
  };

  const buildSchedulePayload = (scheduleArray = [], missingMyClassData = []) => {
    return scheduleArray.reduce((acc, schedule) => {
      const classNbr = schedule.Nbr || schedule.ClassNumber;

      if (!classNbr) return acc;

      const meeting =
        schedule.Meeting?.[0] ||
        schedule.Meeting_Pattern?.[0] ||
        {};

      const endDateStr = missingMyClassData.find(
        item => item.classNbr === classNbr
      )?.endDt || "";

      acc[classNbr] = {
        startDate: meeting?.StartDate || schedule?.StartDate || "",
        endDate: endDateStr || meeting?.EndDate || schedule?.EndDate || "",
        startTime: meeting?.MeetingStart || meeting?.StartTime || "",
        endTime: meeting?.MeetingEnd || meeting?.EndTime || "",
        days: meeting.Mon
          ? getDaysFromFlags(meeting)
          : schedule?.Meeting_Pattern?.[0]?.Days
            ?.split("")
            .map((d, i) =>
              d === "Y"
                ? ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"][i]
                : null
            )
            .filter(Boolean)
            .join(", ") || ""
      };

      return acc;
    }, {});
  };



  const handleConsentConflcit = (e, item) => {
    const { checked } = e.target;

    if (checked) {
      if (item.value === 'NO_CONSENT') {
        setConsentConflictValue(prev => [
          ...prev,
          { value: item.value, label: item.conflict_option }
        ]);
      } else {
        setConsentConflictValue(prev => [
          ...prev,
          { value: item.value, label: item.conflict_option }
        ]);

        const payload = buildSchedulePayload(
          myScheduleFilteredData,
          missingMyClassData
        );
        setSchedulePayload(payload);
      }
    } else {
      setConsentConflictValue(prev =>
        prev.filter(x => x.value !== item.value)
      );

      if (item.value !== "NO_CONSENT") {
        setSchedulePayload({});
      }
    }
  };




  const handleTime = (value) => {
    setTime(value);
  };
  const handleNumUnits = (value) => {
    setNumUnits(value);
  };
  const [selectedEventId, setSelectedEventId] = useState(null);
  // const [selectedEventId, setSelectedEventId] = useState(null);
  // const [daysEventsData, setDaysEventsData] = useState(null);
  const handleDayEventComponent = (event) => {
    setSelectedEventId(event?.id);
    setDaysEventsData(event);
    const daysEvents_Data = event
      ? {
        title: event?.title,
        ClassDescr: event?.ClassDescr,
        type: event?.type,
        location: event?.location,
        instructor: event?.instructor,
        courseDescr: event?.courseDescr,
        start_time: event?.start_time,
        end_time: event?.end_time,
        start: event?.start,
        facilityMapId: event?.facilityMapId,
        EnrollStatusDescr: event?.EnrollStatusDescr,
        has_conflict: event?.has_conflict,
      }
      : null;
    if (viewCalendarMode === "day") {
      setdayCalendarDetails(true);
      const calendarDiv = calendarRef.current;
      if (calendarDiv) {
        const targetDiv = calendarDiv.querySelector(".rbc-events-container");
        if (targetDiv) {
          if (!newDivRef.current || !targetDiv.contains(newDivRef.current)) {
            if (newDivRef.current) {
              ReactDOM.unmountComponentAtNode(newDivRef.current);
              newDivRef.current.remove();
              newDivRef.current = null;
            }
            const newDiv = document.createElement("div");
            targetDiv.appendChild(newDiv);
            newDivRef.current = newDiv;
          }
          if (!event && newDivRef.current) {
            ReactDOM.unmountComponentAtNode(newDivRef.current);
            newDivRef.current.remove();
            newDivRef.current = null;
            return;
          }
          if (event) {
            // ReactDOM.render(
            //   <DayViewEventsData daysEventsData={daysEvents_Data} />,
            //   newDivRef.current
            // );
          }
        }
      }
    }
  };
  let stopQueryParms;
  const getClassSearchDefaultApiData = async (term_id, queryParam) => {
    // stopQueryParms = queryParam;
    // console.log("****", stopQueryParms);

    // if (
    //   !queryParam ||
    //   queryParam ===
    //     "&days=&format=&class_status=&class_level=&curated_class=&general_education=&school_and_department=&startTime=7&endTime=21&startUnits=0&endUnits=18&instructor_name_list=&searchText=&mainSubjectId=&subject_id=" ||
    //   queryParam === ""
    // ) {
    //   // console.log("*****insidemain retun");
    //   setClassSearchApiData();
    //   setWithoutCourseApiDetails(true);
    //   return;
    // }

    if (!queryParam) {
      queryParam = "";
    }

    if (cancelToken) {
      cancelToken.cancel("Canceling previous request");
    }
    const source = axios.CancelToken.source();
    setCancelToken(source);
    if (skipApiCall === false) {
      if (
        classStatus.length === 0 &&
        !mon &&
        !tue &&
        !wed &&
        !thur &&
        !fri &&
        !sat &&
        !sun &&
        selectedItems.length === 0 &&
        courseFormat.length === 0 &&
        numUnits[0] === 0 &&
        numUnits[1] === 18 &&
        time[0] === 7 &&
        time[1] === 21 &&
        classLevel.length === 0 &&
        curated.length === 0 &&
        education.length === 0 &&
        schoolAndDept.length === 0 &&
        searchData === "" &&
        Object.keys(selectedOptions).length === 0 &&
        consentConflictValue.length === 0 &&
        gradingBasis.length === 0 &&
        Object.keys(schedulePayload).length === 0 &&
        Object.keys(selectedCampus).length === 0
      ) {
        setClassSearchApiData();
        // setClassSearchApiData(class_search_api_data);
        setSearchCount(0);
        return true;
      }
      await axios
        .get(
          `/navenroll-api/getMainCourseResults?searchTerm=${term_id}${queryParam}`,
          {
            cancelToken: source.token,
          }
        )
        .then((response) => {
          searchFetched = true;
          setSearchCount(count);
          setCurrentPage(1);
          setClassSearchApiData(response?.data?.allData);
        })
        .catch((err) => {
          console.log(err);

          // setClassSearchApiData(class_search_api_data);
        });
    }
    // setClassSearchApiData(class_search_api_data);
    setSkipApiCall(false);
  };
  let formattedData = [];
  let formattedData1 = [];
  const getMyClassApiDefaultData = async (value) => {
    setLoader(true);
    // if (value != "stopproxy") {
    //   const payload = {
    //     Service_Type: "DoProxy",
    //     Sunetid: "",
    //     ProxySunetid: "inputsunetid",
    //   };
    //   const postData = JSON.stringify(payload);
    //   await axios
    //     .post(
    //       `/navenroll-api/postRequest`,
    //       {
    //         postData: postData,
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       setSeasonTermDisplay("");
    //       setProxyApiResponse(response?.data?.response_data);
    //       // setNavBarProxyApiCall(response);
    //     })
    //     .catch((error) => {
    //       // setProxyApiResponse(ProxyResponse[0]?.response_data);
    //       console.log("Error:", error);
    //     });
    // }

    await axios
      .get(`/navenroll-api/getClassList`)
      .then((response) => {

        let data = response.data;
        if (typeof data === "string") {
          try {
            const fixed = data
              ?.replace(/,\s*,/g, ",")
              ?.replace(/,\s*}/g, "}")
              ?.replace(/,\s*]/g, "]");

            data = JSON?.parse(fixed);
            setMyClassApiData(data?.response_data);
          } catch (e) {
            console.error("JSON parse failed even after fix:", e);
            return;
          }
        } else {
          setMyClassApiData(response?.data?.response_data);
        }

        // setMyClassApiData(response?.data?.response_data);
        setGraduateOrUnderGrList(
          response?.data?.response_data?.Careers?.Career
        );
        setMyclassApiDataResposneStatus(response?.data?.response_status);
        setMyclassAppointmentsData(response?.data?.response_data?.Appointments);
        // if (
        //   response?.data?.response_data?.CareerGroup?.Careers?.length > 0 ||
        //   response?.data?.response_data?.CareerClasspicks?.Careers?.length > 0
        // ) {
        //   setDisplayCalendar(true);
        // } else {
        //   setDisplayCalendar(false);
        // }
        if (response?.data?.response_data?.CareerGroup?.Careers) {
          setMyClassesFilteredData(
            response?.data?.response_data?.CareerGroup?.Careers
          );

          setMyclassFilteredDataEnroll(
            response?.data?.response_data?.CareerGroup?.Careers
          );
        } else {
          setMyClassesFilteredData([]);
          setMyclassFilteredDataEnroll([]);
        }
        if (response?.data?.response_data?.CareerClasspicks?.Careers) {
          setMyClassesPlannedData(
            response?.data?.response_data?.CareerClasspicks?.Careers
          );
        } else {
          setMyClassesPlannedData([]);
        }
        // const classesArray =
        //   response?.data?.response_data?.CareerGroup?.Careers?.reduce(
        //     (acc, item) => {
        //       return acc.concat(item?.Career?.Terms?.Term?.Classes?.Class);
        //     },
        //     []
        //   );
        // setMyScheduleFilteredData(classesArray);

        const careerGroupClasses =
          response?.data?.response_data?.CareerGroup?.Careers?.reduce(
            (acc, career) => {
              const classes = career?.Career?.Terms?.Term?.Classes?.Class || [];
              return acc.concat(classes);
            },
            []
          );
        const careerClasspicksClasses =
          response?.data?.response_data?.CareerClasspicks?.Careers?.reduce(
            (acc, career) => {
              const classPicks =
                career?.Career?.Terms?.Term?.ClassPicks?.Classpick || [];
              return acc.concat(
                classPicks.map((classPick) => ({
                  ...classPick,
                  Source: "CareerClasspicks",
                }))
              );
            },
            []
          );
        const classesArray = [
          ...(careerGroupClasses || []),
          ...(careerClasspicksClasses || []),
        ];
        setMyScheduleFilteredData(classesArray);
        setGlobalTermId(response?.data?.response_data?.Terms?.DefaultTerm);
        localStorage.setItem(
          "term_data",
          JSON.stringify(response.data.response_data?.Terms?.Term)
        );
        formattedData =
          response?.data?.response_data?.CareerGroup?.Careers?.flatMap(
            (career) =>
              career?.Career?.Terms?.Term?.Classes?.Class?.map((cls) => ({
                strm: career?.Career?.Terms?.Term?.Code,
                subject: cls?.Subject,
                catalogNbr: cls?.CatalogNbr,
                classNbr: cls?.Nbr,
              }))
          );
        formattedData1 =
          response?.data?.response_data?.CareerClasspicks?.Careers?.flatMap(
            (career) =>
              career?.Career?.Terms?.Term?.ClassPicks?.Classpick?.map(
                (cls) => ({
                  strm: career?.Career?.Terms?.Term?.Code,
                  subject: cls?.Subject,
                  catalogNbr: cls?.CatalogNbr,
                  classNbr: cls?.ClassNumber,
                })
              )
          );
        const payload =
          formattedData && formattedData1
            ? formattedData?.concat(formattedData1)
            : formattedData
              ? formattedData
              : formattedData1;
        const postData = JSON.stringify(payload);
        axios
          .post(
            `/navenroll-api/getCourseDetails`,
            {
              postData: postData,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setMissingMyClassData(res?.data?.allData);
          })
          .catch((err) => {
            console.log("classes list err :" + err);
          });
      })
      .catch((err) => {
        console.log(err);
        setCatchNoDataError(true);
        getClassSearchDefaultApiData("1246");
        setMyClassApiData(myClassData?.[0]?.response_data);
        setGraduateOrUnderGrList(
          myClassData?.[0]?.response_data?.Careers?.Career
        );
        setMyclassApiDataResposneStatus(myClassData[0]?.response_status);
        setMyclassAppointmentsData(
          myClassData?.[0]?.response_data?.Appointments
        );
        setGlobalTermId(myClassData?.[0]?.response_data?.Terms?.DefaultTerm);
        localStorage.setItem(
          "term_data",
          JSON.stringify(myClassData?.[0]?.response_data?.Terms?.Term)
        );
        setMyClassesFilteredData(
          myClassData?.[0].response_data?.CareerGroup?.Careers
        );
        setMyclassFilteredDataEnroll(
          myClassData[0]?.response_data?.CareerGroup?.Careers
        );
        setMyClassesPlannedData(
          myClassData[0]?.response_data?.CareerClasspicks?.Careers
        );
        const careerGroupClasses =
          myClassData[0].response_data?.CareerGroup?.Careers?.reduce(
            (acc, career) => {
              const classes = career?.Career?.Terms?.Term?.Classes?.Class || [];
              return acc.concat(classes);
            },
            []
          );
        const careerClasspicksClasses =
          myClassData[0].response_data?.CareerClasspicks?.Careers?.reduce(
            (acc, career) => {
              const classPicks =
                career?.Career?.Terms?.Term?.ClassPicks?.Classpick || [];
              return acc.concat(
                classPicks.map((classPick) => ({
                  ...classPick,
                  Source: "CareerClasspicks",
                }))
              );
            },
            []
          );
        const classesArray = [
          ...(careerGroupClasses || []),
          ...(careerClasspicksClasses || []),
        ];
        setMyScheduleFilteredData(classesArray);
        const formattedData =
          myClassData?.[0].response_data?.CareerGroup?.Careers?.flatMap(
            (career) =>
              career?.Career?.Terms?.Term?.Classes?.Class?.map((cls) => ({
                strm: career?.Career?.Terms?.Term?.Code,
                subject: cls?.Subject,
                catalogNbr: cls?.CatalogNbr,
                classNbr: cls?.Nbr,
              }))
          );
        const formattedData1 =
          myClassData?.[0]?.response_data?.CareerClasspicks?.Careers?.flatMap(
            (career) =>
              career?.Career?.Terms?.Term?.ClassPicks?.Classpick?.map(
                (cls) => ({
                  strm: career?.Career?.Terms?.Term?.Code,
                  subject: cls?.Subject,
                  catalogNbr: cls?.CatalogNbr,
                  classNbr: cls?.ClassNumber,
                })
              )
          );
        const payload = [formattedData?.concat(formattedData1)];
        setMissingMyClassData(allApiData);
      });
    value = "";
    setLoader(false);
  };


  const [holidayCalendarData, setHolidayCalendarData] = useState(null);

  let termStartDate = null;
  let termEndDate = null;

  useEffect(() => {
    if (default_seasons_term_Id && myClassApiData?.Terms?.Term && !seasonsModalValue) {
      const matchedTerm = myClassApiData.Terms.Term.find(
        (t) => t.Term === default_seasons_term_Id
      );

      if (matchedTerm) {
        termStartDate = matchedTerm.TermBeginDate;
        termEndDate = matchedTerm.TermEndDate;
      }

    } else if (seasonsModalValue && myClassApiData?.Terms?.Term) {
      const matchedTerm = myClassApiData.Terms.Term.find(
        (t) => t.Term === seasonsModalValue
      );
      if (matchedTerm) {
        termStartDate = matchedTerm.TermBeginDate;
        termEndDate = matchedTerm.TermEndDate;
      }

    }
  }, [default_seasons_term_Id, seasonsModalValue, myClassApiData]);

  // Run once on component mount
  useEffect(() => {
    getHolidayCalendarData();
  }, [default_seasons_term_Id, seasonsModalValue]);
  useEffect(() => {
    if (myClassApiData) {
      console.log("myClassApiData updated:", myClassApiData);
    }
  }, [myClassApiData]);

  const getHolidayCalendarData = async () => {
    setMyClassApiData(myClassData?.[0]?.response_data);

    const payload = {
      Service_Type: "Calendar",
      Sunetid: "inputsunetid",
      SearchTerm: seasonsModalValue ? seasonsModalValue : default_seasons_term_Id,
      StartDate: termStartDate,
      EndDate: termEndDate,
      EventType: "H",
    };

    const postData = JSON.stringify(payload);

    try {
      const response = await axios.post(
        `/navenroll-api/postRequest`,
        { postData: postData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data) {
        setHolidayCalendarData(response?.data?.response_data?.CalendarData?.CalendarList);
      }
    } catch (error) {
      // setHolidayCalendarData(holiday_calendar[0]?.response_data?.CalendarData?.CalendarList);
      console.error("Error fetching calendar:", error);
    }
  };
  useEffect(() => {
    getMyClassApiDefaultData();
  }, []);

  if (!piwikLoaded) {
    setPiwikLoaded(true);
    axios
      .post(`/navenroll-api/getPiwikDetails`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const obj = response.data;
        // setInstructorCheck(obj?.instructor_check === 'true');
        setSessionTimeOut(obj?.sessiontime);
        setCampusFilter(obj?.CAMPUS_FILTER);
        setGradingBasisFilter(obj?.GRADING_BASIS_FILTER[0]?.GRADING_BASIS_FILTER)
        if (obj.piwikUrl) {
          const _paq = window._paq = window._paq || [];
          _paq.push(['setTrackerUrl', `${obj.piwikUrl}piwik.php`]);
          _paq.push(['setSiteId', `${obj.siteId}`]);
          _paq.push(['setCustomDimension', 1, `${obj.sunetid}`]);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          const d = document;
          const g = d.createElement('script');
          const s = d.getElementsByTagName('script')[0];
          g.type = 'text/javascript';
          g.async = true;
          g.src = `${obj.piwikUrl}piwik.js`;
          s.parentNode.insertBefore(g, s);
          const trackingScript = document.createElement('script');
          trackingScript.type = 'text/javascript';

          trackingScript.text = `var _paq = window._paq = window._paq || [];
            _paq.push(['setTrackerUrl', '${obj.piwikUrl}piwik.php']);
            _paq.push(['setSiteId', '${obj.siteId}']);
            _paq.push(['setCustomDimension', 1, '${obj.sunetid}']);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
          var d = document;
            const g = d.createElement('script');
            const s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript';
          g.async = true;
          g.src = '${obj.piwikUrl}piwik.js';
          s.parentNode.insertBefore(g, s);`
          document?.head?.appendChild(trackingScript);
        }
      })
      .catch((error) => {
        // setCampusFilter(CampusData.CAMPUS_FILTER);
        // setGradingBasisFilter(CampusData.GRADING_BASIS_FILTER[0].GRADING_BASIS_FILTER);
        // setSessionTimeOut("120");

        console.log(error);
        console.log("Piwik Api call failed");
      });
  }

  const getSelectedCourseData = async (
    selected_my_class_filter,
    onlyClassCall
  ) => {
    console.log(onlyClassCall);
    // **************  API For Class Search Filtered Data *************//
    // console.log("****beforstopQueryParms", stopQueryParms);
    // if (
    //   !stopQueryParms ||
    //   stopQueryParms ===
    //     "&days=&format=&class_status=&class_level=&curated_class=&general_education=&school_and_department=&startTime=7&endTime=21&startUnits=0&endUnits=18&instructor_name_list=&searchText=&mainSubjectId=&subject_id=" ||
    //   stopQueryParms === ""
    // ) {
    //   // console.log("******inside return", stopQueryParms);
    //   setClassSearchApiData();
    //   return;
    // }
    if (!onlyClassCall) {
      await axios
        .get(
          `/navenroll-api/getMainCourseResults?searchTerm=${selected_my_class_filter}`
        )
        .then((response) => {
          searchFetched = true;
          setSearchCount(count);
          setCurrentPage(1);
          setClassSearchApiData(response?.data?.allData);
        })
        .catch((err) => {
          console.log(err);
          // setClassSearchApiData(class_search_api_data);
        });
    }
    // **************  API For My Class Filtered Data*************//
    await axios
      .get(`/navenroll-api/getClassList?searchTerm=${selected_my_class_filter}`)
      .then((response) => {
        let output = response.data;
        if (response.data && typeof response.data === "string") {
          output = JSON.parse(response.data);
        }
        setMyClassApiData(output?.response_data);
        setGraduateOrUnderGrList(output?.response_data?.Careers?.Career);
        setMyClassesFilteredData(output?.response_data?.CareerGroup?.Careers);
        setMyclassFilteredDataEnroll(
          output?.response_data?.CareerGroup?.Careers
        );
        setMyClassesPlannedData(output?.response_data.CareerClasspicks.Careers);
        setMyclassAppointmentsData(output?.response_data?.Appointments);
        // if (
        //   output?.response_data?.CareerGroup?.Careers?.length > 0 ||
        //   output?.response_data?.CareerClasspicks?.Careers?.length > 0 ||
        //   onlyClassCall === "OpenCalendar"
        // ) {
        //   setDisplayCalendar(true);
        // } else {
        //   setDisplayCalendar(false);
        // }
        // const classesArray = output.response_data.CareerGroup?.Careers?.reduce(
        //   (acc, item) => {
        //     return acc.concat(
        //       item?.CareerGroup?.Career?.Terms?.Term?.Classes?.Class
        //     );
        //   },
        //   []
        // );
        // setMyScheduleFilteredData(classesArray);

        const careerGroupClasses =
          response?.data?.response_data?.CareerGroup?.Careers?.reduce(
            (acc, career) => {
              const classes = career?.Career?.Terms?.Term?.Classes?.Class || [];
              return acc.concat(classes);
            },
            []
          );
        const careerClasspicksClasses =
          response?.data?.response_data?.CareerClasspicks?.Careers?.reduce(
            (acc, career) => {
              const classPicks =
                career?.Career?.Terms?.Term?.ClassPicks?.Classpick || [];
              return acc.concat(
                classPicks.map((classPick) => ({
                  ...classPick,
                  Source: "CareerClasspicks",
                }))
              );
            },
            []
          );
        const classesArray = [
          ...(careerGroupClasses || []),
          ...(careerClasspicksClasses || []),
        ];
        setMyScheduleFilteredData(classesArray);
        formattedData =
          response?.data?.response_data?.CareerGroup?.Careers?.flatMap(
            (career) =>
              career?.Career?.Terms?.Term?.Classes?.Class?.map((cls) => ({
                strm: career?.Career?.Terms?.Term?.Code,
                subject: cls?.Subject,
                catalogNbr: cls?.CatalogNbr,
                classNbr: cls?.Nbr,
              }))
          );
        formattedData1 =
          response?.data?.response_data?.CareerClasspicks?.Careers?.flatMap(
            (career) =>
              career?.Career?.Terms?.Term?.ClassPicks?.Classpick?.map(
                (cls) => ({
                  strm: career?.Career?.Terms?.Term?.Code,
                  subject: cls?.Subject,
                  catalogNbr: cls?.CatalogNbr,
                  classNbr: cls?.ClassNumber,
                })
              )
          );
        const payload =
          formattedData && formattedData1
            ? formattedData?.concat(formattedData1)
            : formattedData
              ? formattedData
              : formattedData1;
        const postData = JSON.stringify(payload);
        axios
          .post(
            `/navenroll-api/getCourseDetails`,
            {
              postData: postData,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            setMissingMyClassData(res?.data?.allData);
          })
          .catch((err) => {
            console.log("classes list err :" + err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleFilterMySchedule = (statuses) => {
  //   console.log(statuses);
  //   if (statuses.length === 0) {
  //     setMyScheduleStatusFilteredData(myScheduleFilteredData);
  //     return;
  //   }
  //   const filtered = myScheduleFilteredData.filter((cls) => {
  //     if (statuses.includes("P") && !cls.hasOwnProperty("EnrollmentStatus")) {
  //       return true;
  //     }
  //     if (statuses.includes("E") && cls.EnrollmentStatus === "E") {
  //       return true;
  //     }
  //     if (statuses.includes("W") && cls.EnrollmentStatus === "W") {
  //       return true;
  //     }
  //     return false;
  //   });

  //   setMyScheduleStatusFilteredData(filtered);
  // };

  // const handleFilterMySchedule = (statuses) => {
  //   console.log(statuses);
  //   if (statuses.length === 0) {
  //     setMyScheduleStatusFilteredData(myScheduleFilteredData);
  //     return;
  //   }
  //   const filtered = myScheduleFilteredData.filter((cls, index, arr) => {
  //     if (statuses.includes("P") && !cls.hasOwnProperty("EnrollmentStatus")) {
  //       return true;
  //     }
  //     if (statuses.includes("E") && cls.EnrollmentStatus === "E") {
  //       return true;
  //     }
  //     if (statuses.includes("W") && cls.EnrollmentStatus === "W") {
  //       return true;
  //     }
  //     if (statuses.includes("C")) {
  //       const clsStart = cls?.Meeting?.[0]?.MeetingStart;
  //       const clsEnd = cls?.Meeting?.[0]?.MeetingEnd;
  //       if (
  //         !clsStart ||
  //         !clsEnd ||
  //         clsStart === "00:00:00" ||
  //         clsEnd === "00:00:00"
  //       ) {
  //         return false;
  //       }
  //       return arr.some((otherCls, otherIndex) => {
  //         if (index === otherIndex) return false;
  //         const otherStart = otherCls?.Meeting?.[0]?.MeetingStart;
  //         const otherEnd = otherCls?.Meeting?.[0]?.MeetingEnd;
  //         if (
  //           !otherStart ||
  //           !otherEnd ||
  //           otherStart === "00:00:00" ||
  //           otherEnd === "00:00:00"
  //         ) {
  //           return false;
  //         }
  //         return clsStart < otherEnd && clsEnd > otherStart;
  //       });
  //     }
  //     return false;
  //   });
  //   console.log(filtered);
  //   setMyScheduleStatusFilteredData(filtered);
  // };

  // const handleFilterMySchedule = (statuses) => {
  //   if (statuses.length === 0) {
  //     setMyScheduleStatusFilteredData(myScheduleFilteredData);
  //     return;
  //   }
  //   const filtered = myScheduleFilteredData.filter((cls, index, arr) => {
  //     const getStartAndEndTimes = (data) => {
  //       if (data?.Meeting_Pattern?.length > 0) {
  //         const pattern = data.Meeting_Pattern[0];
  //         return { start: pattern.StartTime, end: pattern.EndTime };
  //       }
  //       if (data?.Meeting?.length > 0) {
  //         const meeting = data.Meeting[0];
  //         return { start: meeting.MeetingStart, end: meeting.MeetingEnd };
  //       }
  //       return { start: null, end: null };
  //     };
  //     const { start: clsStart, end: clsEnd } = getStartAndEndTimes(cls);
  //     if (statuses.includes("P") && !cls.hasOwnProperty("EnrollmentStatus")) {
  //       return true;
  //     }
  //     if (statuses.includes("E") && cls.EnrollmentStatus === "E") {
  //       return true;
  //     }
  //     if (statuses.includes("W") && cls.EnrollmentStatus === "W") {
  //       return true;
  //     }
  //     if (statuses.includes("C")) {
  //       if (
  //         !clsStart ||
  //         !clsEnd ||
  //         clsStart === "00:00:00" ||
  //         clsEnd === "00:00:00"
  //       ) {
  //         return false;
  //       }
  //       return arr.some((otherCls, otherIndex) => {
  //         if (index === otherIndex) return false;
  //         const { start: otherStart, end: otherEnd } =
  //           getStartAndEndTimes(otherCls);
  //         if (
  //           !otherStart ||
  //           !otherEnd ||
  //           otherStart === "00:00:00" ||
  //           otherEnd === "00:00:00"
  //         ) {
  //           return false;
  //         }
  //         return clsStart < otherEnd && clsEnd > otherStart;
  //       });
  //     }
  //     return false;
  //   });
  //   setMyScheduleStatusFilteredData(filtered);
  // };

  // const handleFilterMySchedule = (statuses) => {
  //   if (statuses.length === 0) {
  //     setMyScheduleStatusFilteredData(myScheduleFilteredData);
  //     return;
  //   }
  //   const filtered = myScheduleFilteredData.filter((cls, index, arr) => {
  //     const getStartAndEndTimes = (data) => {
  //       if (data?.Meeting_Pattern?.length > 0) {
  //         const pattern = data.Meeting_Pattern[0];
  //         return { start: pattern.StartTime, end: pattern.EndTime };
  //       }
  //       if (data?.Meeting?.length > 0) {
  //         const meeting = data.Meeting[0];
  //         return { start: meeting.MeetingStart, end: meeting.MeetingEnd };
  //       }
  //       return { start: null, end: null };
  //     };
  //     const { start: clsStart, end: clsEnd } = getStartAndEndTimes(cls);
  //     if (statuses.includes("P") && !cls.hasOwnProperty("EnrollmentStatus")) {
  //       return true;
  //     }
  //     if (statuses.includes("E") && cls.EnrollmentStatus === "E") {
  //       return true;
  //     }
  //     if (statuses.includes("W") && cls.EnrollmentStatus === "W") {
  //       return true;
  //     }
  //     if (statuses.includes("C")) {
  //       if (
  //         !clsStart ||
  //         !clsEnd ||
  //         clsStart === "00:00:00" ||
  //         clsEnd === "00:00:00"
  //       ) {
  //         return false;
  //       }
  //       const clsStartTime = new Date(`1970-01-01T${clsStart}Z`).getTime();
  //       const clsEndTime = new Date(`1970-01-01T${clsEnd}Z`).getTime();
  //       return arr.some((otherCls, otherIndex) => {
  //         if (index === otherIndex) return false;
  //         const { start: otherStart, end: otherEnd } =
  //           getStartAndEndTimes(otherCls);
  //         if (
  //           !otherStart ||
  //           !otherEnd ||
  //           otherStart === "00:00:00" ||
  //           otherEnd === "00:00:00"
  //         ) {
  //           return false;
  //         }
  //         const otherStartTime = new Date(
  //           `1970-01-01T${otherStart}Z`
  //         ).getTime();
  //         const otherEndTime = new Date(`1970-01-01T${otherEnd}Z`).getTime();
  //         return (
  //           (clsStartTime < otherEndTime && clsEndTime > otherStartTime) ||
  //           (clsStartTime === otherStartTime && clsEndTime === otherEndTime)
  //         );
  //       });
  //     }
  //     return false;
  //   });
  //   setMyScheduleStatusFilteredData(filtered);
  // };

  // const handleFilterMySchedule = (statuses) => {
  //   console.log(statuses);

  //   if (statuses.length === 0) {
  //     setMyScheduleStatusFilteredData(myScheduleFilteredData);
  //     return;
  //   }

  //   // Helper function to get start and end times for a class
  //   const getStartAndEndTimes = (data) => {
  //     if (data?.Meeting_Pattern?.length > 0) {
  //       const pattern = data.Meeting_Pattern[0];
  //       return { start: pattern.StartTime, end: pattern.EndTime };
  //     }
  //     if (data?.Meeting?.length > 0) {
  //       const meeting = data.Meeting[0];
  //       return { start: meeting.MeetingStart, end: meeting.MeetingEnd };
  //     }
  //     return { start: null, end: null };
  //   };

  //   // Conflict detection logic
  //   const checkClassConflict = (cls, arr) => {
  //     const { start: clsStart, end: clsEnd } = getStartAndEndTimes(cls);

  //     if (
  //       !clsStart ||
  //       !clsEnd ||
  //       clsStart === "00:00:00" ||
  //       clsEnd === "00:00:00"
  //     ) {
  //       return false; // Skip classes with invalid times
  //     }

  //     const clsStartTime = new Date(`1970-01-01T${clsStart}Z`).getTime();
  //     const clsEndTime = new Date(`1970-01-01T${clsEnd}Z`).getTime();

  //     return arr.some((otherCls) => {
  //       if (cls === otherCls) return false; // Skip self-comparison

  //       const { start: otherStart, end: otherEnd } =
  //         getStartAndEndTimes(otherCls);

  //       if (
  //         !otherStart ||
  //         !otherEnd ||
  //         otherStart === "00:00:00" ||
  //         otherEnd === "00:00:00"
  //       ) {
  //         return false; // Skip invalid times
  //       }

  //       const otherStartTime = new Date(`1970-01-01T${otherStart}Z`).getTime();
  //       const otherEndTime = new Date(`1970-01-01T${otherEnd}Z`).getTime();

  //       // Time overlap logic
  //       return (
  //         (clsStartTime < otherEndTime && clsEndTime > otherStartTime) || // Partial overlap
  //         (clsStartTime === otherStartTime && clsEndTime === otherEndTime) // Exact overlap
  //       );
  //     });
  //   };

  //   const filtered = myScheduleFilteredData.filter((cls) => {
  //     if (statuses.includes("P") && !cls.hasOwnProperty("EnrollmentStatus")) {
  //       return true;
  //     }
  //     if (statuses.includes("E") && cls.EnrollmentStatus === "E") {
  //       return true;
  //     }
  //     if (statuses.includes("W") && cls.EnrollmentStatus === "W") {
  //       return true;
  //     }
  //     if (statuses.includes("C")) {
  //       return checkClassConflict(cls, myScheduleFilteredData);
  //     }
  //     return false;
  //   });

  //   console.log(filtered);
  //   setMyScheduleStatusFilteredData(filtered);
  // };

  const handleFilterMySchedule = (statuses) => {

    if (statuses.length === 0) {
      setMyScheduleStatusFilteredData(myScheduleFilteredData);
      return;
    }

    // Helper function to get start and end times for a class
    const getStartAndEndTimes = (data) => {
      if (data?.Meeting_Pattern?.length > 0) {
        const pattern = data.Meeting_Pattern[0];
        return { start: pattern.StartTime, end: pattern.EndTime };
      }
      if (data?.Meeting?.length > 0) {
        const meeting = data.Meeting[0];
        return { start: meeting.MeetingStart, end: meeting.MeetingEnd };
      }
      return { start: null, end: null };
    };

    // Conflict detection logic
    const checkClassConflict = (cls, arr) => {
      const { start: clsStart, end: clsEnd } = getStartAndEndTimes(cls);
      if (
        !clsStart ||
        !clsEnd ||
        clsStart === "00:00:00" ||
        clsEnd === "00:00:00"
      ) {
        return false; // Skip classes with invalid times
      }
      const clsStartTime = new Date(`1970-01-01T${clsStart}Z`).getTime();
      const clsEndTime = new Date(`1970-01-01T${clsEnd}Z`).getTime();
      return arr.some((otherCls) => {
        if (cls === otherCls) return false; // Skip self-comparison
        const { start: otherStart, end: otherEnd } =
          getStartAndEndTimes(otherCls);
        if (
          !otherStart ||
          !otherEnd ||
          otherStart === "00:00:00" ||
          otherEnd === "00:00:00"
        ) {
          return false; // Skip invalid times
        }
        const otherStartTime = new Date(`1970-01-01T${otherStart}Z`).getTime();
        const otherEndTime = new Date(`1970-01-01T${otherEnd}Z`).getTime();
        return (
          (clsStartTime < otherEndTime && clsEndTime > otherStartTime) || // Partial overlap
          (clsStartTime === otherStartTime && clsEndTime === otherEndTime) // Exact overlap
        );
      });
    };

    // Main filtering logic
    const filtered = myScheduleFilteredData.filter((cls) => {
      if (statuses.includes("C")) {
        return true;
      }
      if (statuses.includes("F")) {
        return true;
      }
      if (statuses.includes("P") && !cls.hasOwnProperty("EnrollmentStatus")) {
        return true;
      }
      if (statuses.includes("E") && cls.EnrollmentStatus === "E") {
        return true;
      }
      if (statuses.includes("W") && cls.EnrollmentStatus === "W") {
        return true;
      }
      return false;
    });


    setMyScheduleStatusFilteredData(filtered);
  };
  const handleInstructorData = async (e) => {
    const value = e.target.value;
    setInstructorData(value);
    const termId = selectedFiltersValue ? selectedFiltersValue : globalTermId;
    if (value) {
      await axios
        .get(
          `/navenroll-api/getFacultySearch?searchTerm=${termId}&searchText=${encodeURIComponent(
            value
          )}${paramsValue}`
        )
        .then((response) => {
          setFilteredSuggestions(response.data);
        })
        .catch((err) => {
          // setFilteredSuggestions(class_search_api_data);
          console.log(err);
        });
    } else {
      setFilteredSuggestions([]);
    }
  };
  const handleMonSelect = (e) => {
    if (!mon) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    setMon(!mon);
  };
  const handleTueSelect = (e) => {
    if (!tue) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    setTue(!tue);
  };
  const handleWedSelect = (e) => {
    if (!wed) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }

    setWed(!wed);
  };
  const handleThuSelect = (e) => {
    if (!thur) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    setThur(!thur);
  };
  const handleFriSelect = (e) => {
    if (!fri) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    setFri(!fri);
  };
  const handleSatSelect = (e) => {
    if (!sat) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    setSat(!sat);
  };
  const handleSunSelect = (e) => {
    if (!sun) {
      setSearchAllCount((prevCount) => prevCount + 1);
    } else {
      setSearchAllCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }
    setSun(!sun);
  };
  let selectedDays = [];
  const handleclearDays = () => {
    setMon(false);
    setTue(false);
    setWed(false);
    setThur(false);
    setFri(false);
    setSat(false);
    setSun(false);
    selectedDays = [];
  };
  const handleCount = async () => {
    // if (
    //   !stopQueryParms ||
    //   stopQueryParms ===
    //     "&days=&format=&class_status=&class_level=&curated_class=&general_education=&school_and_department=&startTime=7&endTime=21&startUnits=0&endUnits=18&instructor_name_list=&searchText=&mainSubjectId=&subject_id=" ||
    //   stopQueryParms === ""
    // ) {
    //   // console.log("****inside return", stopQueryParms);
    //   setAllAttCounts();
    //   return;
    // }

    // if (
    //   (!myClassesFilteredData || myClassesFilteredData.length === 0) &&
    //   (!myClassesPlannedData || myClassesPlannedData.length === 0)
    // ) {
    //   console.log("****enter to false place for view  schedluue");
    //   setDisplayCalendar(false);
    // } else {
    //   setDisplayCalendar(true);
    // }

    try {
      const schoolAndDeptEncoded = schoolAndDept
        .map((dept) => encodeURIComponent(dept))
        .join(",");
      const gradingBasisEncoded = gradingBasis
        .map((basis) => encodeURIComponent(basis))
        .join(",");
      const consentConflictEncoded = consentConflictValue
        ?.filter(item => item.value === "NO_CONSENT")
        ?.map(item => encodeURIComponent(item.value));
      const campusLocationPayload = Object.entries(selectedCampus || {}).reduce(
        (acc, [parent, children]) => {
          acc[parent] = children.map(item => item.LOCATION_DESCR);
          return acc;
        },
        {}
      );



      let term_id = seasonsModalValue
        ? seasonsModalValue
        : selectedFiltersValue;
      if (mon) selectedDays.push("Monday");
      if (tue) selectedDays.push("Tuesday");
      if (wed) selectedDays.push("Wednesday");
      if (thur) selectedDays.push("Thursday");
      if (fri) selectedDays.push("Friday");
      if (sat) selectedDays.push("Saturday");
      if (sun) selectedDays.push("Sunday");
      const daysParam = selectedDays.join(",");
      let mainSubject_id = mainSubjectId === undefined ? "" : mainSubjectId;
      let subject_id = subjectId === undefined ? "" : subjectId;
      const response = await axios.get(
        `/navenroll-api/getAggResults?searchTerm=${term_id ? term_id : globalTermId
        }&days=${daysParam}&format=${courseFormat.join(
          ","
        )}&class_status=${classStatus.join(",")}&class_level=${classLevel.join(
          ","
        )}&curated_class=${curated.join(
          ","
        )}&general_education=${education.join(
          ","
        )}&school_and_department=${schoolAndDeptEncoded}&startTime=${time[0]
        }&endTime=${time[1]}&startUnits=${numUnits[0]}&endUnits=${numUnits[1]
        }&instructor_name_list=${selectedItems.join(
          ","
        )}&searchText=${encodeURIComponent(
          searchData
        )}&subjects=${encodeURIComponent(JSON.stringify(selectedOptions ? selectedOptions : ''))}&grading_basis=${gradingBasisEncoded}&consent=${consentConflictEncoded}&conflict=${encodeURIComponent(JSON.stringify(schedulePayload))}&campusLocation=${encodeURIComponent(JSON.stringify(campusLocationPayload ? campusLocationPayload : ''))}`
      );
      if (response) {
        count = response.data.by_term;
        if (searchFetched) {
          setSearchCount(count);
        }
        setAllAttCounts(response.data);
      } else {
      }
    } catch (err) {
      return console.log("Error in getting count api", err);
    }
  };
  useEffect(() => {
    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
    }
    clearTimerRef.current = setTimeout(function () {
      const schoolAndDeptEncoded = schoolAndDept
        .map((dept) => encodeURIComponent(dept))
        .join(",");
      const gradingBasisEncoded = gradingBasis
        .map((basis) => encodeURIComponent(basis))
        .join(",");
      const consentConflictEncoded = consentConflictValue
        ?.filter(item => item.value === "NO_CONSENT")
        ?.map(item => encodeURIComponent(item.value));
      let term_id = seasonsModalValue
        ? seasonsModalValue
        : selectedFiltersValue;
      const campusLocationPayload = Object.entries(selectedCampus || {}).reduce(
        (acc, [parent, children]) => {
          acc[parent] = children.map(item => item.LOCATION_DESCR);
          return acc;
        },
        {}
      );


      const selectedDays = [];
      if (mon) selectedDays.push("Monday");
      if (tue) selectedDays.push("Tuesday");
      if (wed) selectedDays.push("Wednesday");
      if (thur) selectedDays.push("Thursday");
      if (fri) selectedDays.push("Friday");
      if (sat) selectedDays.push("Saturday");
      if (sun) selectedDays.push("Sunday");
      const daysParam = selectedDays.join(",");
      let mainSubject_id = mainSubjectId === undefined ? "" : mainSubjectId;
      let subject_id = subjectId === undefined ? "" : subjectId;
      let queryParam = `&days=${daysParam}&format=${courseFormat.join(
        ","
      )}&class_status=${classStatus.join(",")}&class_level=${classLevel.join(
        ","
      )}&curated_class=${curated.join(",")}&general_education=${education.join(
        ","
      )}&school_and_department=${schoolAndDeptEncoded}&startTime=${time[0]
        }&endTime=${time[1]}&startUnits=${numUnits[0]}&endUnits=${numUnits[1]
        }&instructor_name_list=${selectedItems.join(
          ","
        )}&searchText=${encodeURIComponent(
          searchData
        )}&subjects=${encodeURIComponent(JSON.stringify(selectedOptions ? selectedOptions : ''))}&grading_basis=${gradingBasisEncoded}&consent=${consentConflictEncoded}&conflict=${encodeURIComponent(JSON.stringify(schedulePayload))}&campusLocation=${encodeURIComponent(JSON.stringify(campusLocationPayload ? campusLocationPayload : ''))}`;

      setSelectedFiltersValue(term_id);
      setParamsValue(queryParam);
      if (term_id) {
        getClassSearchDefaultApiData(term_id, queryParam);
        handleCount();
      } else if (globalTermId) {
        getClassSearchDefaultApiData(globalTermId, queryParam);
        handleCount();
      }
    }, 500);
  }, [searchData]);

  useEffect(() => {
    if (clearAllFilters) {
      clearAllFilters = false;
      return;
    }
    setClearPagenumber(0);
    let term_id = seasonsModalValue ? seasonsModalValue : selectedFiltersValue;
    const schoolAndDeptEncoded = schoolAndDept
      .map((dept) => encodeURIComponent(dept))
      .join(",");
    const gradingBasisEncoded = gradingBasis
      .map((basis) => encodeURIComponent(basis))
      .join(",");
    const consentConflictEncoded = consentConflictValue
      ?.filter(item => item.value === "NO_CONSENT")
      ?.map(item => encodeURIComponent(item.value));
    const campusLocationPayload = Object.entries(selectedCampus || {}).reduce(
      (acc, [parent, children]) => {
        acc[parent] = children.map(item => item.LOCATION_DESCR);
        return acc;
      },
      {}
    );


    const selectedDays = [];
    if (mon) selectedDays.push("Monday");
    if (tue) selectedDays.push("Tuesday");
    if (wed) selectedDays.push("Wednesday");
    if (thur) selectedDays.push("Thursday");
    if (fri) selectedDays.push("Friday");
    if (sat) selectedDays.push("Saturday");
    if (sun) selectedDays.push("Sunday");
    const daysParam = selectedDays.join(",");
    let mainSubject_id = mainSubjectId === undefined ? "" : mainSubjectId;
    let subject_id = subjectId === undefined ? "" : subjectId;
    let queryParam = `&days=${daysParam}&format=${courseFormat.join(
      ","
    )}&class_status=${classStatus.join(",")}&class_level=${classLevel.join(
      ","
    )}&curated_class=${curated.join(",")}&general_education=${education.join(
      ","
    )}&school_and_department=${schoolAndDeptEncoded}&startTime=${time[0]
      }&endTime=${time[1]}&startUnits=${numUnits[0]}&endUnits=${numUnits[1]
      }&instructor_name_list=${selectedItems.join(
        ","
      )}&searchText=${encodeURIComponent(
        searchData
      )}&subjects=${encodeURIComponent(JSON.stringify(selectedOptions ? selectedOptions : ''))}&grading_basis=${gradingBasisEncoded}&consent=${consentConflictEncoded}&conflict=${encodeURIComponent(JSON.stringify(schedulePayload))}&campusLocation=${encodeURIComponent(JSON.stringify(campusLocationPayload ? campusLocationPayload : ''))}`;
    setSelectedFiltersValue(term_id);
    setParamsValue(queryParam);
    if (term_id) {
      getClassSearchDefaultApiData(term_id, queryParam);
      handleCount();
    } else if (globalTermId) {
      getClassSearchDefaultApiData(globalTermId, queryParam);
      handleCount();
    }
  }, [
    mon,
    tue,
    wed,
    thur,
    fri,
    sat,
    sun,
    classStatus,
    classLevel,
    courseFormat,
    curated,
    schoolAndDept,
    education,
    handleTimeBtnClick,
    handelUnitsBtnClick,
    selectedItems,
    navBarProxyApiCall,
    subjectsFilter,
    gradingBasis,
    consentConflictValue,
    schedulePayload,
    selectedCampus
  ]);
  const apifilteredData = calssSearchApiData && calssSearchApiData;
  const handleClearAllFilters = (e) => {
    clearAllFilters = true;
    setClassSearchApiData([]);
    setSkipApiCall(true);
    setSelectDay([]);
    setSelectedItems([]);
    setCourseFormat([]);
    setClassStatus([]);
    setClassLevel([]);
    setGrading([]);
    setCurated([]);
    setEducation([]);
    setSchoolAndDept([]);
    setGradingBasis([]);
    setConsentConflictValue([]);
    setSubject("");
    //setTime([7, time[1]]);
    //setTime([time[0], 21]);
    setTime([7, 21]);
    setNumUnits([0, 18]);
    // setNumUnits([0, numUnits[1]]);
    // setNumUnits([numUnits[0], 18]);
    setWinterIsChecked(false);
    setAutumnIsChecked(false);
    setMon(false);
    setTue(false);
    setThur(false);
    setWed(false);
    setFri(false);
    setSat(false);
    setSun(false);
    setClassLevelAtt({});
    setClassStatusAtt({});
    setSchoolAtt({});
    setFormatAtt({});
    setCuratedAtt({});
    setGeneralEducationAtt({});
    setSearchData("");
    setInstructorData("");
    setAllAttCounts();
    setSubjectId("");
    setMainSubjectId("");
    setSearchCount(0);
    setClearPagenumber(0);
    setSelectedCampus({});
    setSelectedOptions({});
    setSelectedSubjects({});
    setSchedulePayload({});
    setSelectedCampus({});
    setGradingBasis([]);
    inputRef.current.focus();
  };
  useEffect(() => {
    if (globalTermId) {
      handleCount();
    }
  }, [globalTermId]);


  const [validInstructorLinks, setValidInstructorLinks] = useState({});

  useEffect(() => {
    let cancelled = false;

    const verifyInstructors = async () => {
      if (cancelled) return;

      const sunetIds = Array.isArray(missingMyClassData)
        ? missingMyClassData.flatMap(item =>
          (item.meetings || []).flatMap(meeting =>
            (meeting.instructors || []).map(instr => instr.sunetId)
          )
        )
        : [];


      if (sunetIds.length === 0) return;
      // if (!instructorCheck) return;

      const joinedIds = sunetIds?.join(",");

      const apiUrl = `/navenroll-api/checkprofile?url=${encodeURIComponent(joinedIds)}`;

      try {
        const response = await axios.get(apiUrl);

        if (response.data) {
          setValidInstructorLinks(response.data);
        }
      } catch (error) {
        console.error("Error checking profiles:", error.message);
      }
    };

    if (missingMyClassData) {
      verifyInstructors();
    }

    return () => {
      cancelled = true;
    };
  }, [missingMyClassData]);

  useEffect(() => {
    let cancelled = false;

    const verifyInstructorsFromClassSearch = async (searchTerm = "") => {

      if (cancelled) return;

      let filteredClasses = calssSearchApiData || [];

      if (searchTerm.trim() !== "") {
        const terms = searchTerm.toLowerCase().split(" ").filter(Boolean);

        filteredClasses = filteredClasses.filter((cls) =>
          terms.every((term) =>
            cls.subject?.toLowerCase().startsWith(term) ||
            cls.catalogNbr?.toLowerCase().startsWith(term) ||
            cls.courseTitle?.toLowerCase().includes(term) ||
            cls.classNbr?.toString().startsWith(term) ||
            cls.meetings?.some((meeting) =>
              meeting.instructors?.some((instr) =>
                instr.displayName?.toLowerCase().includes(term)
              )
            )
          )
        );
      }

      const instructors = filteredClasses
        ?.flatMap((cls) =>
          cls.meetings?.flatMap((meeting) =>
            meeting.instructors?.map((instr) => instr.sunetId)
          )
        )
        ?.filter(Boolean);

      if (!instructors || instructors.length === 0) {
        setValidInstructorLinks({});
        return;
      }

      const joinedIds = instructors.join(",");

      if (!joinedIds) {
        setValidInstructorLinks({});
        return;
      }

      try {
        const response = await axios.get(
          `/navenroll-api/checkprofile?url=${encodeURIComponent(joinedIds)}`
        );
        if (!cancelled) {
          setValidInstructorLinks(response.data || {});
        }
      } catch (error) {
        console.error("Error checking profiles:", error.message);
      }
    };

    if (calssSearchApiData?.length > 0) {
      verifyInstructorsFromClassSearch(searchData || "");
    }

    return () => {
      cancelled = true;
    };
  }, [calssSearchApiData, searchData]);





  const updatedMyScheduleWithConflicts = myScheduleFilteredData?.map((currentClass) => {
    const classMeeting = currentClass.Meeting_Pattern?.[0] || currentClass.Meeting?.[0];
    if (!classMeeting) return { ...currentClass, conflict: false, conflictClasses: undefined };

    const timeToMinutes = (time) => {
      if (!time) return 0;
      const [hours, minutes] = time.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const classStart = timeToMinutes(classMeeting.StartTime || classMeeting.MeetingStart);
    const classEnd = timeToMinutes(classMeeting.EndTime || classMeeting.MeetingEnd);

    // Parse days string if exists
    const classDays = new Set();
    const daysArray = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
    if (classMeeting.Days) {
      classMeeting.Days.split("").forEach((char, index) => {
        if (char === "Y") classDays.add(daysArray[index]);
      });
    } else {
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(day => {
        if (classMeeting[day] === "Y") classDays.add(day.toLowerCase());
      });
    }

    let hasConflict = false;
    let conflictClasses = [];

    myScheduleFilteredData.forEach((otherClass) => {
      if (otherClass === currentClass) return;

      const otherMeeting = otherClass.Meeting_Pattern?.[0] || otherClass.Meeting?.[0];
      if (!otherMeeting) return;

      const otherStart = timeToMinutes(otherMeeting.StartTime || otherMeeting.MeetingStart);
      const otherEnd = timeToMinutes(otherMeeting.EndTime || otherMeeting.MeetingEnd);

      const otherDays = new Set();
      if (otherMeeting.Days) {
        otherMeeting.Days.split("").forEach((char, index) => {
          if (char === "Y") otherDays.add(daysArray[index]);
        });
      } else {
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(day => {
          if (otherMeeting[day] === "Y") otherDays.add(day.toLowerCase());
        });
      }

      const commonDays = [...classDays].filter(day => otherDays.has(day));
      if (commonDays.length > 0 && classStart < otherEnd && otherStart < classEnd) {
        hasConflict = true;

        let classType =
          otherClass.EnrollmentStatus === "E"
            ? "Enrolled"
            : otherClass.EnrollmentStatus === "W"
              ? "Waitlisted"
              : "Planned";

        const conflictInfo = {
          Subject: otherClass.Subject || "Unknown",
          CatalogNbr: otherClass.CatalogNbr || "Unknown",
          Type: classType,
        };

        if (!conflictClasses.some(c => c.Subject === conflictInfo.Subject && c.CatalogNbr === conflictInfo.CatalogNbr)) {
          conflictClasses.push(conflictInfo);
        }
      }
    });

    return {
      ...currentClass,
      conflict: hasConflict,
      conflictClasses: conflictClasses.length > 0 ? conflictClasses : undefined,
    };
  });



  return (
    <UserContext.Provider
      value={{
        dashboardData,
        searchData,
        setSearchData,
        selectedFilters,
        setSelectedFilters,
        instructorData,
        handleInstructorData,
        selectDay,
        setSelectDay,
        courseFormat,
        setCourseFormat,
        handleFormatSelect,
        classStatus,
        setClassStatus,
        handleClassStatus,
        classLevel,
        setClassLevel,
        handleClassLevel,
        grading,
        setGrading,
        curated,
        setCurated,
        handleCurated,
        academicDept,
        setAcademicDept,
        education,
        setEducation,
        handleEducation,
        schoolAndDept,
        setSchoolAndDept,
        handleSchoolAndDept,
        subject,
        setSubject,
        filteredSuggestions,
        handleInstCheckboxChange,
        selectedItems,
        winterIsChecked,
        autumnIsChecked,
        setWinterIsChecked,
        setAutumnIsChecked,
        setSelectedItems,
        mon,
        setMon,
        tue,
        setTue,
        wed,
        setWed,
        thur,
        setThur,
        fri,
        setFri,
        sat,
        setSat,
        sun,
        setSun,
        view,
        setView,
        activeTab,
        setActiveTab,
        time,
        handleTime,
        setTime,
        numUnits,
        setNumUnits,
        handleNumUnits,
        targetTabRef,
        targetListRef,
        adminTabActiveKey,
        setAdminTabActiveKey,
        handleClearAllFilters,
        myClassApiData,
        calssSearchApiData,
        setSelectedMyClassFilters,
        seasonsModalValue,
        setSeasonsModalValue,
        getSelectedCourseData,
        apifilteredData,
        myClassesFilteredData,
        myclassesFilteredDataEnroll,
        catchNoDataError,
        // currentDate,
        // setCurrentDate,
        handleFilterMySchedule,
        handleMonSelect,
        handleTueSelect,
        handleWedSelect,
        handleThuSelect,
        handleFriSelect,
        handleSatSelect,
        handleSunSelect,
        isHandleSug,
        myScheduleFilteredData,
        MyclassApiDataResposneStatus,
        setMyclassApiDataResposneStatus,
        myScheduleStatusFilteredData,
        setClassSearchApiData,
        setMyClassApiData,
        setMyClassesFilteredData,
        setMyclassFilteredDataEnroll,
        allAttCounts,
        setSeasonFilterApplyClick,
        seasonFilterApplyClick,
        handleTimeBtnClick,
        setHandleTimeBtnClick,
        handelUnitsBtnClick,
        setHandleUnitsBtnClick,
        setInstructorData,
        isHamburgerOpen,
        setIsHamburgerOpen,
        updateTabPosition,
        isMobileView,
        tabPosition,
        updateTab_Position,
        isTabView,
        isCalenderModalOpen,
        setIsCalenderModalOpen,
        subjectClick,
        setSubjectClick,
        subjectId,
        setSubjectId,
        mainSubject,
        setMainSubject,
        mainSubjectId,
        setMainSubjectId,
        zeroValue,
        classLevelAtt,
        setClassLevelAtt,
        classStatusAtt,
        setClassStatusAtt,
        schoolAtt,
        setSchoolAtt,
        formatAtt,
        setFormatAtt,
        curatedAtt,
        setCuratedAtt,
        generalEducationAtt,
        setGeneralEducationAtt,
        setClassSearchModalValue,
        paramsValue,
        isSmallScreen,
        handleTabClick,
        myClassesPlannedData,
        daysEventsData,
        setDaysEventsData,
        selected,
        setSelected,
        getMyClassApiDefaultData,
        setNavBarProxyApiCall,
        enrollTab,
        setEnrollTab,
        newDivRef,
        calendarRef,
        viewCalendarMode,
        setviewCalendarMode,
        handleDayEventComponent,
        width576,
        loader,
        season_term_display,
        setSeasonTermDisplay,
        missingMyClassData,
        myClassAppointmentsData,
        setTab,
        tab,
        selectedCheckbox,
        setSelectedCheckbox,
        displayCalendar,
        setDisplayCalendar,
        handleClearAll,
        handleclearDays,
        handleClearEducation,
        proxyApiResponse,
        withoutCourseDetails,
        searchCount,
        setSkipApiCall,
        clearpagenumber,
        setClearPagenumber,
        viewDetailsData,
        setViewDetailsData,
        searchAllCount,
        setSearchAllCount,
        setViewDetailsBoolean,
        viewDetailsBoolean,
        currentPage,
        setCurrentPage,
        graduateOrUnderGrList,
        hamburgerButtonRef,
        closeButtonRef,
        skipRef,
        popoverBlur,
        setPopoverBlur,
        selectedEventId,
        setSelectedEventId,
        isOpenForUseEffect,
        setIsOpenForUseEffect,
        globalModalOpen,
        setGlobalModalOpen,
        dayCalendarDetails,
        shouldRefocusNext,
        shouldRefocusPrev,
        nextButtonRef,
        prevButtonRef,
        setDatesDirection,
        datesDirection,
        calendarImgRef,
        setPopUp,
        popup,
        hasInteracted,
        setHasInteracted,
        monthRef,
        weekRef,
        dayRef,
        fullCalendarRef,
        currentEventDate,
        setCurrentEventDate,
        showPopover,
        setShowPopover,
        triggerRef,
        holidayCalendarData,
        getHolidayCalendarData,
        validInstructorLinks,
        sessionTimeOut,
        updatedMyScheduleWithConflicts,
        inputRef,
        eventRef,
        gradingBasis,
        selectedOptions,
        setSelectedOptions,
        selectedSubjects,
        setSelectedSubjects,
        subjectsFilter,
        setSubjectsFilter,
        setGradingBasis,
        handleGradingBasis,
        setConsentConflictValue,
        consentConflictValue,
        handleConsentConflcit,
        setSelectedCampus,
        selectedCampus,
        areAllChildrenChecked,
        isApplyClicked,
        setIsApplyClicked,
        schedulePayload,
        setSchedulePayload,
        focusedEventIdRef,
        campusFilter,
        gradingBasisFilter,
        getLocationCount,
        isChildChecked
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const UserAuth = () => {
  return useContext(UserContext);
};
