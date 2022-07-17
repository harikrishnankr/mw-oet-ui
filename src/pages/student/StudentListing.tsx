import { message, Table } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import confirm from "antd/lib/modal/confirm";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react"
import { postRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { formatDate } from "../../core/utils";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}
const STATUS_OPTIONS = [
    { label: 'All', value: '' },
    { label: 'Approved', value: 'APPROVED'},
    { label: 'Suspended', value: 'SUSPENDED'}
];

export function StudentListing() {
    const [students, setStudents] = useState([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1,
        studentName: '',
        startDate: null,
        endDate: null,
        status: ''
    });
    const disabledDate: RangePickerProps['disabledDate'] = current => current && current > moment().endOf('day');

    const giveAccessToMaterials = useCallback((record: any, access: boolean) => (e: SyntheticEvent) => {
        e.preventDefault();
        confirm({
            title: 'Warning!',
            content: `Are you sure you want to ${access ? 'Approve' : 'Revoke'} study materials this Student`,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                postRequest({ url: `/student/approve-materials/${record.id}`, payload: { approve: access } })
                    .then(() => {
                        getStudentListing(filter);
                        message.success(` ${access ? 'Approved' : 'Revoke'} study materials successfully!`);
                        toggleSpinner(false);
                    })
                    .catch((err) => {
                        message.success(err.message);
                        toggleSpinner(false);
                    });
            },
            onCancel() {
              console.log('Cancel');
            }
        });
    }, [filter]);

    const updateStudentStatus = useCallback((record: any, suspend: boolean) => {
        const currentFilter = filter;
        return (e: SyntheticEvent) => {
            e.preventDefault();
            confirm({
                title: 'Warning!',
                content: `Are you sure you want to ${suspend ? 'Suspend' : 'Reinstate'} this Student`,
                okText: 'Yes',
                okType: 'primary',
                cancelText: 'No',
                onOk() {
                    toggleSpinner(true);
                    e.preventDefault();
                    postRequest({ url: `/student/update-status/${record.id}`, payload: { suspend } })
                        .then(() => {
                            getStudentListing(currentFilter);
                            message.success(`${suspend ? 'Suspend' : 'Reinstate'} student successfully!`);
                            toggleSpinner(false);
                        })
                        .catch((err) => {
                            message.success(err.message);
                            toggleSpinner(false);
                        });
                },
                onCancel() {
                console.log('Cancel');
                }
            });
        }
    }, [filter]);

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Created On', dataIndex: 'createdDate', key: 'createdDate' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Study Material Access',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 200,
            render: (text, record: any) => {
                return (
                    <div className="d-flex">
                        { !record.hasAccessToStudyMaterials && 
                            <a href="#" onClick={giveAccessToMaterials(record, true)}>Approve</a>
                        }
                        { record.hasAccessToStudyMaterials &&
                            <a href="#" onClick={giveAccessToMaterials(record, false)}>Revoke</a>
                        }
                    </div>
                )
            },
        },
        {
            title: '',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 200,
            render: (text: any, record: any) => {
                return (
                    <div className="d-flex">
                        { record.status === "SUSPENDED" && 
                            <a href="#" onClick={updateStudentStatus(record, false)}>Reinstate</a>
                        }
                        { record.status === "APPROVED" && 
                            <a href="#" onClick={updateStudentStatus(record, true)}>Suspend</a>
                        }
                    </div>
                )
            }
        }
    ], [filter]);

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

    const getStudentListing = (currentFilter: any) => {
        if ((currentFilter.startDate || currentFilter.endDate) && (!currentFilter.startDate || !currentFilter.endDate)) {
            return;
        }
        toggleSpinner(true);
        postRequest({
            url: "/student/approved-list",
            payload: {
                ...currentFilter,
                startDate: currentFilter.startDate ? moment(currentFilter.startDate).format("YYYY-MM-DDT00:00:00.000Z") : null,
                endDate: currentFilter.endDate ? moment(currentFilter.endDate).format("YYYY-MM-DDT23:59:59.000Z") : null
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setStudents(res.data.docs.map((d: any) => ({ ...d, key: d._id, createdDate: formatDate(d.createdDate) })));
            setPaginationConfig((c: any) => ({
                current: currentFilter.page,
                pageSize: 10,
                total: res.data.totalDocs
            }));
        })
        .catch((err) => {
            toggleSpinner(false);
            console.log(err);
        });
    };

    useEffect(() => {
        getStudentListing(filter);
    }, [filter]);

    return (
        <PageWrapper title="Students" subTitle="View and Approve Students">
            <FilterWrapper>
                <Filter name="status" type={FilterType.RadioGroup} radioOptions={STATUS_OPTIONS}
                    value={filter.status} onChange={handleInputChange} label="Status"/>
                <Filter name="studentName" type={FilterType.Input} value={filter.studentName}
                    onChange={handleInputChange} placeholder="Student Name" label="Student Name"/>
                <Filter name="startDate" type={FilterType.DatePicker} value={filter.startDate} label="Start Date"
                    onChange={handleInputChange} placeholder="Start Date" format={DATE_FORMAT} disabledDate={disabledDate} />
                <Filter name="endDate" type={FilterType.DatePicker} value={filter.endDate} label="End Date"
                    onChange={handleInputChange} placeholder="End Date" format={DATE_FORMAT} disabledDate={disabledDate} />
            </FilterWrapper>
            <Table
                columns={columns}
                dataSource={students}
                pagination={paginationConfig}
                onChange={onPageChange}
                scroll={{
                    x: true
                }}
            />
        </PageWrapper>
    )
}
