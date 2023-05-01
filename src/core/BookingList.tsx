import { PageWrapper, toggleSpinner } from "./PageWrapper";
import { Button, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { postRequest } from "./apiService";
import { ColumnsType } from "antd/lib/table";
import { formatDate } from "./utils";

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

export function BookingList({ immigration }: { immigration: boolean }) {
    const [results, setResults] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
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
    
    const onPageChange = (pagination: any) => {
        setPaginationConfig((f: any) => ({
            ...f,
            current: pagination.current
        }));
    };

    const getResultListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/study-abroad/booking/list",
            payload: {
                page: paginationConfig.current,
                immigration: immigration,
                limit: 10
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setResults(res.data.docs.map((d: any) => ({
                ...d,
                key: d._id,
                createdAt: formatDate(d.createdAt),
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
        .catch((err) => {
            toggleSpinner(false);
            console.log(err);
        });
    };

    useEffect(() => {
        getResultListing();
    }, [paginationConfig.current]);
    
    return (
        <PageWrapper
            title={!immigration ? "Study Abroad Bookings": "Immigration Bookings"}
            subTitle={!immigration ? "Study Abroad Bookings complete listing" : "Immigration Bookings complete listing" }
            actions={[
                <Button key="1" type="primary" onClick={getResultListing}>Refresh</Button>
            ]}
        >
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
