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

export enum ServiceType {
    WorkPermit="Spouse Open Work Permit",
    ALL= ""
}

export function ServiceBooking() {
    const [results, setResults] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1,
    });
    const bookingTypeList = useMemo(() => [
        { label: 'All', value: ServiceType.ALL },
        { label: 'Spouse Open Work Permit', value: ServiceType.WorkPermit },
    ], [])
    const [filter, setFilter] = useState({
        type: ServiceType.ALL
    });

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName', fixed: 'left', },
        { title: 'WhatsApp No.', dataIndex: 'whatsAppNo', key: 'whatsAppNo', fixed: 'left', },
        { title: 'Mobile', dataIndex: 'mobile', key: 'mobile' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        (filter?.type === ServiceType.WorkPermit ? {
            title: 'Country Preferred', dataIndex: 'countryPreferred', key: 'countryPreferred'
        } : {
            title: 'Service Needed', dataIndex: 'serviceNeeded', key: 'serviceNeeded'
        }),
        { title: 'Booking Date', dataIndex: 'createdAt', key: 'createdAt' }
    ], [filter.type]);
    
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
            url: "/service/booking/list",
            payload: {
                page: paginationConfig.current,
                service: filter.type,
                limit: 10
            }
        })
        .then((res: any) => {
            toggleSpinner(false);
            setResults(res.data.docs.map((d: any) => ({
                ...d,
                key: d._id,
                createdAt: formatDate(d.createdAt),
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
            title={"Service Requests"}
            subTitle={"Service Consultation booking requests"}
            actions={[
                <Button key="1" type="primary" onClick={getResultListing}>Refresh</Button>
            ]}
        >
            <FilterWrapper>
                <Filter name="type" type={FilterType.RadioGroup} radioOptions={bookingTypeList}
                    value={filter.type} onChange={handleInputChange} label="Service Type"/>
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
