import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { PdfPageInfo } from '@/containers/PdfContainer';
import PdfFileUploader from '@/components/pdf/PdfFileUploader';
import { PdfDocument, PdfDocumentTitleForm } from '@/types/pdfDocument';
import PdfLoading from '@/components/pdf/PdfLoading';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import PdfTitleInput from './PdfTitleInput';
import React from 'react';

interface Props {
  pdfDocument: PdfDocument;
  pdfPageInfo: PdfPageInfo;
  handleFileLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  handleDropFileLoad: (fileList: FileList) => void;
  handleSwiperSlide: (page: number) => void;
  onTitleSubmit: (submitData: PdfDocumentTitleForm, onSuccess: () => void) => void;
  children?: React.ReactNode;
}

export default React.forwardRef<HTMLDivElement, Props>(function Pdf(
  { pdfPageInfo, pdfDocument, handleDropFileLoad, handleFileLoad, handleDocumentLoadSuccess, handleSwiperSlide, onTitleSubmit, children },
  ref,
) {
  const { numPages } = pdfPageInfo;
  const { file } = pdfDocument;

  const onSwiperInit = (swiper: SwiperClass) => {
    swiper.el.style.visibility = 'visible';
    swiper.el.style.opacity = '1';
  };

  const swiperStyles: React.CSSProperties = {
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  if (!file)
    return (
      <S.Pdf style={{ maxWidth: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <PdfFileUploader handleDropFileLoad={handleDropFileLoad} handleFileLoad={handleFileLoad} />
      </S.Pdf>
    );

  return (
    <S.Pdf
      ref={ref}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      <PdfTitleInput onTitleSubmit={onTitleSubmit} />
      <Document className="pdf-viewer" file={file} loading={<PdfLoading />} onLoadSuccess={handleDocumentLoadSuccess}>
        <Swiper
          pagination={{
            clickable: true,
          }}
          initialSlide={0}
          slidesPerView={1}
          modules={[Navigation, Pagination]}
          navigation={true}
          onInit={onSwiperInit}
          onSlideChange={(swiper) => handleSwiperSlide(swiper.activeIndex + 1)}
          style={swiperStyles}
        >
          {new Array(numPages).fill('').map((_, index) => (
            <SwiperSlide key={index} className="web-swiper">
              <Page pageNumber={index + 1} height={800} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Document>
      {children}
    </S.Pdf>
  );
});

const S = {
  Pdf: styled.div`
    margin: 5px;
    position: relative;
    min-width: 75%;
  `,
};
