import { Modal, message, Switch, Spin } from "antd";
import { useEffect, useState } from "react";
import { getRequest } from "../../core/apiService";

export function TermsAndCondition({isOpen, accept, decline}: { isOpen: boolean; accept: () => any; decline: () => any;}) {
    const [tnc, setTnc] = useState("");
    const [loading, setLoading] = useState(false);
    const width = window.innerWidth;
    const [read, setRead] = useState(false);
    const onChange = (checked: boolean) => {
        setRead(checked);
    };

    useEffect(() => {
        setLoading(true);
        getRequest({ url: "/tnc/fetch/OET" })
        .then((res: any) => {
            setLoading(false);
            setTnc(res.data.tnc);
        })
        .catch(() => {
            setLoading(false);
            message.error("Couldn't fetch terms and condition. Please try again.");
            decline();
        });
        setRead(false);
    }, [isOpen]);

    const onAccept = () => {
        if (read) {
            accept();
        } else {
            message.error("Please check below checkbox to Yes to mark as read then click on Accept!")
        }
    };

    return (
        <Modal
            title="Terms and Condition/Refund Policy"
            centered
            visible={isOpen}
            onOk={onAccept}
            onCancel={decline}
            width={width}
            okText="Accept"
            cancelText="Decline"
        >
            <Spin spinning={loading}>
                <div>
                    <div>
                        <div dangerouslySetInnerHTML={ {__html: tnc} }></div>
                    </div>
                    <div className="mt-3">
                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={onChange} />
                        <span className="ml-2">I have read the agreement and agree with our terms and Conditions</span>
                    </div>
                    { !read && <div className="ant-form-item-explain-error">Click here to accept our Terms and Conditions</div> }
                </div>
            </Spin>
        </Modal>
    );
}
