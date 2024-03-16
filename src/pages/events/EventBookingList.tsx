import { Button, Descriptions, Drawer, Space, Table, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import confirm from "antd/lib/modal/confirm";
import { toggleSpinner } from "../../core/PageWrapper";
import { deleteRequest, postRequest } from "../../core/apiService";
import { formatDate, isMobileDevice } from "../../core/utils";

interface DataType {
    key: React.Key;
    fullName: string;
    contactNo: string;
    whatsAppNo: string;
    email: string;
    outsideIndiaPhone: string;
    age: string;
    profession: string;
    educationalQualification: string;
    maritalStatus: string;
    workExperience: string;
    district: string;
    preferredCountry: string;
    appearedIelts: string;
    studiedInMw: string;
    ieltsScore: string;
    visaProcessingAgency: string;
    receivedAnyOffer: string;
    canadaCollegeAndCourse: string;
    intake: string;
    howDidYouKnow: string;
    createdDate: string;
}

export function EventBookingList() {
    const width = !isMobileDevice() ? 750 : window.innerWidth;
    const [bookingDetail, setBookingDetail] = useState<DataType | null>(null);
    const [bookingList, setBookingList] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });

    const onPageChange = (pagination: any) => {
        setPaginationConfig((f: any) => ({
            ...f,
            current: pagination.current
        }));
    };

    const onDelete = (record: any, e: SyntheticEvent) => {
        e.preventDefault();
        confirm({
            title: 'Warning!',
            content: 'Are you sure you want to delete this Event',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                deleteRequest({ url: `/events/booking/delete/${record._id}`, payload: null })
                    .then(() => {
                        getResultListing();
                        message.success("Event Booking deleted successfully!");
                        toggleSpinner(false);
                    })
                    .catch((err) => {
                        message.error(err.message);
                        toggleSpinner(false);
                    });
            },
            onCancel() {
              console.log('Cancel');
            }
        });
    };

    const getResultListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/events/eventBookingList",
            payload: {
                page: paginationConfig.current,
                limit: 10
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setBookingList(res.data.docs.map((d: any) => ({ ...d, key: d._id,  createdDate: formatDate(d.createdAt) })));
            setPaginationConfig((c: any) => ({
                current: paginationConfig.current,
                pageSize: 10,
                total: res.data.totalDocs
            }));
        })
        .catch((err) => {
            toggleSpinner(false);
        });
    };

    useEffect(() => {
        getResultListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationConfig.current]);

    const showDetails = (record: any, e: SyntheticEvent) => {
        e.preventDefault();
        setBookingDetail(record);
    };

    const handleCancel = () => {
        setBookingDetail(null);
    };

    const columns: ColumnsType<DataType> = useMemo(() => [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text, record, index) => {
                return (
                    <div className="d-flex">
                        <a href="#" onClick={(e) => showDetails(record, e)}>{record.fullName}</a>
                    </div>
                )
            },
        },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Contact No.', dataIndex: 'contactNo', key: 'contactNo' },
        { title: 'WhatsApp No.', dataIndex: 'whatsAppNo', key: 'whatsAppNo' },
        { title: 'Created Date', dataIndex: 'createdDate', key: 'createdDate' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return (
                    <div className="d-flex">
                        <a href="#" onClick={(e) => onDelete(record, e)}>Delete</a>
                    </div>
                )
            },
        }
    ], []);

    return (
        <>
            <Table
                columns={columns}
                dataSource={bookingList}
                pagination={paginationConfig}
                onChange={onPageChange}
                scroll={{
                    x: true
                }}
            />
            {
            !!bookingDetail && (
                <Drawer
                    title={`Event Booking Details`}
                    placement="right"
                    width={width}
                    visible={!!bookingDetail}
                    getContainer={false}
                    onClose={() => handleCancel ? handleCancel() : undefined}
                    footer={
                        <Space align="end" wrap className="d-flex justify-content-end">
                            <Button onClick={handleCancel}>Close</Button>
                        </Space>
                    }
                >
                    <Descriptions title="Event Booking Details" layout="vertical">
                        <Descriptions.Item label="Full Name">{bookingDetail.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Contact No.">{bookingDetail.contactNo}</Descriptions.Item>
                        <Descriptions.Item label="WhatsApp No.">{bookingDetail.whatsAppNo}</Descriptions.Item>
                        <Descriptions.Item label="Email">{bookingDetail.email}</Descriptions.Item>
                        <Descriptions.Item label="Age">{bookingDetail.age}</Descriptions.Item>
                        <Descriptions.Item label="Created Date">{bookingDetail.createdDate}</Descriptions.Item>
                        <Descriptions.Item label="Profession">{bookingDetail.profession}</Descriptions.Item>
                        <Descriptions.Item label="Are you a?">{bookingDetail.educationalQualification}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Marital Status">{bookingDetail.maritalStatus}</Descriptions.Item>
                        <Descriptions.Item span={3} label="If you live outside of India, please provide your phone number along with the country code. If
                                you are in India, write 'NIL'.">{bookingDetail.outsideIndiaPhone}</Descriptions.Item>
                        <Descriptions.Item span={3} label="How many years of Work Experience do you have?">{bookingDetail.workExperience}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Which district in Kerala are you from?">{bookingDetail.district}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Preferred country for studying abroad">{bookingDetail.preferredCountry}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Have you appeared for IELTS?">{bookingDetail.appearedIelts}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Are you a student of Manglish World Online Academy?">{bookingDetail.studiedInMw}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Which agency is doing your Study Visa Processing?">{bookingDetail.visaProcessingAgency}</Descriptions.Item>
                        <Descriptions.Item span={3} label="If you have IELTS, How much did you score for Listening, Reading, Speaking, Writing? If you
                                haven't appeared for IELTS, Please answer ' NO '">{bookingDetail.ieltsScore}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Have you received an offer letter from any international College? If Yes, mention the College
                                name and Course name">{bookingDetail.receivedAnyOffer}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Are you already in Canada? If yes, Mention the college and course you study now. If no, write
                                Nil.">{bookingDetail.canadaCollegeAndCourse}</Descriptions.Item>
                        <Descriptions.Item span={3} label="Which Intake are you planning to apply for?">{bookingDetail.intake}</Descriptions.Item>
                        <Descriptions.Item span={3} label="How did you come to know about this webinar?">{bookingDetail.howDidYouKnow}</Descriptions.Item>
                    </Descriptions>
                </Drawer>
            )
        }
        </>
    )
}
