import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { getRequest, postRequest } from "../../core/apiService";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { formatDate, getBaseDocumentEndPoint, isMobileDevice } from "../../core/utils";
import { AddStudyMaterials } from "./AddStudyMaterials";

interface DataType {
    key: React.Key;
    name: string;
    type: number;
    courseId: string;
    videoUrl?: string;
    document?: string;
}

export function StudyMaterialsListing() {
    const [courses, setCourses] = useState<{ label: string; value: string; }[]>([]);
    const [studyMaterials, setStudyMaterials] = useState([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [isAddOpen, toggleAddModal] = useState(false);
    const isMobile = isMobileDevice();
    const [filter, setFilter] = useState({
        limit: 10,
        page: 1,
        courseId: '',
        name: ''
    });

    const openDocument = useCallback((record: any) => (e: SyntheticEvent) => {
        window.open(getBaseDocumentEndPoint()+record?.documentUrl)
    }, []);

    const columns: ColumnsType<DataType> = useMemo(() => [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Last Updated On', dataIndex: 'updatedAt', key: 'updatedAt' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 200,
            render: (text, record: any) => {
                return (
                    <div className="d-flex">
                        <a href="#" onClick={openDocument(record)}>Preview</a>
                    </div>
                )
            }
        }
    ], []);
    
    const getAllCourses = () => {
        toggleSpinner(true);
        getRequest({ url: "/course/getAll", skipAuth: true })
        .then((res: any) => {
            const options: any[]  = [];
            res.data.forEach((course: any) => options.push({ label: course.name, value: course.id }));
            setCourses(options);
            setFilter((f) => ({
                ...f,
                courseId: options[0].value
            }));
            toggleSpinner(false);
        })
        .catch(() => {
            message.error("Couldn't fetch course list. Please try reloading the page!");
            toggleSpinner(false);
        });
    };

    const getStudyMaterialListing = () => {
        toggleSpinner(true);
        postRequest({
            url: "/study-materials/list",
            payload: {
                ...filter
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setStudyMaterials(res.data.docs.map((d: any) => ({
                ...d, key: d._id, createdDate: formatDate(d.createdDate), updatedAt: formatDate(d.updatedAt)
            })));
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
        if (filter.courseId) {
            getStudyMaterialListing();
        }
    }, [filter]);

    useEffect(() => {
        getAllCourses();
    }, []);

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

    const onAddClose = (success?: boolean) => {
        toggleAddModal(false);
        if (success) {
            getStudyMaterialListing();
        }
    };

    const onAdd = () => {
        toggleAddModal(true);
    };

    return (
        <PageWrapper title="Study Materials" subTitle={!isMobile ? "View and Add Study Materials" : ""} actions={[
            <Button type="primary" key="1" onClick={onAdd}>Add Material</Button>
        ]}>
            <FilterWrapper>
                <Filter name="courseId" type={FilterType.RadioGroup} radioOptions={courses}
                    value={filter.courseId} onChange={handleInputChange} label="Course Type"
                />
                <Filter name="name" type={FilterType.Input} placeholder="Search Material"
                    value={filter.name} onChange={handleInputChange} label="Material Name"
                />
            </FilterWrapper>
            <Table
                columns={columns}
                dataSource={studyMaterials}
                pagination={paginationConfig}
                onChange={onPageChange}
                scroll={{
                    x: true
                }}
            />
            <AddStudyMaterials isOpen={isAddOpen} handleCancel={onAddClose} courses={courses}/>
        </PageWrapper>
    );
}
