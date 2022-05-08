import { Spin } from "antd";
import React, { Suspense } from "react";

export function Loading(props: { children: boolean | React.ReactFragment | React.ReactPortal | null | undefined; }) {
    return (
        <>
            <Suspense fallback={ <div className="d-flex justify-content-center align-items-center w-100 h-100"><Spin size="large" /></div> }>
                {props.children}
            </Suspense>
        </>
    );
};