import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { PdfPageInfo } from '@/containers/PdfContainer';
import PdfFileUploader from '@/components/common/PdfFileUploader';
import { PdfDocument } from '@/types/pdfDocument';

interface Props {
  pdfDocument: PdfDocument;
  pdfPageInfo: PdfPageInfo;
  handleFileLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  handleDropFileLoad: (fileList: FileList) => void;
  children: React.ReactNode;
}

export default function Pdf({ pdfPageInfo, pdfDocument, handleDropFileLoad, handleFileLoad, handleDocumentLoadSuccess, children }: Props) {
  const { pageNumber, numPages } = pdfPageInfo;
  const { file } = pdfDocument;

  if (!file)
    return (
      <S.Pdf>
        <PdfFileUploader handleDropFileLoad={handleDropFileLoad} handleFileLoad={handleFileLoad} />
      </S.Pdf>
    );

  return (
    <S.Pdf>
      <Document className="pdf-viewer drop-zone" file={file} onLoadSuccess={handleDocumentLoadSuccess}>
        {new Array(numPages).fill('').map((_, index) => {
          if (pageNumber === index + 1) return <Page key={index} pageNumber={index + 1} />;
          return <></>;
        })}
      </Document>
      {children}
    </S.Pdf>
  );
}

const S = {
  Pdf: styled.div`
    margin: 5px;
    position: relative;
    width: 100%;
  `,
};
