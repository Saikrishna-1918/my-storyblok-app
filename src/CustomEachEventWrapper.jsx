import React, { useEffect, useRef } from "react";
import { Popover } from "antd";
import { UserAuth } from "./ContextApi/ContextApi";

const CustomEachEventWrapper = ({ children, event }) => {
    const { setShowPopover, showPopover } = UserAuth();
    const triggerRef = useRef(null);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const popoverContent = (
        <div style={{ position: "relative", display: "inline-block" }}>
            {showPopover === event.id && (
                <div
                    id={`popover-${event.id}`}
                    role="status"
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
                    <ul style={{ paddingLeft: 0, margin: 0 }}>
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


    useEffect(() => {
        if (showPopover === event.id) {
            triggerRef.current.focus();
        }
    }, [])


    const childWithHandlers = React.cloneElement(children, {
        tabIndex: 0,
        ref: triggerRef,
        title: undefined,
        'aria-describedby': `popover-${event.id}`,
        onKeyDown: (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                setShowPopover(event.id);
            }
        },
        onBlur: (e) => {
            e.preventDefault();
            // setShowPopover(null);
        },
    });

    return (
        <Popover
            content={popoverContent}
            open={showPopover === event.id}
            onOpenChange={(visible, e) => {
                setShowPopover(event.id);
            }}
            placement="top"
            trigger="click"
        >
            {childWithHandlers}
        </Popover>
    );
};

export default CustomEachEventWrapper;
