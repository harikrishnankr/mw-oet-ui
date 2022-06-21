import { PageHeader, Spin } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { EventEmitter } from "./eventEmitter";

export interface IPageWrapper {
    title: string;
    subTitle?: string;
    actions?: ReactNode[];
    children: any;
}

const eventEmitter = new EventEmitter();

export const toggleSpinner = (loading: boolean) => {
    eventEmitter.emit("showLoading", loading);
};

export function PageWrapper({ title, subTitle, actions, children }: IPageWrapper) {
    const [loading, toggleLoader] = useState(false);

    const handleLoading = (value: boolean) => {
        toggleLoader(value);
    };

    useEffect(() => {
        eventEmitter.on('showLoading', handleLoading);

        return () => {
            eventEmitter.removeListener("showLoading", handleLoading);
        };
    }, []);

    return (
        <Spin spinning={loading}>
            <PageHeader
                className="site-page-header"
                title={title}
                subTitle={subTitle}
                extra={actions || []}
            >
                {children}
            </PageHeader>
        </Spin>
    );
}
