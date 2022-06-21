import { Button, Popover, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { postRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { toggleSpinner } from "../../core/PageWrapper";
import { formatDate } from "../../core/utils";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

const STATUS_OPTIONS = [{
    label: "All",
    value: ""
},{
    label: "Pending",
    value: "PENDING"
}, {
    label: "Approved",
    value: "APPROVED"
}, {
    label: "Rejected",
    value: "REJECTED"
}];

export function LeaveHistory() {
    const [leaves, setLeaves] = useState([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1,
        status: "",
        startDate: null,
        endDate: null
    });

    const handleVisibleChange = (record: any, newVisible: boolean) => {
        setLeaves((history) => {
            return history.map((l: any) => {
                if (l.id === record.id) {
                    return {
                        ...l,
                        reasonVisible: newVisible
                    };
                } else {
                    return l;
                }
            }) as never[];
        });
    };

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Leave Date', dataIndex: 'leaveDate', key: 'leaveDate' },
        { title: 'Applied On', dataIndex: 'appliedOn', key: 'appliedOn' },
        {
            title: 'Reason',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 200,
            render: (text, record: any) => {
                return (
                    <Popover
                        content={
                            <p>{record.reason}</p>
                        }
                        title="Reason"
                        trigger="click"
                        visible={record.reasonVisible}
                        onVisibleChange={(visible) => handleVisibleChange(record, visible)}
                    >
                        <Button type="primary">Reason</Button>
                    </Popover>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: '',
            key: 'status',
            fixed: 'right',
            render: (text, record: any) => {
                return (
                    <>{record.status}</>
                )
            }
        }
    ], []);

    const getLeaveHistory = () => {
        toggleSpinner(true);
        postRequest({
            url: "/leave/staff/list",
            payload: {
                ...filter,
                startDate: filter.startDate ? moment(filter.startDate).format("YYYY-MM-DDT00:00:00.000Z") : null,
                endDate: filter.endDate ? moment(filter.endDate).format("YYYY-MM-DDT23:59:59.000Z") : null
            }
        })
        .then((res) => {
            toggleSpinner(false);
            const history = res.data.docs.map((d: any) => ({ ...d, key: d._id, appliedOn: formatDate(d.createAt) }))
            setLeaves([...history] as never[]);
            setPaginationConfig((c: any) => ({
                current: filter.page,
                pageSize: 10,
                total: res.data.totalDocs
            }));
        })
        .catch(() => {
            toggleSpinner(false);
        });
    };

    const onPageChange = (pagination: any) => {
        setFilter((f) => ({
            ...f,
            page: pagination.current
        }));
    };

    const handleInputChange = useCallback((e: any) => {
        const { target } = e;
        if (target) {
            setFilter((f) => ({
                ...f,
                page: 1,
                [target.name]: target.value
            }));
            setPaginationConfig((c: any) => ({
                ...c,
                current: 1
            }));
        }
    }, []);

    useEffect(() => {
        getLeaveHistory();
    }, [filter]);

    return (
        <> 
            <FilterWrapper>
                <Filter name="status" type={FilterType.Select} value={filter.status} options={STATUS_OPTIONS}
                    onChange={handleInputChange} placeholder="Status" label="Status"/>
                <Filter name="startDate" type={FilterType.DatePicker} value={filter.startDate} label="Start Date"
                    onChange={handleInputChange} placeholder="Start Date" format={DATE_FORMAT} />
                <Filter name="endDate" type={FilterType.DatePicker} value={filter.endDate} label="End Date"
                    onChange={handleInputChange} placeholder="End Date" format={DATE_FORMAT} />
            </FilterWrapper>
            <Table
                    columns={columns}
                    dataSource={leaves}
                    pagination={paginationConfig}
                    onChange={onPageChange}
                    scroll={{
                        x: true
                    }}
                />
        </>
    )
}
