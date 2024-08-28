import styled from 'styled-components';
import { CiImageOn } from 'react-icons/ci';
import { flexCenter } from '@/styles/Common';

interface Props {
  handleClick: () => void;
}

export default function RandomImageButton({ handleClick }: Props) {
  return (
    <S.RandomImageButton onClick={handleClick}>
      <CiImageOn size={40} />
    </S.RandomImageButton>
  );
}

const S = {
  RandomImageButton: styled.button`
    width: 100%;
    aspect-ratio: 1;
    cursor: pointer;
    ${flexCenter}
  `,
};
