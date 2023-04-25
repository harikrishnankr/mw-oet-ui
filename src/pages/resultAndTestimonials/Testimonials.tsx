import { SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import confirm from "antd/lib/modal/confirm";
import { toggleSpinner } from "../../core/PageWrapper";
import { deleteRequest, postRequest } from "../../core/apiService";
import { Button, Drawer, Form, FormInstance, Input, message, Slider, Space, Spin, Upload } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { formatDate, isMobileDevice } from "../../core/utils";
import AvatarEditor from "react-avatar-editor";

interface DataType {
    key: React.Key;
    name: string;
    imageUrl: string;
    review: number;
}

interface IAddEditReview {
    isOpen: boolean;
    review?: any;
    handleCancel?: (t?: any) => void;
}

function AddEditReview({ isOpen, handleCancel }: IAddEditReview) {
    const width = !isMobileDevice() ? 750 : window.innerWidth;
    const [form] = Form.useForm<FormInstance<DataType>>();
    const [loading, toggleLoader] = useState(false);
    const [profileImageUncropped, setProfileFile] = useState(null);
    const avatarEditor = useRef(null);
    const [avatarConfig, setAvatarConfig] = useState({
        zoom: 1.2,
        rotate: 0
    });

    const onSubmit = () => {
        form.submit();
    };

    const beforeUpload = (file: File) => {
        const maxFileSize = 1024*3*1024; //3MB
        const isAllowed = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf';
        if (!isAllowed) {
          message.error(`${file.name} is not a png/jpeg/jpg/pdf file`);
        } else if (maxFileSize < file.size) {
            message.error(`${file.name} should be under 3MB file size`);
        }
        return (!isAllowed || maxFileSize < file.size) ? Upload.LIST_IGNORE : false;
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const getImageUrl = async () => {
        const dataUrl = (avatarEditor?.current as any)?.getImage().toDataURL()
        const result = await fetch(dataUrl)
        const blob = await result.blob()
      
        return new File([blob], (profileImageUncropped as any)?.name + ".jpg", { type: "image/jpeg" })
    };

    const onFinish = async (values: any) => {
        toggleLoader(true);
        const payload = new FormData();
        Object.keys(values).forEach((name: string) => {
            if (name !== "profile") {
                payload.append(name, values[name as keyof typeof values])
            }
        });
        if (values.profile) {
            const file = await getImageUrl();
            payload.append("profileImage", file);
        }
        postRequest({ url: "/review/new", payload, isFormData: true,})
        .then((res) => {
            handleCancel && handleCancel(true);
            message.success("Review added successfully");
            toggleLoader(false);
        })
        .catch((err) => {
            message.error("Failed to add Review!");
            toggleLoader(false);
        });
    };

    const onFileChange = (e: any) => {
        setProfileFile(e?.fileList?.length ? e.file : null);
    };

    useEffect(() => {
        if (form) {
            form?.resetFields();
            setProfileFile(null);
        }
    }, [isOpen, form]);

    return (
        <Drawer
            title={`Add/Edit Review`}
            placement="right"
            width={width}
            visible={isOpen}
            getContainer={false}
            onClose={() => handleCancel ? handleCancel(false) : undefined}
            footer={
                <Space align="end" wrap className="d-flex justify-content-end">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={onSubmit}>
                        Save
                    </Button>
                </Space>
            }
        >
            <Spin spinning={loading}>
                {
                    isOpen &&
                    <>
                        <Form
                            name="basic"
                            labelCol={{ span: 16 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input the Student Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Review"
                                name="review"
                                rules={[{ required: true, message: 'Please input the Review!' }]}
                            >
                                <Input.TextArea maxLength={1000}/>
                            </Form.Item>
                            <Form.Item label="Profile Picture">
                                <Form.Item label="Upload an Identification and Address Proof" name="profile" valuePropName="fileList" getValueFromEvent={normFile} noStyle rules={[{ required: true, message: 'Profile Picture is required!' }]}>
                                    <Upload.Dragger name="files" beforeUpload={beforeUpload} maxCount={1} onChange={onFileChange}>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </Form>
                        {
                            profileImageUncropped &&
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">
                                        <AvatarEditor
                                            ref={avatarEditor}
                                            image={profileImageUncropped}
                                            width={250}
                                            height={250}
                                            border={50}
                                            color={[255, 255, 255, 0.6]} // RGBA
                                            scale={avatarConfig.zoom}
                                            rotate={avatarConfig.rotate}
                                        />
                                    </div>
                                    <div className="col-md-6 pl-2">
                                        Zoom:
                                        <Slider min={0.5} max={2} step={0.01} onChange={(val) => setAvatarConfig({
                                            ...avatarConfig,
                                            zoom: val
                                        })} value={avatarConfig.zoom} />
                                        Rotation:
                                        <Slider min={0} max={180} step={1} onChange={(val) => setAvatarConfig({
                                            ...avatarConfig,
                                            rotate: val
                                        })} value={avatarConfig.rotate} />
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }
            </Spin>
        </Drawer>
    )
}

export function Testimonials() {
    const [isModalOpen, toggleModal] = useState<boolean>(false);
    const [reviews, setReviews] = useState<DataType[]>([]);
    const [paginationConfig, setPaginationConfig] = useState<any>({
        total: 0,
        pageSize: 10,
        current: 1
    });
    const [currentReview, setCurrentReview] = useState({});

    const addReview = () => {
        setCurrentReview({});
        toggleModal(true);
    };

    const onDelete = (record: any, e: SyntheticEvent) => {
        confirm({
            title: 'Warning!',
            content: 'Are you sure you want to delete this Review',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                toggleSpinner(true);
                e.preventDefault();
                deleteRequest({ url: `/review/delete/${record._id}`, payload: null })
                    .then(() => {
                        getReviewListing();
                        message.success("Review deleted successfully!");
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
        { title: 'Review', dataIndex: 'review', key: 'review' },
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

    const getReviewListing = () => {
        // toggleSpinner(true);
        postRequest({
            url: "/review/list",
            payload: {
                page: paginationConfig.current,
                limit: 10
            }
        })
        .then((res) => {
            toggleSpinner(false);
            setReviews(res.data.docs.map((d: any) => ({ ...d, key: d._id, createdDate: formatDate(d.createdDate) })));
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

    const handleCancel = (isSubmit: boolean) => {
        if (isSubmit) {
            getReviewListing();
        }
        toggleModal(false);
    }

    useEffect(() => {
        getReviewListing();
    }, [paginationConfig.current]);

    return (
        <>
            <div className="pb-2 d-flex justify-content-end">
                <Button type="primary" onClick={addReview}>Add Review</Button>
            </div>
            <Table
                columns={columns}
                dataSource={reviews}
                pagination={paginationConfig}
                onChange={onPageChange}
                scroll={{
                    x: true
                }}
            />
            <AddEditReview isOpen={isModalOpen} review={currentReview} handleCancel={handleCancel}/>
        </>
    )
}
