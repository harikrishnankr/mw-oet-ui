import { Button, Table, message } from "antd";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { ColumnsType } from "antd/lib/table";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { deleteRequest, postRequest } from "../../core/apiService";
import { formatDate } from "../../core/utils";
import confirm from "antd/lib/modal/confirm";

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

export function ServiceBooking() {
    const [results, setResults] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1,
    });

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
                deleteRequest({ url: `/leads/studyMaterials/delete/${record._id}`, payload: null })
                    .then(() => {
                        getResultListing();
                        message.success("Lead deleted successfully!");
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

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Full Name', dataIndex: 'fullName', key: 'fullName', fixed: 'left', },
        { title: 'WhatsApp No.', dataIndex: 'whatsAppNo', key: 'whatsAppNo', fixed: 'left', },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Study Abroad Or Immigrate', dataIndex: 'studyAbroadOrImmigrate', key: 'studyAbroadOrImmigrate'
        },
        {
            title: 'Country Preferred', dataIndex: 'countryPreferred', key: 'countryPreferred'
        },
        {
            title: 'Processing Started', dataIndex: 'hasProcessStarted', key: 'hasProcessStarted'
        },
        {
            title: 'Offer LEtter Received', dataIndex: 'offerLetterReceived', key: 'offerLetterReceived'
        },
        { title: 'Created Date', dataIndex: 'createdAt', key: 'createdAt' },
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
    
    const onPageChange = (pagination: any) => {
        setPaginationConfig((f: any) => ({
            ...f,
            current: pagination.current
        }));
    };

    const getResultListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/leads/studyMaterials/list",
            payload: {
                page: paginationConfig.current,
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
    }, [paginationConfig.current]);
    
    return (
        <PageWrapper
            title={"Study Material Leads"}
            subTitle={"Study Material Leads requests"}
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
