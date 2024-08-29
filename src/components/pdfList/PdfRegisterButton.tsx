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
        <AiOutlinePlus size={70} />
      </div>
    </S.PdfRegisterButton>
  );
}

const S = {
  PdfRegisterButton: styled.div`
    width: calc(33% - 10px);
    margin: 5px;
    aspect-ratio: 1.2;
    .register-button {
      cursor: pointer;
      width: 100%;
      border-radius: 5px;
      aspect-ratio: 1;
      background-color: ${(props) => props.theme.colors.gray};
      ${flexCenter}
    }
  `,
};
