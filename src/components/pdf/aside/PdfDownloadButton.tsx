import { flexCenter } from '@/styles/Common';
import styled from 'styled-components';
import { GiSave } from 'react-icons/gi';

interface Props {
  handleDownloadPdf: () => void;
}

export default function PdfDownloadButton({ handleDownloadPdf }: Props) {
  return (
    <S.PdfDownloadButton onClick={handleDownloadPdf}>
      <GiSave size={30} />
    </S.PdfDownloadButton>
  );
}

const S = {
  PdfDownloadButton: styled.button`
    width: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    ${flexCenter}
  `,
};
