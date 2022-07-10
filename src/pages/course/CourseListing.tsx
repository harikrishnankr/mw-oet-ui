import React, { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { AddEditCourse } from "./AddEditCourse";
import { deleteRequest, getRequest } from "../../core/apiService";
import confirm from "antd/lib/modal/confirm";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

export function CourseListing() {
    const [isModalOpen, toggleModal] = useState<boolean>(false);
    const [courses, setCourseList] = useState<DataType[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);

    const onEdit = (record: any, e: SyntheticEvent) => {
        e.preventDefault();
        setSelectedRecord(record);
        toggleModal(true);
    };

    const onAdd = () => {
        setSelectedRecord(null);
        toggleModal(true);
    };

    const onDelete = (record: any, e: SyntheticEvent) => {
        confirm({
            title: 'Warning!',
            content: 'Are you sure you want to delete this Course',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                deleteRequest({ url: `/course/delete/${record._id}`, payload: null })
                    .then(() => {
                        getCourseList();
                        message.success("Course deleted successfully!");
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

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (text, record, index) => {
                return (
                    <div className="d-flex">
                        <a href="#" onClick={(e) => onEdit(record, e)}>Edit</a>
                        <a href="#" onClick={(e) => onDelete(record, e)} className="ml-2">Delete</a>
                    </div>
                )
            },
        }
    ], []);

    const paginationConfig = useMemo(() => ({
        total: courses.length,
        pageSize: 10
    }), [courses]);

    const getCourseList = () => {
        toggleSpinner(true);
        getRequest({ url: "/course/list", payload: {} })
            .then((res) => {
                toggleSpinner(false);
                setSelectedRecord(null);
                setCourseList(res.data.map((d: any) => ({ ...d, key: d._id })));
            })
            .catch((err) => {
                toggleSpinner(false);
                console.log(err);
            });
    };

    useEffect(() => {
        getCourseList();
    }, []);

    const onAddEditSuccess = () => {
        toggleModal(false);
        setSelectedRecord(null);
        getCourseList();
    };

    return (
        <>
            <PageWrapper title="Courses" subTitle="Add/Edit Course Details" actions={[
                <Button type="primary" key="1" onClick={onAdd}>Add Course</Button>
            ]}>
                <Table
                    columns={columns}
                    dataSource={courses}
                    pagination={paginationConfig}
                />
            </PageWrapper>
            <AddEditCourse isOpen={isModalOpen} handleOk={onAddEditSuccess} handleCancel={() => toggleModal(false)} data={selectedRecord}/>
        </>
    );
}
