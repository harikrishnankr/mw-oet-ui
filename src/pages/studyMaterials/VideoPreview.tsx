import { JWPlayer } from "../../core/JWPlayer";
import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../core/PageWrapper";
import { useNavigate, useParams } from "react-router";
import { Alert, Button } from "antd";

export default function VideoPreview() {
    const params = useParams();
    const [mediaId, setMediaId] = useState("");
    const navigation = useNavigate();
    
    useEffect(() => {
        setMediaId(params?.mediaId as string);
    }, [params]);

    const backToStudyMaterial = () => navigation("/app/study-materials");

    return (
        <PageWrapper title="Video Material" subTitle={"Preview Video Materials"} actions={[
            <Button type="primary" ghost onClick={backToStudyMaterial} key="button-1">Back</Button>
        ]} >
            <div style={{position:"relative", overflow:"hidden", width: "100%", height: "100%"}}>
                { mediaId && <JWPlayer mediaId={mediaId as string}/> }
                { !mediaId && <Alert
                        message="Error!!"
                        description="Bad Request. Media Id is required for video playback. Please try again"
                        type="error"
                    />
                }
            </div>
        </PageWrapper>
    );
}
