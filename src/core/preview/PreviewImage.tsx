import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { EventEmitter } from "../eventEmitter";
import { getBaseDocumentEndPoint } from "../utils";
import "./Preview.scss";

const eventEmitter = new EventEmitter();

export const showImagePreview = (data: any) => {
    eventEmitter.emit("showImagePreview", data);
};

export function PreviewImage() {
    const width = window.innerWidth;
    const [imageData, setImageData] = useState<any>(null);
    const [isOpen, toggleDrawer] = useState(false);

    const handlePreview = (data: any) => {
        toggleDrawer(true);
        setImageData(data);
    };

    const handleCancel = () => {
        toggleDrawer(false);
    };

    useEffect(() => {
        eventEmitter.on('showImagePreview', handlePreview);

        return () => {
            eventEmitter.removeListener("showImagePreview", handlePreview);
        };
    }, []);

    return (
        <Drawer
            title="Image Preview"
            placement="right"
            width={width}
            visible={isOpen}
            getContainer={false}
            onClose={handleCancel}
        >
            { imageData && <img className="Preview__image" src={getBaseDocumentEndPoint()+imageData?.documentUrl}/> }
        </Drawer>
    );
}