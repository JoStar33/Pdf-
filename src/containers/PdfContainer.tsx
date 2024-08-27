import React from 'react';
import Pdf from '@/components/pdf';
import PdfPageController from '@/components/pdf/PdfPageController';
import ImageObject from '@/components/pdfObjects/ImageObject';

const initPdfState = {
  numPages: 1,
  pageNumber: 1,
  pdfData: undefined,
};

export interface PdfState {
  numPages: number;
  pageNumber: number;
  pdfData?: File;
}

export default function PdfContainer() {
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
    <Pdf pdfState={pdfState} handleDocumentLoadSuccess={handleDocumentLoadSuccess} handleFileLoad={handleFileLoad}>
      <ImageObject />
      <PdfPageController setPage={setPage} currentPage={pageNumber} lastPage={numPages} />
    </Pdf>
  );
}
