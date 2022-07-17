import { Button, message, Modal, Table } from "antd";
import confirm from "antd/lib/modal/confirm";
import { ColumnsType } from "antd/lib/table";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { postRequest } from "../../core/apiService";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { formatDate } from "../../core/utils";
import { AddStaff } from "./AddStaff";

const { info } = Modal;

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

export function StaffListing() {
    const [staffs, setStaffs] = useState([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1,
        staffName: ''
    });
    const [isAddStaffOpen, setAddStaffOpen] = useState(false);

    const approveSuspendStaff = useCallback((record: any, access: boolean) => (e: SyntheticEvent) => {
        e.preventDefault();
        confirm({
            title: 'Warning!',
            content: `Are you sure you want to ${access ? 'Approve' : 'Suspend'} this Staff`,
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                postRequest({ url: `/staff/approve/${record.id}`, payload: { approve: access } })
                    .then(() => {
                        getStaffListing();
                        message.success(` ${access ? 'Approved' : 'Suspend'} staff successfully!`);
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
    }, []);

    const showBankDetails = (staffData: any) => {
        info({
            title: 'Bank Details',
            content: (
                <>
                    <div className="d-flex">
                        <div className="font-weight-bold">Account Holder Name: </div>
                        <div className="ml-2">{staffData.bankDetails.accountHolderName}</div>
                    </div>
                    <div className="d-flex">
                        <div className="font-weight-bold">Account Number: </div>
                        <div className="ml-2">{staffData.bankDetails.accountNo}</div>
                    </div>
                    <div className="d-flex">
                        <div className="font-weight-bold">Bank Name: </div>
                        <div className="ml-2">{staffData.bankDetails.bankName}</div>
                    </div>
                    <div className="d-flex">
                        <div className="font-weight-bold">Branch: </div>
                        <div className="ml-2">{staffData.bankDetails.branch}</div>
                    </div>
                    <div className="d-flex">
                        <div className="font-weight-bold">IFSC: </div>
                        <div className="ml-2">{staffData.bankDetails.ifsc}</div>
                    </div>
                    <div className="d-flex">
                        <div className="font-weight-bold">UPID: </div>
                        <div className="ml-2">{staffData.bankDetails.upiId}</div>
                    </div>
                </>
            ),
        });
    };

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'phone', key: 'phone' },
        { title: 'Created On', dataIndex: 'createdDate', key: 'createdDate' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 200,
            render: (text, record: any) => {
                return (
                    <div className="d-flex">
                        { record.status === "SUSPENDED" && 
                            <a href="#" onClick={approveSuspendStaff(record, true)}>Approve</a>
                        }
                        { record.status === "APPROVED" &&
                            <a href="#" onClick={approveSuspendStaff(record, false)}>Suspend</a>
                        }
                        {
                            record.bankDetails && record.bankDetails.accountNo && 
                            <a className="ml-3" href="#" onClick={() => showBankDetails(record)}>Bank Details</a>
                        }
                    </div>
                )
            }
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

    const onAdd = () => {
        setAddStaffOpen(true);
    };

    const closeAddStaff = (isSuccess: boolean) => {
        if (isSuccess) {
            getStaffListing();
        }
        setAddStaffOpen(false);
    };

    const getStaffListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/staff/list",
            payload: {
                ...filter
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setStaffs(res.data.docs.map((d: any) => ({ ...d, key: d._id, createdDate: formatDate(d.createdDate) })));
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

    useEffect(() => {
        getStaffListing();
    }, [filter]);

    return (
        <PageWrapper title="Staff" subTitle="View and Approve Staffs" actions={[
            <Button type="primary" key="1" onClick={onAdd}>Add Staff</Button>
        ]}>
            <FilterWrapper>
                <Filter name="staffName" type={FilterType.Input} value={filter.staffName}
                    onChange={handleInputChange} placeholder="Student Name" label="Student Name"/>
            </FilterWrapper>
            <Table
                columns={columns}
                dataSource={staffs}
                pagination={paginationConfig}
                onChange={onPageChange}
                scroll={{
                    x: true
                }}
            />
            <AddStaff isOpen={isAddStaffOpen} handleClose={closeAddStaff as any}/>
        </PageWrapper>
    );
}
