/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { Button, Table, Tabs, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AddEvents } from "./AddEvents";
import { deleteRequest, postRequest } from "../../core/apiService";
import { formatDate, getBaseEndPoint } from "../../core/utils";
import confirm from "antd/lib/modal/confirm";
import { EventBookingList } from "./EventBookingList";

interface DataType {
    key: React.Key;
    eventsName: string;
    bannerImage: string;
    startDate: string;
    endDate: string;
}

const TABS = [{
    title: "Event Registration",
    key: "__eventRegistration__"
}, {
    title: "Events",
    key: "__events__"
}];

const { TabPane } = Tabs;

export function Events() {
    const [isModalOpen, toggleModal] = useState<boolean>(false);
    const [eventList, setEventList] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [activeKey, setActiveKey] = useState('__eventRegistration__');

    const onTabChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
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
                deleteRequest({ url: `/events/delete/${record._id}`, payload: null })
                    .then(() => {
                        getResultListing();
                        message.success("Event deleted successfully!");
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


    const addEvents = () => {
        toggleModal(true);
    };

    const onPageChange = (pagination: any) => {
        setPaginationConfig((f: any) => ({
            ...f,
            current: pagination.current
        }));
    };

    const getResultListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/events/list",
            payload: {
                page: paginationConfig.current,
                limit: 10
            }
        })
        .then((res) => {
            toggleSpinner(false);
            const fileAPI = getBaseEndPoint() + "/documents/";
            setEventList(res.data.docs.map((d: any) => ({ ...d, key: d._id, bannerImage: fileAPI + d.bannerImage,  createdDate: formatDate(d.createdDate) })));
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

    const handleCancel = (isSubmit: boolean) => {
        if (isSubmit) {
            getResultListing();
        }
        toggleModal(false);
    }

    useEffect(() => {
        getResultListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationConfig.current]);

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Event Name', dataIndex: 'eventName', key: 'eventName' },
        { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
        { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
        {
            title: 'Image',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                function openImage(record: DataType, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
                    e.preventDefault();
                    window.open(record.bannerImage)
                }

                return (
                    <div className="d-flex">
                        <a href="#" onClick={(e) => openImage(record, e)}>Open Image</a>
                    </div>
                )
            },
        },
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
            <PageWrapper title="Events" subTitle="View and Add Events">
                <Tabs onChange={onTabChange} activeKey={activeKey}>
                    {TABS.map((tab) => (
                        <TabPane tab={tab.title} key={tab.key}>
                            {
                                tab.key === "__eventRegistration__" ? <>
                                    <EventBookingList />
                                </> : null
                            }
                            {
                                tab.key === "__events__" ? <>
                                    <div className="pb-2 d-flex justify-content-end">
                                        <Button type="primary" onClick={addEvents}>Add Events</Button>
                                    </div>
                                    <Table
                                        columns={columns}
                                        dataSource={eventList}
                                        pagination={paginationConfig}
                                        onChange={onPageChange}
                                        scroll={{
                                            x: true
                                        }}
                                    />
                                    <AddEvents isOpen={isModalOpen} handleCancel={handleCancel}/>
                                </> : null
                            }
                        </TabPane>
                    ))}
                </Tabs>
                
            </PageWrapper>
        </>
    )
}
