import { Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import { PageWrapper } from "../../core/PageWrapper";
import { isMobileDevice } from "../../core/utils";
import { ApplyLeave } from "./ApplyLeave";
import { LeaveHistory } from "./LeaveHistory";
import "./LeaveRequests.scss";

enum LeaveRequestTab {
    Apply = 1,
    History
}

export function LeaveRequests() {
    const [tab, setTab] = useState(LeaveRequestTab.Apply);
    const isMobile = isMobileDevice();

    const handleTabChange = (e: RadioChangeEvent) => {
        setTab(e.target.value);
    };

    return (
        <PageWrapper title="Leave Requests" subTitle={!isMobile ? "View and Add Leave requests" : ""}>
            <div className="d-flex justify-content-center">
                <Radio.Group onChange={handleTabChange} value={tab} style={{ marginBottom: 8 }} size="middle" className="equal-width">
                    <Radio.Button value={LeaveRequestTab.Apply}>Apply</Radio.Button>
                    <Radio.Button value={LeaveRequestTab.History}>Leave History</Radio.Button>
                </Radio.Group>
            </div>
            { tab === LeaveRequestTab.Apply && <ApplyLeave /> }
            { tab === LeaveRequestTab.History && <LeaveHistory /> }
        </PageWrapper>
    )
}
