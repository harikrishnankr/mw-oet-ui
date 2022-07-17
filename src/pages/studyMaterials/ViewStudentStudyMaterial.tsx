import { Alert, message } from "antd";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../core/apiService";
import { StudyMaterialsListing } from "./StudyMaterialsListing";

export default function ViewStudentStudyMaterial() {
    const [hasAccess, setAccess] = useState(false);
    const [courseId, setCourseId] = useState('');

    useEffect(() => {
        getRequest({ url: "/study-materials/has-access" })
        .then((res: any) => {
            setAccess(res?.data?.hasAccessToStudyMaterials);
            setCourseId(res?.data?.courseType);
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
                <StudyMaterialsListing courseId={courseId} />
            }
        </>
    );
}
