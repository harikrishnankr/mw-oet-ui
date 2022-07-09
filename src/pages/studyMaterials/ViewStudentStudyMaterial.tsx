import { Alert, message } from "antd";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../core/apiService";
import { StudyMaterialsListing } from "./StudyMaterialsListing";

export default function ViewStudentStudyMaterial() {
    const [hasAccess, setAccess] = useState(false);

    useEffect(() => {
        getRequest({ url: "/study-materials/has-access" })
        .then((res: any) => {
            setAccess(res?.data?.hasAccessToStudyMaterials);
        })
        .catch((err: any) => {
            message.error(err?.message||"Couldn't fetch study material access settings.");
        });
    }, []);

    return (
        <>
            {
                !hasAccess &&
                <div className="mt-3">
                    <Alert
                        message="Warning"
                        description="You don't have access to the study materials listing. Please contact us to get the access."
                        type="warning"
                        showIcon
                        className="mb-3"
                        closable
                    />
                </div>
            }
            {
                hasAccess &&
                <StudyMaterialsListing />
            }
        </>
    );
}
