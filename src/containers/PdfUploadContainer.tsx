import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import React from 'react';

const initPdfState = {
  selectedFile: undefined,
  numPages: 1,
  pageNumber: 1,
  pdfData: undefined,
};

interface PdfState {
  selectedFile?: File;
  numPages: number;
  pageNumber: number;
  pdfData?: File;
}

export default function PdfUploadContainer() {
  const [pdfState, setPdfState] = React.useState<PdfState>(initPdfState);

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setPdfState((prev) => ({ ...prev, pdfData: selectedFile }));
  };

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPdfState((prev) => ({ ...prev, numPages }));
  };

  const { pdfData, pageNumber, numPages } = pdfState;

  return (
    <S.PdfUploadContainer>
      {!pdfData && <input type="file" accept=".pdf" onChange={handleFileLoad} />}
      {pdfData && (
        <>
          <Document file={pdfData} onLoadSuccess={handleDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </>
      )}
    </S.PdfUploadContainer>
  );
}

const S = {
  PdfUploadContainer: styled.div``,
};
