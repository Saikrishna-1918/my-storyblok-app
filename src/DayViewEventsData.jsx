import React from "react";
// import EnrolledCalendar from "../../../../../../assets/new-enrolled-icon.png";
// import WaitlistedCalendar from "../../../../../../assets/new-waitlisted-icon.png";
// import locationIcon from "../../../../../../assets/day-view-loc-icon.png";
// import ClockIcon from "../../../../../../assets/day-view-clock-icon.png";
// import CalendarIcon from "../../../../../../assets/day-view-calendar-icon.png";
// import ConflictCalendar from "../../../../../../assets/new-conflict-icon.png";
// import PlannedCalendar from "../../../../../../assets/new-planned-icon.png";
import './Enrolled.css';
// import { event } from "jquery";

// import ConflictCalendar from ''

export const DayViewEventsData = () => {

    const formatTime = (time) => {
        if (!time) return "";
        const [hour, minute] = time.split(":").map(Number);
        const period = hour >= 12 ? "PM" : "AM";
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    // 🔥 HARD-CODED values directly
    const meeting_start_time = "9:00 AM";
    const meeting_end_time = "10:30 AM";


    // Parse the date string into a Date object
    // const date = new Date(daysEventsData?.start);

    // Format the date into the desired format
    // const formattedDate = new Intl.DateTimeFormat("en-US", {
    //     weekday: "long", // e.g., Monday
    //     month: "long", // e.g., December
    //     day: "numeric", // e.g., 23
    // })?.format(date);

    return (
        <>
            <div className="dayViewPopUp" style={{ display: window.innerWidth >= 450 && 'flex', flexDirection: window.innerWidth >= 450 && 'row-reverse', position: window.innerWidth >= 450 && 'absolute' }}>
                {window.innerWidth <= 435 && (
                    <>
                        <div
                            style={{
                                height: "100%",
                                textAlign: "center",
                                width: "70px",
                                position: "absolute",
                                left: -7,
                            }}
                        >
                            <>
                                <div style={{ paddingTop: "7px", color: "#272e5c" }}>
                                    {meeting_start_time}
                                </div>
                                <br />
                                <span style={{ color: "grey" }}>{meeting_end_time}</span>
                            </>
                            <div
                                style={{
                                    width: "1%",
                                    height: "100%",
                                    backgroundColor: "rgb(237, 231, 231)",
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    marginLeft: "9px",
                                }}
                            >
                                {" "}
                            </div>
                        </div>
                    </>
                )}

                <div
                    style={{
                        padding:
                            window.innerWidth <= 435
                                ? "0 0px 0 80px"
                                : window.innerWidth < 1100
                                    ? "0 0px 0 30px"
                                    : window.innerWidth < 1300
                                        ? "0 0 0 30px"
                                        : window.innerWidth < 1550
                                            ? "0 0 0 30px"
                                            : window.innerWidth < 1750
                                                ? "0 0 0 30px"
                                                : "0 0px 0 30px",
                        height: "100%",
                        width:
                            window.innerWidth <= 350
                                ? "270px"
                                : window.innerWidth <= 400
                                    ? "300px"
                                    : window.innerWidth <= 435
                                        ? "350px"
                                        : window.innerWidth < 1110
                                            ? "280px"
                                            : window.innerWidth < 1300
                                                ? "265px"
                                                : window.innerWidth < 1550
                                                    ? "280px"
                                                    : window.innerWidth < 1750
                                                        ? "310px"
                                                        : "350px",
                    }}
                >
                    <div
                        className="dayViewWidth"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "3px",
                            backgroundColor: "#F2FAFB",
                            padding: "48px 30px 20px 30px",
                            height: "100%",
                            // width: "100%",
                            borderRadius: "6px",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            {/* {daysEventsData?.type === "E" ? (
                <img src={EnrolledCalendar} alt="" style={{ height: "20px" }} />
              ) : (
                ""
              )}
              {daysEventsData?.type === "W" ? (
                <img
                  src={WaitlistedCalendar}
                  alt=""
                  style={{ height: "20px" }}
                />
              ) : (
                ""
              )}
              {daysEventsData?.type === "P" ? (
                <img src={PlannedCalendar} alt="" style={{ height: "20px" }} />
              ) : (
                ""
              )} */}

                            <h2
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "700",
                                    color: "#272E5C",
                                    margin: "0",
                                }}
                            >
                                {daysEventsData?.type === 'H' ? daysEventsData?.description : daysEventsData?.title}
                            </h2>
                        </div>
                        <h3
                            style={{ fontSize: "18px", fontWeight: "700", color: "#016895" }}
                        >
                            {daysEventsData?.ClassDescr}
                        </h3>
                        <div className="eventType" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            {daysEventsData?.type === "E" ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        backgroundColor: "#C5FBD4",
                                        width: "fit-content",
                                        padding: "0 10px",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <img
                                        alt=""
                                        // src={EnrolledCalendar}
                                        style={{ height: "14px" }}
                                    />

                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            color: "#272E5C",
                                        }}
                                    >
                                        {daysEventsData.EnrollStatusDescr}
                                    </span>
                                    {/* <span
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#272E5C",
                }}
              >
                Enrolled
              </span> */}
                                </div>
                            ) : (
                                ""
                            )}
                            {daysEventsData.type === "E" &&
                                daysEventsData?.has_conflict === true ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        backgroundColor: "#F8B5B5",
                                        padding: "0 10px",
                                        // height: "100%",
                                        width: "fit-content",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <img
                                        alt=""
                                        // src={ConflictCalendar}
                                        style={{ height: "14px" }}
                                    />
                                    <span>Conflict</span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="eventType" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            {daysEventsData?.type === "W" ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        backgroundColor: "#FDDBB7",
                                        width: "fit-content",
                                        padding: "0 10px",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <img
                                        alt=""
                                        // src={WaitlistedCalendar}
                                        style={{ height: "14px" }}
                                    />

                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            color: "#272E5C",
                                        }}
                                    >
                                        {daysEventsData.EnrollStatusDescr}
                                    </span>
                                    {/* <span
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  color: "#272E5C",
                }}
              >
                Waitlisted
              </span> */}
                                </div>
                            ) : (
                                ""
                            )}
                            {daysEventsData.type === "W" &&
                                daysEventsData?.has_conflict === true ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        backgroundColor: "#F8B5B5",
                                        padding: "0 10px",
                                        // height: "100%",
                                        width: "fit-content",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <img
                                        alt=""
                                        // src={ConflictCalendar}
                                        style={{ height: "14px" }}
                                    />
                                    <span>Conflict</span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="eventType" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                            {daysEventsData.type === "P" ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        backgroundColor: "#EAEAEA",
                                        padding: "0 10px",
                                        width: "fit-content",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <img
                                        alt=""
                                        // src={PlannedCalendar}
                                        style={{ height: "18px" }}
                                    />
                                    <span>Planned</span>
                                </div>
                            ) : (
                                ""
                            )}

                            {daysEventsData.type === "P" &&
                                daysEventsData?.has_conflict === true ? (
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                        backgroundColor: "#F8B5B5",
                                        padding: "0 10px",
                                        // height: "100%",
                                        width: "fit-content",
                                        borderRadius: "6px",
                                    }}
                                >
                                    <img
                                        alt=""
                                        // src={ConflictCalendar}
                                        style={{ height: "14px" }}
                                    />
                                    <span>Conflict</span>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <ul
                            style={{
                                listStyleType: "none",
                                padding: "0",
                                margin: "0",
                                // display: "flex",
                                // flexDirection: "column",
                                // gap: "5px",
                            }}
                        >
                            {/* {formattedDate && (
                                <li
                                    style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                >
                                    <img alt="date" src={CalendarIcon} style={{ height: "16px" }} />
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            color: "#272E5C",
                                        }}
                                    >
                                        {formattedDate}
                                    </span>
                                </li>
                            )} */}
                            {meeting_start_time && meeting_end_time && (
                                <li
                                    style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                >
                                    <img alt="time"
                                        //    src={ClockIcon} 
                                        style={{ height: "16px" }} />
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "400",
                                            color: "#272E5C",
                                        }}
                                    >
                                        {meeting_start_time + " - " + meeting_end_time}
                                    </span>
                                </li>
                            )}
                            {/* {daysEventsData?.location && ( */}
                            <li style={{ display: "flex", alignItems: "center", 
                                // gap: daysEventsData?.facilityMapId ? "1px" : "5px"
                             }}
                                >
                                <img alt="location"
                                    //  src={locationIcon} 
                                    style={{ height: "16px" }} />
                                {
                                    // daysEventsData?.facilityMapId ? (
                                    //     <a className="locationCss"
                                    //         href={`https://campus-map.stanford.edu/?id=${daysEventsData?.facilityMapId}`}
                                    //         // style={{ textDecoration: 'none' }}
                                    //         target="_blank"
                                    //         onClick={(e) => {
                                    //             window.open(`https://campus-map.stanford.edu/?id=${daysEventsData?.facilityMapId}`, '_blank');
                                    //             e.stopPropagation();
                                    //         }}
                                    //     >
                                    //         {daysEventsData?.location
                                    //             ? daysEventsData?.location
                                    //             : "Not specified"}
                                    //     </a>
                                    // ) : (
                                    //     <span
                                    //         style={{
                                    //             fontSize: "16px",
                                    //             fontWeight: "400",
                                    //             color: "#272E5C",
                                    //         }}
                                    //     >
                                    //         {daysEventsData?.location
                                    //             ? daysEventsData?.location
                                    //             : "Not specified"}
                                    //         {/* {event.location || "Not specified"} */}
                                    //     </span>
                                    // )
                                }
                            </li>
                            {/* )} */}
                            <li style={{ listStyle: "none" }}>
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#016895",
                                    }}
                                >
                                    {/* {daysEventsData?.instructor && "Instructor: "} */}
                                </span>
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#272E5C",
                                    }}
                                >
                                    {daysEventsData?.instructor}
                                </span>
                            </li>
                        </ul>
                        {/* <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <span
            style={{ fontSize: "18px", fontWeight: "700", color: "#272E5C" }}
          >
            {daysEventsData?.courseDescr && "Course Description"}
          </span>
          <span
            style={{ fontSize: "16px", fontWeight: "400", color: "#272E5C" }}
          >
            {daysEventsData?.courseDescr}
          </span>
        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};
export default DayViewEventsData;