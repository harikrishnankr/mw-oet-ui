import { Button, Table } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { postRequest } from "../../core/apiService";
import { formatDate } from "../../core/utils";

interface DataType {
    key: React.Key;
    fullName: string;
    mobile: string;
    whatsAppNo: string;
    email: string;
    place: string;
    qualification: string;
    inPersonAppointment: boolean;
    testAppeared: boolean;
    test: string;
    howDidYouKnow: string;
    countryPreferred: string[];
}

export enum BookingType {
    STUDY_ABROAD= "STUDY_ABROAD",
    IMMIGRATION= "IMMIGRATION",
    VISA_GUIDANCE="VISA_GUIDANCE",
    ALL= "ALL"
}

export function ConsultationBooking() {
    const [results, setResults] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1,
    });
    const bookingTypeList = useMemo(() => [
        { label: 'All', value: BookingType.ALL },
        { label: 'Study Abroad', value: BookingType.STUDY_ABROAD },
        { label: 'Immigration', value: BookingType.IMMIGRATION },
        { label: 'Visa Guidance', value: BookingType.VISA_GUIDANCE },
    ], [])
    const [filter, setFilter] = useState({
        type: BookingType.ALL
    });

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName', fixed: 'left', },
        { title: 'WhatsApp No.', dataIndex: 'whatsAppNo', key: 'whatsAppNo', fixed: 'left', },
        { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Place', dataIndex: 'place', key: 'place' },
        { title: 'Qualification', dataIndex: 'qualification', key: 'qualification' },
        { title: 'In Person Appointment Needed', dataIndex: 'inPersonAppointment', key: 'inPersonAppointment' },
        { title: 'Test Appeared', dataIndex: 'testAppeared', key: 'testAppeared' },
        { title: 'Test', dataIndex: 'test', key: 'test' },
        { title: 'How did you know about MW?', dataIndex: 'howDidYouKnow', key: 'howDidYouKnow' },
        { title: 'Country Preferred', dataIndex: 'countryPreferred', key: 'countryPreferred' },
        { title: 'Booking Date', dataIndex: 'createdAt', key: 'createdAt' },
    ], []);

    const getTitle = () => {
        switch (filter.type) {
            case BookingType.STUDY_ABROAD:
                return "Study Abroad Bookings";
            case BookingType.IMMIGRATION:
                return "Immigration Bookings";
            case BookingType.VISA_GUIDANCE:
                return "Visa Application Guidance Booking";
            default:
                return "Consultation Bookings";
        }
    };

    const getSubTitle = () => {
        switch (filter.type) {
            case BookingType.STUDY_ABROAD:
                return "Study Abroad Consultation Bookings complete listing";
            case BookingType.IMMIGRATION:
                return "Immigration Consultation Bookings complete listing";
            case BookingType.VISA_GUIDANCE:
                return "Visa Application Guidance Consultation Bookings complete listing";
            default:
                return "Consultation Booking complete list(Study Abroad/Immigration/Visa Application Guidance)"
        }
    };
    
    const onPageChange = (pagination: any) => {
        setPaginationConfig((f: any) => ({
            ...f,
            current: pagination.current
        }));
    };

    const handleInputChange = useCallback((e: any) => {
        const { target } = e;
        if (target) {
            setFilter((f) => ({
                ...f,
                [target.name]: target.value
            }));
            setPaginationConfig((c: any) => ({
                ...c,
                current: 1
            }));
        }
    }, []);

    const getResultListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/study-abroad/booking/list",
            payload: {
                page: paginationConfig.current,
                type: filter.type,
                limit: 10
            }
        })
        .then((res: any) => {
            toggleSpinner(false);
            setResults(res.data.docs.map((d: any) => ({
                ...d,
                key: d._id,
                createdAt: d.createdAt ? formatDate(d.createdAt) : "03/05/2023",
                inPersonAppointment: d.inPersonAppointment ? "Yes" : "No",
                testAppeared: d.testAppeared ? "Yes" : "No",
                countryPreferred: d.countryPreferred.join(", ")
            })));
            setPaginationConfig((c: any) => ({
                current: paginationConfig.current,
                pageSize: 10,
                total: res.data.totalDocs
            }));
        })
        .catch((err: any) => {
            toggleSpinner(false);
            console.log(err);
        });
    };

    useEffect(() => {
        getResultListing();
    }, [paginationConfig.current, filter.type]);
    
    return (
        <PageWrapper
            title={getTitle()}
            subTitle={getSubTitle()}
            actions={[
                <Button key="1" type="primary" onClick={getResultListing}>Refresh</Button>
            ]}
        >
            <FilterWrapper>
                <Filter name="type" type={FilterType.RadioGroup} radioOptions={bookingTypeList}
                    value={filter.type} onChange={handleInputChange} label="Booking Type"/>
            </FilterWrapper>
            <Table
                columns={columns}
                dataSource={results}
                pagination={paginationConfig}
                onChange={onPageChange}
                scroll={{
                    x: true
                }}
            />
        </PageWrapper>
    );
}
