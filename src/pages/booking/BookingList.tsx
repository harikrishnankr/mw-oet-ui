import { message, Table } from "antd";
import { RangePickerProps } from "antd/lib/date-picker";
import confirm from "antd/lib/modal/confirm";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getRequest, postRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { formatDate } from "../../core/utils";
import { BookingDetails } from "./BookingDetails";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

export function BookingList() {const [isModalOpen, toggleModal] = useState<boolean>(false);
    const [bookings, setBookings] = useState<DataType[]>([]);
    const [courses, setCourses] = useState([]);
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1,
        course: '',
        startDate: null,
        endDate: null
    });
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [courseOptions, setCourseOptions] = useState<{label: string; value: string;}[]>([]);
    const disabledDate: RangePickerProps['disabledDate'] = current => {
        // Can not select days before today and today
        return current && current > moment().endOf('day');
    };

    const onApprove = (record: any, e: SyntheticEvent) => {
        e.preventDefault();
        confirm({
            title: 'Warning!',
            content: 'Are you sure you want to approve this Student',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                postRequest({ url: `/student/approve/${record.id}`, payload: {} })
                    .then(() => {
                        getBookingList();
                        message.success(record.name + " Approved successfully!");
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
    };

    const viewDetails = (record: any, e: SyntheticEvent) => {
        e.preventDefault();
        setSelectedRecord(record);
        toggleModal(true);
    };

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Name', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Created On', dataIndex: 'createdDate', key: 'createdDate' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 200,
            render: (text, record) => {
                return (
                    <div className="d-flex">
                        <a href="#" onClick={(e) => viewDetails(record, e)}>View Details</a>
                        <a href="#" onClick={(e) => onApprove(record, e)} className="ml-3">Approve</a>
                    </div>
                )
            },
        }
    ], []);

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

    const getBookingList = () => {
        if ((filter.startDate || filter.endDate) && (!filter.startDate || !filter.endDate)) {
            return;
        }
        toggleSpinner(true);
        postRequest({
            url: "/student/booking-list",
            payload: {
                ...filter,
                startDate: filter.startDate ? moment(filter.startDate).format("YYYY-MM-DDT00:00:00.000Z") : null,
                endDate: filter.endDate ? moment(filter.endDate).format("YYYY-MM-DDT23:59:59.000Z") : null
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setSelectedRecord(null);
            setBookings(res.data.docs.map((d: any) => ({ ...d, key: d._id, createdDate: formatDate(d.createdDate) })));
            setPaginationConfig((c: any) => ({
                current: filter.page,
                pageSize: 10,
                total: res.data.totalDocs
            }));
        })
        .catch((err) => {
            toggleSpinner(false);
            console.log(err);
        });
    };

    const getAllCourses = () => {
        getRequest({ url: "/course/getAll", skipAuth: true })
        .then((res: any) => {
            setCourses(res.data);
            const options  = [{ label: 'All', value: '' }];
            res.data.forEach((course: any) => options.push({ label: course.name, value: course.id }));
            setCourseOptions(options);
        })
        .catch(() => {
            message.error("Couldn't fetch course list. Please try reloading the page!")
        });
    };

    useEffect(() => {
        getAllCourses();
    }, []);

    useEffect(() => {
        getBookingList();
    }, [filter]);

    return (
        <>
            <PageWrapper title="Bookings" subTitle="View and Approve Bookings">
                <FilterWrapper>
                    <Filter name="course" type={FilterType.RadioGroup} radioOptions={courseOptions}
                        value={filter.course} onChange={handleInputChange} label="Course Type"/>
                    <Filter name="startDate" type={FilterType.DatePicker} value={filter.startDate} label="Start Date"
                        onChange={handleInputChange} placeholder="Start Date" format={DATE_FORMAT} disabledDate={disabledDate} />
                    <Filter name="endDate" type={FilterType.DatePicker} value={filter.endDate} label="End Date"
                        onChange={handleInputChange} placeholder="End Date" format={DATE_FORMAT} disabledDate={disabledDate} />
                </FilterWrapper>
                <Table
                    columns={columns}
                    dataSource={bookings}
                    pagination={paginationConfig}
                    onChange={onPageChange}
                    scroll={{
                        x: true
                    }}
                />
            </PageWrapper>
            <BookingDetails isOpen={isModalOpen} details={selectedRecord} courses={courses} handleCancel={() => toggleModal(false)} />
        </>
    );   
}
