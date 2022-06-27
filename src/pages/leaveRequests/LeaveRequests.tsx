import { message, Radio, RadioChangeEvent } from "antd";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../core/apiService";
import { UserType } from "../../core/constants/common";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { getUserType } from "../../core/services";
import { isMobileDevice } from "../../core/utils";
import { ApplyLeave } from "./ApplyLeave";
import { LeaveHistory } from "./LeaveHistory";
import "./LeaveRequests.scss";

enum LeaveRequestTab {
    Apply = 1,
    History
}

interface IStaff {
    id: string;
    name: string;
}

export function LeaveRequests() {
    const currentUserRole = getUserType();
    const [tab, setTab] = useState(currentUserRole === UserType.Staff ? LeaveRequestTab.Apply : LeaveRequestTab.History);
    const isMobile = isMobileDevice();
    const [allStaff, setStaffs] = useState<{ label: string; value: string; }[]>([]);

    const handleTabChange = (e: RadioChangeEvent) => {
        setTab(e.target.value);
    };

    const fetchStaffs = () => {
        if (getUserType() === UserType.Admin) {
            toggleSpinner(true);
            getRequest({ url: "/staff/get-all" })
            .then((res: { data: IStaff[] }) => {
                toggleSpinner(false);
                setStaffs([...res.data].map((staff: IStaff) => ({label: staff.name, value: staff.id})));
            })
            .catch((err: any) => {
                toggleSpinner(false);
                message.error(err?.message || "Couldn't fetch staff list");
            });
        }
    };

    useEffect(() => {
        fetchStaffs();
    }, []);

    return (
        <PageWrapper title={ currentUserRole === UserType.Staff ? "Leave Requests" : "Leaves"} subTitle={!isMobile ? "View and Add Leave requests" : ""}>
            <div className="d-flex justify-content-center">
                <Radio.Group onChange={handleTabChange} value={tab} style={{ marginBottom: 8 }} size="middle" className="equal-width">
                    { currentUserRole === UserType.Staff && <Radio.Button value={LeaveRequestTab.Apply}>Apply</Radio.Button> }
                    <Radio.Button value={LeaveRequestTab.History}>Leave History</Radio.Button>
                    { currentUserRole === UserType.Admin && <Radio.Button value={LeaveRequestTab.Apply}>Apply</Radio.Button> }
                </Radio.Group>
            </div>
            { tab === LeaveRequestTab.Apply && <ApplyLeave staffList={allStaff} /> }
            { tab === LeaveRequestTab.History && <LeaveHistory staffList={allStaff} /> }
        </PageWrapper>
    )
}
