import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

interface Props {
  handleClick: () => void;
}

export default function PdfCardDeleteButton({ handleClick }: Props) {
  return (
    <S.PdfCardDeleteButton
      onClick={(event) => {
        event.stopPropagation();
        handleClick();
      }}
    >
      <FaTrash size={25} />
    </S.PdfCardDeleteButton>
  );
}

const S = {
  PdfCardDeleteButton: styled.div`
    padding: 10px;
    border-radius: 10px;
    top: 5px;
    right: 5px;
    position: absolute;
  `,
};
