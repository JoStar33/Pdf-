import routerPath from '@/constants/routerPath';
import useRandomColorGenerator from '@/hooks/useRandomColorGenerator';
import { PdfDocument } from '@/types/pdfDocument';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PdfCardDeleteButton from './PdfCardDeleteButton';
import { usePdfDocumentStore } from '@/stores/pdfDocument';

interface Props {
  element: PdfDocument;
}

export default function PdfCard({ element }: Props) {
  const { color } = useRandomColorGenerator();
  const deletePdf = usePdfDocumentStore((state) => state.deletePdf);
  const navigator = useNavigate();

  const handleClickCard = () => {
    navigator(`${routerPath.PDF}/${element.id}`);
  };

  const handleDeletePdf = () => {
    deletePdf(element.id);
  };

  return (
    <S.PdfCard onClick={handleClickCard}>
      <PdfCardDeleteButton handleClick={handleDeletePdf} />
      <div className="pdf-card__main" style={{ backgroundColor: color }}></div>
      <span className="pdf-card__title">{element.title}</span>
    </S.PdfCard>
  );
}

const S = {
  PdfCard: styled.div`
    width: calc(33% - 10px);
    margin: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    height: fit-content;
    .pdf-card {
      &__main {
        padding: 10px;
        border-radius: 5px;
        width: 100%;
        aspect-ratio: 0.8;
        margin-bottom: 5px;
      }
      &__title {
        font-weight: 500;
      }
    }
  `,
};
