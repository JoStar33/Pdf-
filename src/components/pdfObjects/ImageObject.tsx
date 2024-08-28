import usePdfObjectEventHandler from '@/hooks/usePdfObjectEventHandler';
import { PdfImageObject } from '@/types/pdfObject';
import styled from 'styled-components';
import ObjectDeleteButton from './ObjectDeleteButton';

interface Props {
  objectElement: PdfImageObject;
}

export default function ImageObject({ objectElement }: Props) {
  const { objectRef, handleDragOver, handleDragStart, handleDragEnd } = usePdfObjectEventHandler<HTMLImageElement>(objectElement);
  const { top, left, src } = objectElement;

  return (
    <S.ImageObject
      style={{
        top,
        left,
      }}
      draggable={true}
      ref={objectRef}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <img src={src} />
      <ObjectDeleteButton objectId={objectElement.id} />
    </S.ImageObject>
  );
}

const S = {
  ImageObject: styled.div`
    width: 100px;
    height: 100px;
    top: 0px;
    left: 0px;
    position: absolute;
    z-index: 3;
    border: 1px solid black;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  `,
};
