import React from 'react';
import PdfUpload from '@/components/pdfUpload';
import PdfPageController from '@/components/pdfUpload/PdfPageController';

const initPdfState = {
  selectedFile: undefined,
  numPages: 1,
  pageNumber: 1,
  pdfData: undefined,
};

export interface PdfState {
  selectedFile?: File;
  numPages: number;
  pageNumber: number;
  pdfData?: File;
}

export default function PdfUploadContainer() {
  const [pdfState, setPdfState] = React.useState<PdfState>(initPdfState);
  const { pageNumber, numPages } = pdfState;

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setPdfState((prev) => ({ ...prev, pdfData: selectedFile }));
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPdfState((prev) => ({ ...prev, numPages }));
  };

  const setPage = (page: number) => {
    setPdfState((prev) => ({ ...prev, pageNumber: page }));
  };

  return (
    <PdfUpload pdfState={pdfState} handleDocumentLoadSuccess={handleDocumentLoadSuccess} handleFileLoad={handleFileLoad}>
      <PdfPageController setPage={setPage} currentPage={pageNumber} lastPage={numPages} />
    </PdfUpload>
  );
}
