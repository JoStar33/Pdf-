import { PdfDocument } from '@/types/pdfDocument';
import styled from 'styled-components';
import PdfCard from './PdfCard';
import PdfRegisterButton from './PdfRegisterButton';

interface Props {
  pdfDocumentList: PdfDocument[];
}

export default function PdfList({ pdfDocumentList }: Props) {
  return (
    <S.PdfList>
      <PdfRegisterButton />
      {pdfDocumentList
        .sort((a, b) => (a.id < b.id ? -1 : 1))
        .map((element) => (
          <PdfCard key={element.id} element={element} />
        ))}
    </S.PdfList>
  );
}

const S = {
  PdfList: styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
  `,
};
