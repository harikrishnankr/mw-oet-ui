import { Button, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import SunEditor from 'suneditor-react';
import list from 'suneditor/src/plugins/submenu/list'
import {
    blockquote,
    align,
    font,
    fontSize,
    fontColor,
    hiliteColor,
    horizontalRule,
    formatBlock,
    lineHeight,
    textStyle,
    link
} from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor
import { getRequest, postRequest } from "../../core/apiService";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { isMobileDevice } from "../../core/utils";

export function TermsAndCondition() {
    const [tnc, setTnc] = useState("");
    const [id, setId] = useState(null);
    const isMobile = isMobileDevice();

    const fetchTnc = () => {
        toggleSpinner(true);
        getRequest({ url: "/tnc/fetch/OET" })
        .then((res: any) => {
            const {
                id, tnc
            } = res?.data || {};
            setTnc(tnc);
            setId(id);
            toggleSpinner(false);
        })
        .catch(() => {
            message.error("Couldn't fetch terms and condition");
            toggleSpinner(false);
        });
    };

    useEffect(() => {
        fetchTnc();
    }, []);

    const onTNCChange = (text: string) => {
        setTnc(text);
    };

    const onSubmit = () => {
        toggleSpinner(true);
        postRequest({ url: "/tnc/update", payload: { tnc, id } })
        .then(() => {
            fetchTnc();
            message.success("Updated the tnc successfully!");
            toggleSpinner(false);
        })
        .catch(() => {
            message.error("Couldn't fetch terms and condition");
            toggleSpinner(false);
        });
    };

    return (
        <PageWrapper title="Terms and Condition" subTitle={!isMobile ? "View and Add Terms and Condition" : ""}>
            <SunEditor name="termsAndCondition" onChange={onTNCChange} setContents={tnc} setOptions={{
                plugins: [
                    blockquote,
                    align,
                    font,
                    fontSize,
                    fontColor,
                    hiliteColor,
                    horizontalRule,
                    formatBlock,
                    lineHeight,
                    textStyle,
                    link,
                    list
                ],
                buttonList: [
                    [
                        'blockquote',
                        'align',
                        'font',
                        'fontSize',
                        'fontColor',
                        'hiliteColor',
                        'horizontalRule',
                        'formatBlock',
                        'lineHeight',
                        'textStyle',
                        'link',
                        'list'
                    ]
                ]
                }}
                placeholder="Please type terms and condition here..."
            />
            <div className="d-flex justify-content-end p-3">
                <Button type="default" onClick={fetchTnc}>Cancel</Button>
                <Button type="primary" onClick={onSubmit} className="ml-3">Save</Button>
            </div>
        </PageWrapper>
    );
}
