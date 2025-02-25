import React from 'react';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Button } from '../ui/button';

// Set up PDF.js worker (Vite requires using the public directory)
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

interface PdfViewerProps {
    isGenerated: boolean;
    pdf: string;
}

const PdfController: React.FC<PdfViewerProps> = ({ pdf, isGenerated }) => {
    // generate unique fil name
    const getPdfFileName = () => {
        const timestamp = new Date().toISOString(); // Get the current timestamp in ISO format
        const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
        const fileName = `document_${timestamp}_${randomString}.pdf`; // Combine them to form a unique filename
        return fileName;
    };

    // Handle Download
    const handleDownload = () => {
        const link = document.createElement('a');
        if (pdf.startsWith('data:')) {
            link.href = pdf;
        } else {
            link.href = URL.createObjectURL(
                new Blob([pdf], { type: 'application/pdf' }),
            );
        }
        link.download = getPdfFileName();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Handle Print
    const handlePrint = () => {
        const win = window.open();
        if (win) {
            win.document.write(
                `<iframe width="100%" height="100%" src="${pdf}" frameborder="0"></iframe>`,
            );
            win.document.close();
            win.focus();
            setTimeout(() => win.print(), 1000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full">
            {isGenerated ? (
                <>
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 text-center max-w-[300px] mx-auto">
                        <h5 className="text-slate-600 text-sm font-bold">
                            Generate PDF Ticket
                        </h5>
                        <p className="text-slate-500 text-sm mt-2">
                            The PDF ticket is already generated and ready to be downloaded or
                            printed.
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                        <Button
                            className="px-3 py-1.5 font-bold"
                            type="button"
                            onClick={handleDownload}
                        >
                            Download Ticket
                        </Button>
                        <span className="text-slate-400">or</span>
                        <Button
                            className="px-3 py-1.5 font-bold"
                            type="button"
                            onClick={handlePrint}
                        >
                            Print Ticket
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <div className="border border-dashed border-slate-200 rounded-md p-4 py-8 text-center max-w-[300px] mx-auto">
                        <h5 className="text-slate-600 text-sm font-bold">
                            No PDF available
                        </h5>
                        <p className="text-slate-500 text-sm mt-2">
                            Ooops! No PDF available for this ticket (not generated yet or not
                            found).
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default PdfController;
