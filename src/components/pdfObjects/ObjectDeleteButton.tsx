import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { flexCenter } from '@/styles/Common';
import { usePdfDocumentStore } from '@/stores/pdfDocument';
import useIdGetter from '@/hooks/useIdGetter';

interface Props {
  objectId: number;
}

export default function ObjectDeleteButton({ objectId }: Props) {
  const { id } = useIdGetter();
  const deleteObject = usePdfDocumentStore((state) => state.deleteObject);

  const handleClickDelete = () => {
    if (!id) return;
    deleteObject(objectId, id);
  };

  return (
    <S.ObjectDeleteButton onClick={handleClickDelete}>
      <MdDelete size={13} />
    </S.ObjectDeleteButton>
  );
}

const S = {
  ObjectDeleteButton: styled.button`
    padding: 5px;
    position: absolute;
    right: 0px;
    top: 0px;
    ${flexCenter}
    cursor: pointer;
    border-radius: 4px;
  `,
};
