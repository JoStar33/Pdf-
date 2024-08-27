import routerPath from '@/constants/routerPath';
import useRandomColorGenerator from '@/hooks/useRandomColorGenerator';
import { PdfDocument } from '@/types/pdfDocument';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  element: PdfDocument;
}

export default function PdfCard({ element }: Props) {
  const { color } = useRandomColorGenerator();
  const navigator = useNavigate();

  const handleClickCard = () => {
    navigator(`${routerPath.PDF}/${element.id}`);
  };

  return (
    <S.PdfCard onClick={handleClickCard}>
      <div className="pdf-card__main" style={{ backgroundColor: color }}></div>
      <span className="pdf-card__title">{element.title}</span>
    </S.PdfCard>
  );
}

const S = {
  PdfCard: styled.div`
    width: calc(33% - 10px);
    aspect-ratio: 1.2;
    display: flex;
    flex-direction: column;
    .pdf-card {
      &__main {
        padding: 10px;
        border-radius: 5px;
        width: 100%;
        margin-bottom: 5px;
      }
      &__title {
        font-weight: 500;
      }
    }
  `,
};
