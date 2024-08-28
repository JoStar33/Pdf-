import React from 'react';
import Pdf from '@/components/pdf';
import PdfPageController from '@/components/pdf/PdfPageController';
import useIdGetter from '@/hooks/useIdGetter';
import { usePdfDocumentStore } from '@/stores/pdfDocument';
import { useNavigate } from 'react-router-dom';
import { PdfDocument } from '@/types/pdfDocument';
import changeFileToBase64 from '@/utils/changeFileToBase64';
import routerPath from '@/constants/routerPath';
import PdfWrapper from '@/components/pdf/PdfWrapper';
import PdfAside from '@/components/pdf/aside';
import RandomImageButton from '@/components/pdf/aside/RandomImageButton';
import randomImageUrl from '@/constants/randomImageUrl';
import PdfObjectContainer from './PdfObjectContainer';

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
  const navigator = useNavigate();
  const { id } = useIdGetter();
  const { pdfDocumentList, uniqueId, createPdf, createImageObject } = usePdfDocumentStore();
  const findPdfDocument = pdfDocumentList.find((pdfDocument) => pdfDocument.id === id) ?? defaultDocument;
  const currentObjectLength = findPdfDocument.objects.length;
  const [pdfPageInfo, setPdfPageInfo] = React.useState<PdfPageInfo>(initPdfState);
  const { pageNumber, numPages } = pdfPageInfo;

  const createPdfAsArrayBuffer = (file: string) => {
    createPdf({
      file,
    });
  };

  const setPage = (page: number) => {
    setPdfPageInfo((prev) => ({ ...prev, pageNumber: page }));
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

  const handleGenerateRandomImage = () => {
    if (!id || currentObjectLength > 15) return;
    const randomIndex = Math.floor(Math.random() * 5);
    createImageObject({ src: randomImageUrl[randomIndex] }, id);
  };

  const handleDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setPdfPageInfo((prev) => ({ ...prev, numPages: pdf.numPages }));
  };

  return (
    <PdfWrapper>
      {findPdfDocument.file && (
        <PdfAside>
          <RandomImageButton handleClick={handleGenerateRandomImage} />
        </PdfAside>
      )}
      <Pdf
        pdfDocument={findPdfDocument}
        pdfPageInfo={pdfPageInfo}
        handleDocumentLoadSuccess={handleDocumentLoadSuccess}
        handleFileLoad={handleFileLoad}
        handleDropFileLoad={handleDropFileLoad}
      >
        <PdfObjectContainer objects={findPdfDocument.objects} />
        <PdfPageController setPage={setPage} currentPage={pageNumber} lastPage={numPages} />
      </Pdf>
    </PdfWrapper>
  );
}
