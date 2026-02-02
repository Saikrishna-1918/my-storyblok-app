import { Popover, Row } from "antd";
import React, {useEffect, useState} from "react";
import "./AllclassesList.css";
// import NotePad_Icon from "../../../../../assets/new-planned-icon.png";
// import EnrollStatusIcon from "../../../../../assets/new-enrolled-icon.png";
// import EnrollStatusIcon from "../../../../../assets/enroll-status-icon.png";
// import WaitlistedIcon from "../../../../../assets/new-waitlisted-icon.png";
// import WaitlistedIcon from "../../../../../assets/waitlisted-icon.png";
// import ConflictCalendar from "../../../../../assets/new-conflict-icon.png";

const CalendarEventWrapper = ({ event }) => {
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
    // setPopoverBlur(newVisible);
  };
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      setTooltipVisible((prev) => !prev);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    const popovers = document.querySelectorAll(".ant-popover-inner");
    popovers.forEach((el) => {
      el.setAttribute("role", "status"); // or "dialog"
    });
  }, [tooltipVisible]);
  const popoverContent = (
    <div
      style={{ position: "relative", display: "inline-block" }}
    // tabIndex={0}
    >

      {tooltipVisible && (
        <div
          id="event-data"
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
            marginBottom: "8px",
            width: "250px",
            zIndex: 100,
            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ul style={{ paddingLeft: "0rem", margin: 0 }}>
            <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontSize: "16px", fontWeight: "400", color: "#272E5C" }}>
                {formatTime(event.start)} - {formatTime(event.end)}
              </span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontSize: "16px", fontWeight: "400", color: "#272E5C" }}>
                {event.title}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );


  return (
    <span 
    // onKeyDown={handleKeyDown} 
    onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      onFocus={() => setTooltipVisible(true)}
      onBlur={() => setTooltipVisible(false)}
    // aria-describedby="event-data"
    // role="button"
    >
      <Popover
        content={popoverContent}
        title=""
        overlayClassName="custom-popover"
          // trigger={"hover"}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        arrow={false}
      >
        {event?.type === "E" ? (
          <Row
            className="eventSection"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1vh",
              backgroundColor: "#C5FBD4",
              width: event?.has_conflict === true ? "50%" : "100%",
              height: "100%",
              padding: "10px 0 20px 0",
            }}
          // tabIndex="0"
          >
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {event?.has_conflict === true ? (
                <>
                  <img
                    alt="Conflict class"
                    // src={ConflictCalendar}
                    style={{ height: "20px" }}
                  />
                  <img
                    alt="Enrolled class"
                    // src={EnrollStatusIcon}
                    style={{ height: "20px" }}
                  />
                </>
              ) : (
                <img
                  alt="Enrolled class"
                //   src={EnrollStatusIcon}
                  style={{ height: "23px" }}
                />
              )}
            </Row>
          </Row>
        ) : (
          ""
        )}

        {event?.type === "W" ? (
          <Row
            className="eventSection"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1vh",
              backgroundColor:
                event?.has_conflict === true ? "#F8B5B5" : "#FDDBB7",
              border: "1px solid #FDDBB7",
              width: event?.has_conflict === true ? "50%" : "100%",
              height: "100%",
              padding: "10px 0 20px 0",
            }}
          // tabIndex="0"
          >
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {event?.has_conflict === true ? (
                <>
                  <img
                    alt="Conflict class"
                    // src={ConflictCalendar}
                    style={{ height: "20px" }}
                  />
                  <img
                    alt="Waitlisted class"
                    // src={WaitlistedIcon}
                    style={{ height: "20px" }}
                  />
                </>
              ) : (
                <img
                  alt="Waitlisted class"
                //   src={WaitlistedIcon}
                  style={{ height: "23px" }}
                />
              )}
            </Row>
          </Row>
        ) : (
          ""
        )}

        {event?.type === "P" ? (
          <Row
            className="eventSection"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1vh",
              backgroundColor:
                event?.has_conflict === true ? "#F8B5B5" : "#EAEAEA",
              border: "1px solid #EAEAEA",
              width: event?.has_conflict === true ? "50%" : "100%",
              height: "100%",
              padding: "10px 0 20px 0",
            }}
          // tabIndex="0"
          >
            <Row
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {event?.has_conflict ? (
                <>
                  <img
                    alt="Conflict class"
                    // src={ConflictCalendar}
                    style={{ height: "20px" }}
                  />
                  <img
                    alt="Planned class"
                    // src={NotePad_Icon}
                    style={{ height: "20px" }}
                  />
                </>
              ) : (
                <img
                  alt="Planned class"
                //   src={NotePad_Icon}
                  style={{ height: "23px" }}
                />
              )}
            </Row>
          </Row>
        ) : (
          ""
        )}
      </Popover>
    </span>
  );
};

export default CalendarEventWrapper;