import styled from 'styled-components';
import { Document, Page } from 'react-pdf';
import { PdfState } from '@/containers/PdfContainer';

interface Props {
  pdfState: PdfState;
  handleFileLoad: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
  children: React.ReactNode;
}

export default function Pdf({ pdfState, handleFileLoad, handleDocumentLoadSuccess, children }: Props) {
  const { pdfData, pageNumber, numPages } = pdfState;

  if (!pdfData)
    return (
      <S.Pdf>
        <input type="file" accept=".pdf" onChange={handleFileLoad} />
      </S.Pdf>
    );

  return (
    <S.Pdf>
      <Document file={pdfData} onLoadSuccess={handleDocumentLoadSuccess}>
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
    padding: 10px;
    position: relative;
  `,
};
