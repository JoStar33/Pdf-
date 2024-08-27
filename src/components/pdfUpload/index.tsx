import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { PdfState } from '@/containers/PdfUploadContainer';

interface Props {
  pdfState: PdfState;
  handleFileLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  children: React.ReactNode;
}

export default function PdfUpload({ pdfState, handleFileLoad, handleDocumentLoadSuccess, children }: Props) {
  const { pdfData, pageNumber, numPages } = pdfState;

  if (!pdfData)
    return (
      <S.PdfUpload>
        <input type="file" accept=".pdf" onChange={handleFileLoad} />
      </S.PdfUpload>
    );

  return (
    <S.PdfUpload>
      <Document file={pdfData} onLoadSuccess={handleDocumentLoadSuccess}>
        {new Array(numPages).fill('').map((_, index) => {
          if (pageNumber === index + 1) return <Page key={index} pageNumber={index + 1} />;
          return <></>;
        })}
      </Document>
      {children}
    </S.PdfUpload>
  );
}

const S = {
  PdfUpload: styled.div`
    padding: 10px;
    position: relative;
  `,
};
