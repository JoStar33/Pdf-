import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { flexCenter } from '@/styles/Common';
import routerPath from '@/constants/routerPath';
import { useNavigate } from 'react-router-dom';

export default function PdfRegisterButton() {
  const navigator = useNavigate();

  const handleClickCard = () => {
    navigator(`${routerPath.PDF}`);
  };

  return (
    <S.PdfRegisterButton onClick={handleClickCard}>
      <div className="register-button">
        <AiOutlinePlus size={25} />
      </div>
    </S.PdfRegisterButton>
  );
}

const S = {
  PdfRegisterButton: styled.div`
    width: calc(33% - 10px);
    aspect-ratio: 1.2;
    display: flex;
    align-items: center;
    .register-button {
      width: 100%;
      aspect-ratio: 1;
      ${flexCenter}
    }
  `,
};
