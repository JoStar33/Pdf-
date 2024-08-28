import React from 'react';
import Pdf from '@/components/pdf';
import PdfPageController from '@/components/pdf/PdfPageController';
import ImageObject from '@/components/pdfObjects/ImageObject';
import useIdGetter from '@/hooks/useIdGetter';
import { usePdfDocumentStore } from '@/stores/pdfDocument';
import { useNavigate } from 'react-router-dom';
import { PdfDocument } from '@/types/pdfDocument';
import changeFileToBase64 from '@/utils/changeFileToBase64';
import routerPath from '@/constants/routerPath';

const initPdfState = {
  numPages: 1,
  pageNumber: 1,
};

export interface PdfPageInfo {
  numPages: number;
  pageNumber: number;
}

const defaultDocument = {
  file: null,
  objects: [],
  id: -1,
  createdAt: '--',
} as unknown as PdfDocument;

export default function PdfContainer() {
  // const { pathname } = useLocation();
  const navigator = useNavigate();
  const { id } = useIdGetter();
  const { pdfDocumentList, uniqueId, createPdf } = usePdfDocumentStore();
  const findPdfDocument = pdfDocumentList.find((pdfDocument) => pdfDocument.id === id) ?? defaultDocument;
  const [pdfPageInfo, setPdfPageInfo] = React.useState<PdfPageInfo>(initPdfState);
  const { pageNumber, numPages } = pdfPageInfo;

  const createPdfAsArrayBuffer = (file: string) => {
    createPdf({
      file,
    });
  };

  const handleFileLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    changeFileToBase64(selectedFile, createPdfAsArrayBuffer);
    navigator(`${routerPath.PDF}/${uniqueId}`);
  };

  const handleDropFileLoad = (fileList: FileList) => {
    const acceptedFiles = Array.from(fileList);
    if (acceptedFiles.length === 0) return;
    const selectedFile = acceptedFiles[0];
    changeFileToBase64(selectedFile, createPdfAsArrayBuffer);
    navigator(`${routerPath.PDF}/${uniqueId}`);
  };

  const handleDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setPdfPageInfo((prev) => ({ ...prev, numPages: pdf.numPages }));
  };

  const setPage = (page: number) => {
    setPdfPageInfo((prev) => ({ ...prev, pageNumber: page }));
  };

  return (
    <Pdf
      pdfDocument={findPdfDocument}
      pdfPageInfo={pdfPageInfo}
      handleDocumentLoadSuccess={handleDocumentLoadSuccess}
      handleFileLoad={handleFileLoad}
      handleDropFileLoad={handleDropFileLoad}
    >
      <ImageObject />
      <PdfPageController setPage={setPage} currentPage={pageNumber} lastPage={numPages} />
    </Pdf>
  );
}
