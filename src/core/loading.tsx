import { Spin } from "antd";
import React, { ReactNode, Suspense } from "react";

export function Loading(props: { children: boolean | React.ReactFragment | React.ReactPortal | Element | null | undefined; }) {
    return (
        <>
            <Suspense fallback={ <div className="d-flex justify-content-center align-items-center w-100 h-100"><Spin size="large" /></div> }>
                {props.children as ReactNode}
            </Suspense>
        </>
    );
};