import React from 'react';
import Pdf from '@/components/pdf';
import useIdGetter from '@/hooks/useIdGetter';
import { usePdfDocumentStore } from '@/stores/pdfDocument';
import { PdfDocument, PdfDocumentTitleForm } from '@/types/pdfDocument';
import PdfWrapper from '@/components/pdf/PdfWrapper';
import PdfAside from '@/components/pdf/aside';
import RandomImageButton from '@/components/pdf/aside/RandomImageButton';
import randomImageUrl from '@/constants/randomImageUrl';
import PdfObjectContainer from './PdfObjectContainer';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@/utils/validate/schema';
import usePdfDownload from '@/hooks/usePdfDownload';
import PdfDownloadButton from '@/components/pdf/aside/PdfDownloadButton';
import usePdfUploadHandler from '@/hooks/usePdfUploadHandler';

const initPdfState = {
  numPages: 1,
  currentPage: 1,
};

export interface PdfPageInfo {
  numPages: number;
  currentPage: number;
}

const defaultDocument = {
  file: null,
  objects: [],
  id: -1,
  createdAt: '--',
} as unknown as PdfDocument;

export default function PdfContainer() {
  const { id } = useIdGetter();
  const { pdfDocumentList, createImageObject, modifyPdf } = usePdfDocumentStore();
  const findPdfDocument = pdfDocumentList.find((pdfDocument) => pdfDocument.id === id) ?? defaultDocument;
  const [pdfPageInfo, setPdfPageInfo] = React.useState<PdfPageInfo>(initPdfState);
  const { currentPage } = pdfPageInfo;
  const methods = useForm<PdfDocumentTitleForm>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema.pdfTitleSchema),
  });
  const { handleDropFileLoad, handleFileLoad } = usePdfUploadHandler();
  const { pdfDivRef, handleDownloadPdf } = usePdfDownload();

  const currentObjectLength = findPdfDocument.objects.length;

  const handleGenerateRandomImage = () => {
    if (!id || currentObjectLength > 15) return;
    const randomIndex = Math.floor(Math.random() * 5);
    createImageObject({ src: randomImageUrl[randomIndex] }, id, currentPage);
  };

  const handleDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setPdfPageInfo((prev) => ({ ...prev, numPages: pdf.numPages }));
  };

  const handleSwiperSlide = (page: number) => {
    setPdfPageInfo((prev) => ({ ...prev, currentPage: page }));
  };

  const onTitleSubmit = (submitData: PdfDocumentTitleForm, onSuccess: () => void) => {
    if (!id) return;
    modifyPdf((prev) => ({ ...prev, title: submitData.title }), id);
    onSuccess();
  };

  React.useEffect(
    function initializePdfTitle() {
      if (!findPdfDocument) return;
      methods.setValue('title', findPdfDocument.title ?? '');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [findPdfDocument],
  );

  return (
    <PdfWrapper>
      {findPdfDocument.file && (
        <PdfAside>
          <RandomImageButton handleClick={handleGenerateRandomImage} />
          <PdfDownloadButton handleDownloadPdf={() => handleDownloadPdf(findPdfDocument.title)} />
        </PdfAside>
      )}
      <FormProvider {...methods}>
        <Pdf
          ref={pdfDivRef}
          pdfDocument={findPdfDocument}
          pdfPageInfo={pdfPageInfo}
          handleDocumentLoadSuccess={handleDocumentLoadSuccess}
          handleFileLoad={handleFileLoad}
          handleDropFileLoad={handleDropFileLoad}
          handleSwiperSlide={handleSwiperSlide}
          onTitleSubmit={onTitleSubmit}
        >
          <PdfObjectContainer currentPage={currentPage} objects={findPdfDocument.objects} />
        </Pdf>
      </FormProvider>
    </PdfWrapper>
  );
}
