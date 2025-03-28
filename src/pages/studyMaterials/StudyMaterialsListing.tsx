import { Button, message, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { deleteRequest, getRequest, postRequest } from "../../core/apiService";
import { UserType } from "../../core/constants/common";
import { Filter, FilterType, FilterWrapper } from "../../core/filterWrapper/FilterWrapper";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { getUserType } from "../../core/services";
import { formatDate, getBaseDocumentEndPoint, isMobileDevice } from "../../core/utils";
import { AddStudyMaterials } from "./AddStudyMaterials";
import confirm from "antd/lib/modal/confirm";

interface DataType {
    key: React.Key;
    name: string;
    type: number;
    courseId: string;
    videoUrl?: string;
    document?: string;
}

export function StudyMaterialsListing(props: {courseId?: string}) {
    const currentUserRole = getUserType();
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
        courseId: props.courseId||'',
        name: ''
    });
    const navigation = useNavigate();

    const openDocument = useCallback((record: any) => (e: SyntheticEvent) => {
        if (record.type === "VIDEO_URL") {
            navigation("video/"+record.videoUrl)
        } else {
            window.open(getBaseDocumentEndPoint()+record?.documentUrl);
        }
    }, []);

    const deleteDocument = useCallback((record: any) => (e: SyntheticEvent) => {
        e.preventDefault();
        confirm({
            title: 'Warning!',
            content: 'Are you sure you want to delete this Study material',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                deleteRequest({ url: `/study-materials/${record.id}`, payload: {} })
                    .then(() => {
                        getStudyMaterialListing();
                        message.success(record.name + " Deleted successfully!");
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
    }, [filter]);

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
                        {
                            currentUserRole === UserType.Admin &&
                            <a href="#" className="text-danger ml-3" onClick={deleteDocument(record)}>Delete</a>
                        }
                    </div>
                )
            }
        }
    ], [filter]);
    
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
        if (!props.courseId) {
            getAllCourses();
        }
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
        <PageWrapper title="Study Materials" subTitle={(!isMobile && currentUserRole === UserType.Admin) ? "View and Add Study Materials" : ""} actions={currentUserRole === UserType.Admin ? [
            <Button type="primary" key="1" onClick={onAdd}>Add Material</Button>
        ] : []}>
            <FilterWrapper>
                {
                    !props.courseId &&
                    <Filter name="courseId" type={FilterType.RadioGroup} radioOptions={courses}
                        value={filter.courseId} onChange={handleInputChange} label="Course Type"
                    />
                }
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
            { currentUserRole === UserType.Admin && <AddStudyMaterials isOpen={isAddOpen} handleCancel={onAddClose} courses={courses}/> }
        </PageWrapper>
    );
}
