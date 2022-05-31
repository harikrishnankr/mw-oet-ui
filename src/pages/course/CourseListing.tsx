import React, { useMemo, useState } from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { PageWrapper } from "../../core/PageWrapper";
import { AddEditCourse } from "./AddEditCourse";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
}

export function CourseListing() {
    const [isModalOpen, toggleModal] = useState<boolean>(false);
    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: () => <a href="#">Delete</a>,
        }
    ];

    const data: DataType[] = [];

    const paginationConfig = useMemo(() => ({
        total: 50,
        pageSize: 10
    }), []);


    return (
        <>
            <PageWrapper title="Courses" subTitle="Add/Edit Course Details" actions={[
                <Button type="primary" key="1" onClick={() => toggleModal(true)}>Add</Button>
            ]}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={paginationConfig}
                />
            </PageWrapper>
            <AddEditCourse isOpen={isModalOpen} handleCancel={() => toggleModal(false)}/>
        </>
    );
}
