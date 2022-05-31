import { Button, Descriptions, PageHeader } from "antd";
import React, { ReactNode } from "react";

export interface IPageWrapper {
    title: string;
    subTitle?: string;
    actions?: ReactNode[];
    children: any;
}

export function PageWrapper({ title, subTitle, actions, children }: IPageWrapper) {
    return (
        <PageHeader
            className="site-page-header"
            title={title}
            subTitle={subTitle}
            extra={actions || []}
        >
            {children}
        </PageHeader>
    );
}
