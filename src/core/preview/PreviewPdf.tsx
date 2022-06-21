import { Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs, Outline } from 'react-pdf';
import { EventEmitter } from '../eventEmitter';
import { getBaseDocumentEndPoint } from '../utils';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const eventEmitter = new EventEmitter();

export const showPdfPreview = (data: any) => {
    eventEmitter.emit("showPdfPreview", data);
};

export function PreviewPdf() {
    const width = window.innerWidth;
    const [numPages, setNumPages] = useState<any>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [imageData, setImageData] = useState<any>(null);
    const [isOpen, toggleDrawer] = useState(false);

    const onDocumentLoadSuccess = (pdf: any) => {
        setNumPages(pdf.numPages);
    }

    const handlePreview = (data: any) => {
        toggleDrawer(true);
        setImageData(data);
    };

    const handleCancel = () => {
        toggleDrawer(false);
    };

    useEffect(() => {
        eventEmitter.on('showPdfPreview', handlePreview);

        return () => {
            eventEmitter.removeListener("showPdfPreview", handlePreview);
        };
    }, []);

    return (
        <Drawer
            title="PDF Preview"
            placement="right"
            width={width}
            visible={isOpen}
            getContainer={false}
            onClose={handleCancel}
        >
            {
                imageData?.documentUrl && <div className="Pdf-viewer__wrapper">
                    <Document file={getBaseDocumentEndPoint()+imageData?.documentUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Outline />
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <div className="page-controls">
                        <button type="button" onClick={() => setPageNumber(pageNumber-1)} disabled={pageNumber <= 1}>‹</button>
                            <span>Page {pageNumber} of {numPages}</span>
                        <button type="button" onClick={() => setPageNumber(pageNumber+1)} disabled={pageNumber >= numPages}>›</button>
                    </div>
                </div>
            }
        </Drawer>
    );
}

